'use client'

import React, { useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

const OpenStreetMap = ({ children }) => {
    const [center, setCenter] = useState({ lat: -4.043477, lng: 39.668205 })
    const ZOOM_LEVEL = 9
    const mapRef = useRef()

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
                <Marker position={[center.lat, center.lng]} icon={icon} />
            </MapContainer>
            <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1000 }}>
                {children}
            </div>
        </div>
    )
}

export default OpenStreetMap
