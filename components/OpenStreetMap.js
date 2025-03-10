'use client'

import React, {useEffect, useRef, useState} from 'react'
import {MapContainer, Marker, Polyline, TileLayer, useMap, useMapEvents} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import {useStore} from '@/store/useStore'
import axios from 'axios'
import * as turf from "@turf/turf";
import { SiteInformation } from './ui/site-information';

const sourceIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

const targetIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

const LeafIcon = L.Icon.extend({
    options: {
        iconSize: [32, 40],
        iconAnchor: [16, 40]
    }
});

const selIcon = L.Icon.extend({
    options: {
        iconSize: [36, 45],
        iconAnchor: [18, 42]
    }
});

const public_icons = {};
const private_icons = {};
const public_icons_warn = {};

const public_icons_selected = {};
const private_icons_selected = {};
const public_icons_warn_selected = {};
const categories = ["standard", "caravan", "camping", "nudist", "group_only", "backcountry"];

const cat_color = {
    "backcountry": "#225500",
    "group_only": "#552200",
    "nudist": "#68228b",
    "standard": "#000080",
    "camping": "#000080",
    "caravan": "#000080",
    "private": "#666666"
};

const private_values = ['private', 'members', 'no'];

categories.forEach(entry => {
    public_icons[entry] = new LeafIcon({ iconUrl: `/markers/m_${entry}.svg` });
    public_icons_selected[entry] = new selIcon({ iconUrl: `/markers/m_${entry}_sel.svg` });
    public_icons_warn[entry] = new LeafIcon({ iconUrl: `/markers/m_${entry}_warn.svg` });
    public_icons_warn_selected[entry] = new selIcon({ iconUrl: `/markers/m_${entry}_warn_sel.svg` });
    private_icons[entry] = new LeafIcon({ iconUrl: `/markers/m_private_${entry}.svg` });
    private_icons_selected[entry] = new selIcon({ iconUrl: `/markers/m_private_${entry}_sel.svg` });
});

const mselected = new L.Marker([0,0]);

function UpdateMapBounds({ sourceGeoCode, targetGeoCode, route }) {
    const map = useMap();

    useEffect(() => {
        if (route?.coordinates?.length > 0) {
            const bounds = L.latLngBounds(route.coordinates);
            map.fitBounds(bounds, { padding: [50, 50] });
        } else if (sourceGeoCode && targetGeoCode) {
            const bounds = L.latLngBounds(
                [sourceGeoCode.lat, sourceGeoCode.lng],
                [targetGeoCode.lat, targetGeoCode.lng]
            );
            map.fitBounds(bounds, { padding: [50, 50] });
        } else if (sourceGeoCode) {
            map.setView([sourceGeoCode.lat, sourceGeoCode.lng], 13);
        } else if (targetGeoCode) {
            map.setView([targetGeoCode.lat, targetGeoCode.lng], 13);
        }
    }, [map, sourceGeoCode, targetGeoCode, route]);

    return null;
}

const pointToSegmentDistance = (campSite, line) => {
    const campsitePoint = turf.point(campSite);
    const linePoint = turf.point([line[1], line[0]]);

    return turf.distance(campsitePoint, linePoint, { units: "miles"});
}

const getMinDistanceToRoute = (point, routeCoordinates) => {
    if (routeCoordinates.length < 2) {
        return pointToSegmentDistance(point, routeCoordinates[0]);
    }

    const getRoughDistance = (coord1, coord2) => {
        const latDiff = Math.abs(coord1[1] - coord2[0]);
        const longDiff = Math.abs(coord1[0] - coord2[1]);
        return Math.sqrt(latDiff * latDiff + longDiff * longDiff);
    };

    let left = 0;
    let right = routeCoordinates.length - 1;
    let minDistance = Infinity;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midCoord = routeCoordinates[mid];
        
        const distToMid = getRoughDistance(point, midCoord);
        const distToNext = mid < routeCoordinates.length - 1 ? 
            getRoughDistance(point, routeCoordinates[mid + 1]) : Infinity;
        const distToPrev = mid > 0 ? 
            getRoughDistance(point, routeCoordinates[mid - 1]) : Infinity;

        const exactDist = pointToSegmentDistance(point, midCoord);
        minDistance = Math.min(minDistance, exactDist);

        if (minDistance <= 25) {
            return minDistance;
        }

        if (distToNext < distToMid) {
            left = mid + 1;
        } else if (distToPrev < distToMid) {
            right = mid - 1;
        } else {
            if (mid > 0) {
                minDistance = Math.min(minDistance, 
                    pointToSegmentDistance(point, routeCoordinates[mid - 1]));
            }
            if (mid < routeCoordinates.length - 1) {
                minDistance = Math.min(minDistance, 
                    pointToSegmentDistance(point, routeCoordinates[mid + 1]));
            }
            break;
        }
    }
    
    return minDistance;
};

