
"use client"

import 'leaflet/dist/leaflet.css';
import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import L from 'leaflet';

// Fix for default icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


interface WeatherMapProps {
  lat: number;
  lon: number;
}

const WeatherMap: FC<WeatherMapProps> = ({ lat, lon }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      // Initialize map only if it doesn't exist
      const map = L.map(mapContainerRef.current).setView([lat, lon], 13);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([lat, lon]).addTo(map)
        .bindPopup('Your selected location.')
        .openPopup();
    } else if (mapRef.current) {
      // If map already exists, just update its view
      mapRef.current.setView([lat, lon], 13);
      
      // Optionally, update marker position as well
      const marker = mapRef.current.getPane('markerPane')?.children[0] as any;
      if (marker) {
        marker.setLatLng([lat, lon]);
      }
    }

    // Cleanup function to destroy map instance on component unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lat, lon]);

  return (
    <div ref={mapContainerRef} className="h-64 w-full rounded-lg overflow-hidden border" />
  );
};

export default WeatherMap;
