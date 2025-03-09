'use client'

import React, { useState, useRef, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useStore } from '@/store/useStore'

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

const OpenStreetMap = ({ children }) => {
    const { sourceGeoCode, targetGeoCode, route, calculateRoute } = useStore();
    const [center] = useState({ lat: 39.8283, lng: -98.5795 }) // Center of USA
    const ZOOM_LEVEL = 4
    const mapRef = useRef()

    useEffect(() => {
        if (sourceGeoCode && targetGeoCode) {
            calculateRoute();
        }
    }, [sourceGeoCode, targetGeoCode, calculateRoute]);

    useEffect(() => {
        console.log(route)
    }, [route]);

    return (
        <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
            <MapContainer 
                center={center} 
                zoom={ZOOM_LEVEL} 
                ref={mapRef}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
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
                <UpdateMapBounds sourceGeoCode={sourceGeoCode} targetGeoCode={targetGeoCode} route={route} />
            </MapContainer>
            <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1000 }}>
                {children}
            </div>
        </div>
    )
}

export default OpenStreetMap