const OpenStreetMap = ({ children }) => {
    const { sourceGeoCode, targetGeoCode, route, calculateRoute } = useStore();
    const [center] = useState({ lat: 39.8283, lng: -98.5795 }) // Center of USA
    const [campsites, setCampsites] = useState([]);
    const [selectedCampsite, setSelectedCampsite] = useState(null);
    const [showSiteInfo, setShowSiteInfo] = useState(false);
    const [infoPosition, setInfoPosition] = useState({ top: 0, left: 0 });
    const ZOOM_LEVEL = 4
    const mapRef = useRef(null)
    const JSONurl = "https://opencampingmap.org/getcampsites";
    const siteInfoRef = useRef(null);
    
    useEffect(() => {
        if (selectedCampsite) {
            console.log(selectedCampsite);
        }
    }, [selectedCampsite]);

    useEffect(() => {
        if (sourceGeoCode && targetGeoCode) {
            updateMapContents();
        }
    }, [sourceGeoCode, targetGeoCode]);

    useEffect(() => {
        if (sourceGeoCode && targetGeoCode) {
            calculateRoute();
        }
    }, [sourceGeoCode, targetGeoCode, calculateRoute]);

    const pointToLayer = (featureData, latlng) => {
        let attn = isBroken(featureData.properties);

        let icon = attn ? (public_icons['standard'] || public_icons['standard']) : public_icons['standard'];

        if (featureData.properties["permanent_camping"] === 'only') {
            featureData.properties['access'] = 'private';
        }

        if (categories.indexOf(featureData.properties["category"]) >= 0) {
            icon = attn ? 
                (public_icons_warn[featureData.properties["category"]] || public_icons[featureData.properties["category"]]) : 
                public_icons[featureData.properties["category"]];
            if ('access' in featureData.properties) {
                if (private_values.indexOf(featureData.properties['access']) >= 0) {
                    icon = private_icons[featureData.properties["category"]];
                }
            }
        }
        return L.marker(latlng, {icon: icon});
    };

    const updateMapContents = async () => {
        if (!sourceGeoCode || !targetGeoCode) return;

        try {
            const formData = new FormData();
            const minLat = Math.min(sourceGeoCode.lat, targetGeoCode.lat) - 0.5;
            const maxLat = Math.max(sourceGeoCode.lat, targetGeoCode.lat) + 0.5;
            const minLng = Math.min(sourceGeoCode.lng, targetGeoCode.lng) - 0.5;
            const maxLng = Math.max(sourceGeoCode.lng, targetGeoCode.lng) + 0.5;
            
            const bbox = `${minLng},${minLat},${maxLng},${maxLat}`;
            formData.append('bbox', bbox);

            const response = await axios.post(JSONurl, formData, {
                headers: {
                    'Accept': 'application/json',
                },
            });
            setCampsites(response.data.features);
        } catch (error) {
            console.error("Error fetching campsites:", error);
        }
    };

    const updateInfoPosition = (campsite) => {
        if (!mapRef.current || !campsite) return;
        
        try {
            const map = mapRef.current;
            const lat = campsite.geometry.coordinates[1];
            const lng = campsite.geometry.coordinates[0];
            
            // Convert the geographic coordinates to pixel coordinates
            const point = map.latLngToContainerPoint([lat, lng]);
            
            // Position the info box above the marker
            setInfoPosition({
                left: point.x,
                top: Math.max(30, point.y - 30) // Ensure it's not positioned off the top of the screen
            });
        } catch (error) {
            console.error("Error updating info position:", error);
            // Fallback to center positioning if there's an error
            setInfoPosition({
                left: window.innerWidth / 2,
                top: window.innerHeight / 2
            });
        }
    };

    const isBroken = (properties) => {
        let attn = false;

        if (!('name' in properties)) {
            attn = true;
        } else {
            if (Object.keys(properties).length === 4) {
                attn = true;
            }
        }

        if ('inside_sites' in properties) {
            attn = true;
        }

        if ('contains_sites' in properties) {
            attn = true;
        }
        return (attn)
    }

    const handleCampsiteClick = (campsite, e) => {
        e.originalEvent.stopPropagation(); // Prevent map click event
        setSelectedCampsite(campsite);
        setShowSiteInfo(true);
        
        // Get the position for the info box (above the marker)
        const map = mapRef.current;
        if (map) {
            const lat = campsite.geometry.coordinates[1];
            const lng = campsite.geometry.coordinates[0];
            
            // Zoom to the campsite
            map.flyTo([lat, lng], 14, {
                duration: 1
            });
            
            // Update the info box position after the map animation completes
            setTimeout(() => {
                updateInfoPosition(campsite);
            }, 1100); // Slightly longer than the flyTo duration
            
            // Also update immediately for initial positioning
            updateInfoPosition(campsite);
        }
    };

    const handleCloseInfo = () => {
        setShowSiteInfo(false);
        setSelectedCampsite(null);
    };

    // Define MapEvents inside the component to access state
    const MapEventsComponent = () => {
        const map = useMapEvents({
            click: () => {
                // Close site info when clicking elsewhere on the map
                setShowSiteInfo(false);
                setSelectedCampsite(null);
            },
            moveend: () => {
                // Update the position of the info box when the map moves
                if (selectedCampsite) {
                    updateInfoPosition(selectedCampsite);
                }
            },
            zoom: () => {
                // Update the position of the info box when the map zooms
                if (selectedCampsite) {
                    updateInfoPosition(selectedCampsite);
                }
            }
        });

        return null;
    };

    return (
        <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
            <MapContainer
                center={center}
                zoom={ZOOM_LEVEL}
                style={{ height: '100%', width: '100%' }}
                ref={mapRef}
                whenReady={(map) => {
                    mapRef.current = map.target;
                }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapEventsComponent />
                
                {sourceGeoCode && (
                    <Marker
                        position={[sourceGeoCode.lat, sourceGeoCode.lng]}
                        icon={sourceIcon}
                    />
                )}
                {targetGeoCode && (
                    <Marker
                        position={[targetGeoCode.lat, targetGeoCode.lng]}
                        icon={targetIcon}
                    />
                )}
                {route && (
                    <Polyline
                        positions={route.coordinates}
                        color="#3388ff"
                        weight={6}
                        opacity={0.6}
                    />
                )}
                {route && campsites.map((campsite) => {
                    const lng = campsite.geometry.coordinates[0];
                    const lat = campsite.geometry.coordinates[1];
                    const distance = getMinDistanceToRoute([lng, lat], route.coordinates);
                    
                    if (distance <= 25) {
                        return (
                            <Marker
                                key={campsite.id}
                                position={[lat, lng]}
                                icon={pointToLayer(campsite, [lat, lng]).options.icon}
                                eventHandlers={{
                                    click: (e) => handleCampsiteClick(campsite, e)
                                }}
                            />
                        );
                    }
                    return null;
                })}
                <UpdateMapBounds sourceGeoCode={sourceGeoCode} targetGeoCode={targetGeoCode} route={route} />
            </MapContainer>
            <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1000 }}>
                {children}
            </div>
            {selectedCampsite && showSiteInfo && (
                <div 
                    ref={siteInfoRef}
                    style={{ 
                        position: 'absolute', 
                        top: `${infoPosition.top}px`, 
                        left: `${infoPosition.left}px`, 
                        transform: 'translate(-50%, -100%)', 
                        zIndex: 1001,
                        pointerEvents: 'auto' // Ensure clicks on the info box are captured
                    }}
                >
                    <SiteInformation 
                        campsite={selectedCampsite} 
                        onClose={handleCloseInfo} 
                        visible={true} 
                    />
                </div>
            )}
        </div>
    )
}

export default OpenStreetMap