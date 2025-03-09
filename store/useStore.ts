import { create } from 'zustand'

type Coordinates = {
  lat: number;
  lng: number;
}

type RouteStep = {
  distance: number;
  duration: number;
  instruction: string;
  name: string;
  type: number;
  way_points: number[];
}

type Route = {
  coordinates: [number, number][];
  distance: number;
  duration: number;
  steps: {
    distance: number;
    duration: number;
    instruction: string;
    name: string;
  }[];
}

type State = {
  sourceAddress: string
  sourceGeoCode: Coordinates | null
  targetAddress: string
  targetGeoCode: Coordinates | null
  route: Route | null
  isLoading: boolean
  error: string | null
  setSourceAddress: (address: string) => void
  setTargetAddress: (address: string) => void
  geocodeAddress: (address: string, type: 'source' | 'target') => Promise<void>
  calculateRoute: () => Promise<void>
  clearAddresses: () => void
}

const geocodeAddress = async (address: string): Promise<Coordinates> => {
  const response = await fetch("http://localhost:3001/geocode", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ address })
  });
  
  if (!response.ok) {
    throw new Error('Geocoding request failed');
  }

  const data = await response.json();
  console.log(data);
  if (data.status !== 'OK') {
    throw new Error(data.error_message || 'Geocoding failed');
  }

  const { lat, lng } = data.results[0].geometry.location;
  return { lat, lng };
};

const calculateRouteFromCoordinates = async (start: Coordinates, end: Coordinates): Promise<Route> => {
  const response = await fetch('http://localhost:3001/getRoute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      start,
      end
    })
  });

  if (!response.ok) {
    throw new Error('Route calculation failed');
  }

  const data = await response.json();
  
  if (!data.routes?.[0]) {
    throw new Error('No route found');
  }

  const route = data.routes[0];
  const decodedGeometry = decodeGeometry(route.geometry);
  
  return {
    coordinates: decodedGeometry,
    distance: route.summary.distance,
    duration: route.summary.duration,
    steps: route.segments[0].steps.map((step: RouteStep) => ({
      distance: step.distance,
      duration: step.duration,
      instruction: step.instruction,
      name: step.name
    }))
  };
};

// Polyline decoder function - returns coordinates in [lat, lng] format for Leaflet
function decodeGeometry(encoded: string): [number, number][] {
  const len = encoded.length;
  let index = 0;
  const coordinates: [number, number][] = [];
  let lat = 0;
  let lng = 0;

  while (index < len) {
    let result = 1;
    let shift = 0;
    let b: number;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result += (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const deltaLat = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lat += deltaLat;

    result = 1;
    shift = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result += (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const deltaLng = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lng += deltaLng;

    // Convert to actual coordinates and return in [lat, lng] format for Leaflet
    const finalLat = lat * 1e-5;
    const finalLng = lng * 1e-5;
    coordinates.push([-finalLat, -finalLng]);
  }

  return coordinates;
}

const useStore = create<State>()((set, get) => ({
  sourceAddress: '',
  sourceGeoCode: null,
  targetAddress: '',
  targetGeoCode: null,
  route: null,
  isLoading: false,
  error: null,
  
  setSourceAddress: (address: string) => 
    set((state) => ({ ...state, sourceAddress: address, sourceGeoCode: null, route: null })),
  
  setTargetAddress: (address: string) => 
    set((state) => ({ ...state, targetAddress: address, targetGeoCode: null, route: null })),
  
  geocodeAddress: async (address: string, type: 'source' | 'target') => {
    set((state) => ({ ...state, isLoading: true, error: null }));
    
    try {
      const coordinates = await geocodeAddress(address);
      set((state) => ({
        ...state,
        isLoading: false,
        [type === 'source' ? 'sourceGeoCode' : 'targetGeoCode']: coordinates,
        route: null
      }));
    } catch (error) {
      set((state) => ({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred during geocoding'
      }));
    }
  },

  calculateRoute: async () => {
    const state = get();
    if (!state.sourceGeoCode || !state.targetGeoCode) {
      return;
    }

    set((state) => ({ ...state, isLoading: true, error: null }));

    try {
      const route = await calculateRouteFromCoordinates(state.sourceGeoCode, state.targetGeoCode);
      set((state) => ({
        ...state,
        route,
        isLoading: false
      }));
    } catch (error) {
      set((state) => ({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred calculating the route'
      }));
    }
  },
  
  clearAddresses: () => set((state) => ({ 
    ...state, 
    sourceAddress: '', 
    targetAddress: '', 
    sourceGeoCode: null, 
    targetGeoCode: null,
    route: null,
    error: null 
  })),
}))

export { useStore } 