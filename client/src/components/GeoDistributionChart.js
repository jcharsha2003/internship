// src/components/GeoDistributionChart.js

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { fetchGeoData } from '../services/api';
import 'leaflet/dist/leaflet.css';

const GeoDistributionChart = () => {
    const [geoData, setGeoData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchGeoData();
            setGeoData(data);
        };
        getData();
    }, []);

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "500px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {geoData.map((location, index) => (
                <Marker key={index} position={[location.lat, location.lng]}>
                    <Popup>
                        {location.name}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default GeoDistributionChart;
