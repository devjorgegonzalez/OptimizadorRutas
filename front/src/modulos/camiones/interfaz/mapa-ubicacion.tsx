'use client';
import React, { useEffect, useRef, useState } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { MapPin, Info } from 'lucide-react';

interface MapaUbicacionProps {
  latitud: number;
  longitud: number;
  onChange: (lat: number, lng: number) => void;
}

// Coordenadas aproximadas de ciudades venezolanas para referencia en el mapa interactivo
const CIUDADES_REF = [
  { nombre: 'Caracas', lat: 10.4806, lng: -66.9036, x: 50, y: 35 },
  { nombre: 'Maracay', lat: 10.2522, lng: -67.6015, x: 42, y: 36 },
  { nombre: 'El Tigre', lat: 8.8875, lng: -64.2454, x: 70, y: 55 },
  { nombre: 'Barquisimeto', lat: 10.0739, lng: -69.3228, x: 28, y: 38 },
  { nombre: 'Maracaibo', lat: 10.6427, lng: -71.6125, x: 10, y: 32 },
  { nombre: 'San Cristóbal', lat: 7.7669, lng: -72.2250, x: 8, y: 70 },
  { nombre: 'Puerto Ordaz', lat: 8.3083, lng: -62.6528, x: 82, y: 62 },
];

