import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

type MapboxProps = {
    center?: [number, number];
    zoom?: number;
};

export function MapboxComponent({ center = [-74.5, 40], zoom = 9 }: MapboxProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        mapboxgl.accessToken =
            'pk.eyJ1Ijoibm5pa29sb3Zza2lpIiwiYSI6ImNtNTV4bnBieDJ1cGkyaXIweHFudnExOHIifQ.2BCm2X2seF86kqiOMkIQfA';

        if (mapContainerRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                center,
                zoom,
            });
        }

        return () => {
            // Clean up map instance on unmount
            mapRef.current?.remove();
        };
    }, [center, zoom]);

    return <div ref={mapContainerRef} style={{ height: '100%' }} className="map-container" />;
}