export const MapaUbicacion: React.FC<MapaUbicacionProps> = ({ latitud, longitud, onChange }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerInstanceRef = useRef<any>(null);
  const [useGoogleMaps, setUseGoogleMaps] = useState(false);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [apiKeyMissing, setApiKeyMissing] = useState(true);
  const [markerCoords, setMarkerCoords] = useState({ lat: latitud, lng: longitud });

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Actualizar coordenadas internas cuando cambien las propiedades
  useEffect(() => {
    setMarkerCoords({ lat: latitud, lng: longitud });
  }, [latitud, longitud]);

  useEffect(() => {
    if (!googleMapsApiKey) {
      setUseGoogleMaps(false);
      setApiKeyMissing(true);
      return;
    }

    setApiKeyMissing(false);
    
    try {
      setOptions({
        key: googleMapsApiKey,
        v: 'weekly',
      });
    } catch (e) {
      console.warn('setOptions error:', e);
    }

    importLibrary('maps')
      .then(() => {
        setUseGoogleMaps(true);
        setGoogleMapsLoaded(true);
      })
      .catch((err) => {
        console.error('Error loading Google Maps API:', err);
        setUseGoogleMaps(false);
      });
  }, [googleMapsApiKey]);

  // Inicializar mapa una sola vez cuando se haya cargado Google Maps
  useEffect(() => {
    if (!googleMapsLoaded || !mapRef.current || mapInstanceRef.current) return;

    const google = (window as any).google;
    const mapsLib = google?.maps;
    if (!mapsLib) return;

    const map = new mapsLib.Map(mapRef.current, {
      center: { lat: latitud || 10.4806, lng: longitud || -66.9036 },
      zoom: 7,
      styles: [
        {
          featureType: 'all',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#746855' }],
        },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }],
        },
      ],
    });

    const MarkerClass = mapsLib.Marker;
    const marker = new MarkerClass({
      position: { lat: latitud || 10.4806, lng: longitud || -66.9036 },
      map: map,
      draggable: true,
      animation: google?.maps?.Animation?.DROP,
    });

    // Evento de clic en el mapa para posicionar el marcador
    map.addListener('click', (e: any) => {
      if (e.latLng) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        marker.setPosition({ lat, lng });
        onChange(lat, lng);
        setMarkerCoords({ lat, lng });
      }
    });

    // Evento de arrastrar marcador
    marker.addListener('dragend', () => {
      const pos = marker.getPosition();
      if (pos) {
        onChange(pos.lat(), pos.lng());
        setMarkerCoords({ lat: pos.lat(), lng: pos.lng() });
      }
    });

    mapInstanceRef.current = map;
    markerInstanceRef.current = marker;
  }, [googleMapsLoaded]);

  // Sincronizar coordenadas externas al marcador del mapa
  useEffect(() => {
    if (markerInstanceRef.current) {
      const currentPos = markerInstanceRef.current.getPosition();
      if (currentPos) {
        const currentLat = currentPos.lat();
        const currentLng = currentPos.lng();
        if (currentLat !== latitud || currentLng !== longitud) {
          markerInstanceRef.current.setPosition({ lat: latitud, lng: longitud });
          if (mapInstanceRef.current) {
            mapInstanceRef.current.panTo({ lat: latitud, lng: longitud });
          }
        }
      }
    }
  }, [latitud, longitud]);

  // Manejador de clics en el mapa interactivo Mock de Venezuela
  const manejarClicMapaMock = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100; // Porcentaje X
    const y = ((e.clientY - rect.top) / rect.height) * 100; // Porcentaje Y

    // Mapear porcentajes X e Y a coordenadas geográficas estimadas de Venezuela
    // Latitud Venezuela: ~6.0 a ~12.5 (Sur a Norte)
    // Longitud Venezuela: ~-73.0 a ~-60.0 (Oeste a Este)
    const latMin = 6.0;
    const latMax = 12.0;
    const lngMin = -73.0;
    const lngMax = -60.0;

    const lat = latMax - (y / 100) * (latMax - latMin);
    const lng = lngMin + (x / 100) * (lngMax - lngMin);

    // Ajustar a 4 decimales
    const latRedondeada = Math.round(lat * 10000) / 10000;
    const lngRedondeada = Math.round(lng * 10000) / 10000;

    onChange(latRedondeada, lngRedondeada);
    setMarkerCoords({ lat: latRedondeada, lng: lngRedondeada });
  };

  // Convertir latitud/longitud a posición porcentual para el pin en el mapa mock
  const obtenerPorcentajesPin = () => {
    const latMin = 6.0;
    const latMax = 12.0;
    const lngMin = -73.0;
    const lngMax = -60.0;

    const x = ((markerCoords.lng - lngMin) / (lngMax - lngMin)) * 100;
    const y = ((latMax - markerCoords.lat) / (latMax - latMin)) * 100;

    // Retornar limitando los rangos al contenedor
    return {
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    };
  };

  const pinPos = obtenerPorcentajesPin();

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-sm">
        <label className="font-semibold text-foreground">Seleccionar Ubicación en el Mapa</label>
        <span className="text-muted-foreground text-xs font-mono">
          Lat: {markerCoords.lat.toFixed(4)}, Lng: {markerCoords.lng.toFixed(4)}
        </span>
      </div>

      <div 
        ref={mapRef} 
        style={{ display: useGoogleMaps ? 'block' : 'none' }}
        className="w-full h-72 rounded-xl border border-border shadow-inner"
      />

      {!useGoogleMaps && (
        <div className="relative border border-border rounded-2xl overflow-hidden bg-slate-900 shadow-md">
          {/* Advertencia elegante */}
          <div className="absolute top-3 left-3 right-3 bg-slate-800/90 backdrop-blur-xs border border-slate-700/50 px-4 py-2.5 rounded-lg text-slate-300 text-xs z-10 flex items-start space-x-2 shadow-sm">
            <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-slate-200">
                {apiKeyMissing ? 'Modo de simulación (Sin API Key)' : 'Cargando Google Maps...'}
              </p>
              <p className="opacity-80 mt-0.5">
                Haz clic sobre el mapa estilizado de Venezuela para ubicar las coordenadas.
              </p>
            </div>
          </div>

          {/* Contenedor interactivo SVG Mock */}
          <div 
            onClick={manejarClicMapaMock}
            className="w-full h-72 relative cursor-crosshair select-none bg-slate-950 flex items-center justify-center p-4 overflow-hidden"
          >
            {/* Mapa de fondo dibujado con SVG */}
            <svg 
              className="w-full h-full opacity-30 text-slate-800" 
              viewBox="0 0 500 300" 
              fill="currentColor"
            >
              {/* Contorno simplificado de Venezuela */}
              <path d="M 50,100 Q 120,40 180,80 T 280,60 T 360,50 T 450,110 Q 420,180 390,220 T 300,260 T 240,240 T 150,230 T 90,190 Z" />
              {/* Mar Caribe */}
              <text x="250" y="30" fill="#38bdf8" opacity="0.4" fontSize="12" className="italic font-semibold tracking-wider text-center">MAR CARIBE</text>
            </svg>

            {/* Ciudades de referencia en el mapa */}
            {CIUDADES_REF.map((ciudad) => (
              <div 
                key={ciudad.nombre}
                className="absolute flex flex-col items-center pointer-events-none"
                style={{ left: `${ciudad.x}%`, top: `${ciudad.y}%` }}
              >
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full shadow-xs" />
                <span className="text-[9px] text-slate-400 mt-0.5 font-medium">{ciudad.nombre}</span>
              </div>
            ))}

            {/* Pin del marcador */}
            <div 
              className="absolute pointer-events-none -ml-3.5 -mt-7 animate-bounce"
              style={{ left: `${pinPos.x}%`, top: `${pinPos.y}%` }}
            >
              <div className="relative">
                <MapPin className="w-7 h-7 text-primary fill-primary/30" />
                <div className="absolute top-7 left-3 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(37,99,235,1)] animate-ping" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
