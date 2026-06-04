'use client';
import React, { useEffect, useRef, useState } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { Info, MapPin, Truck, Factory, UserCheck, X } from 'lucide-react';
import { Camion } from '../../camiones/aplicacion/camiones.service';
import { Cliente } from '../../clientes/aplicacion/clientes.service';
import { Fabrica } from '../../fabricas/aplicacion/fabricas.service';
import { RutaCamion } from '../aplicacion/rutas.service';

interface MapaFlotaProps {
  camiones: Camion[];
  clientes: Cliente[];
  fabricas: Fabrica[];
  rutas: Record<number, RutaCamion | null>;
  camionSeleccionado: Camion | null;
  onSeleccionarCamionId: (id: number | null) => void;
}

// Ciudades de referencia en Venezuela para la vista del mapa
const CIUDADES_REF = [
  { nombre: 'Caracas', lat: 10.4806, lng: -66.9036, x: 50, y: 35 },
  { nombre: 'Maracay', lat: 10.2522, lng: -67.6015, x: 42, y: 36 },
  { nombre: 'El Tigre', lat: 8.8875, lng: -64.2454, x: 70, y: 55 },
  { nombre: 'Barquisimeto', lat: 10.0739, lng: -69.3228, x: 28, y: 38 },
  { nombre: 'Maracaibo', lat: 10.6427, lng: -71.6125, x: 10, y: 32 },
  { nombre: 'San Cristóbal', lat: 7.7669, lng: -72.2250, x: 8, y: 70 },
  { nombre: 'Puerto Ordaz', lat: 8.3083, lng: -62.6528, x: 82, y: 62 },
];

export const MapaFlota: React.FC<MapaFlotaProps> = ({
  camiones,
  clientes,
  fabricas,
  rutas,
  camionSeleccionado,
  onSeleccionarCamionId,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const polylineRef = useRef<any>(null);

  const [useGoogleMaps, setUseGoogleMaps] = useState(false);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [apiKeyMissing, setApiKeyMissing] = useState(true);
  const [leyendaAbierta, setLeyendaAbierta] = useState(false);

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // 1. Cargar el SDK de Google Maps si está la API key
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

  // 2. Inicializar el mapa de Google Maps una sola vez
  useEffect(() => {
    if (!googleMapsLoaded || !mapContainerRef.current || mapInstanceRef.current) return;

    const google = (window as any).google;
    const mapsLib = google?.maps;
    if (!mapsLib) return;

    const map = new mapsLib.Map(mapContainerRef.current, {
      center: { lat: 9.3, lng: -66.5 },
      zoom: 6.5,
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

    mapInstanceRef.current = map;
  }, [googleMapsLoaded]);

  // 3. Actualizar marcadores y polilíneas en Google Maps cuando cambie el estado
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const google = (window as any).google;
    const mapsLib = google?.maps;
    if (!mapsLib) return;

    // Limpiar marcadores viejos
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    // Limpiar polilíneas viejas
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }

    // Filtrar camiones a mostrar
    const camionesAMostrar = camionSeleccionado
      ? [camionSeleccionado]
      : camiones;

    // A. Agregar marcadores de Camiones
    camionesAMostrar.forEach(c => {
      const tieneRuta = !!rutas[c.id];
      const iconUrl = tieneRuta
        ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

      const marker = new mapsLib.Marker({
        position: { lat: c.ultimaUbicacion.latitud, lng: c.ultimaUbicacion.longitud },
        map: mapInstanceRef.current,
        title: `Camión: ${c.placa}`,
        icon: iconUrl,
      });

      marker.addListener('click', () => {
        onSeleccionarCamionId(c.id);
      });

      markersRef.current.push(marker);
    });

    // B. Agregar marcadores de Fábricas (Amarillo/Naranja)
    fabricas.filter(f => f.activo).forEach(f => {
      const marker = new mapsLib.Marker({
        position: { lat: f.latitud, lng: f.longitud },
        map: mapInstanceRef.current,
        title: `Fábrica: ${f.nombre}`,
        icon: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
      });
      markersRef.current.push(marker);
    });

    // C. Agregar marcadores de Clientes (Azul)
    clientes.filter(c => c.activo).forEach(c => {
      const marker = new mapsLib.Marker({
        position: { lat: c.latitud, lng: c.longitud },
        map: mapInstanceRef.current,
        title: `Cliente: ${c.nombre}`,
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      });
      markersRef.current.push(marker);
    });

    // D. Dibujar la ruta y ajustar encuadre del mapa
    if (camionSeleccionado) {
      const ruta = rutas[camionSeleccionado.id];
      if (ruta && ruta.puntos.length > 0) {
        const pathCoords = ruta.puntos.map(p => ({ lat: p.latitud, lng: p.longitud }));

        const poly = new mapsLib.Polyline({
          path: pathCoords,
          geodesic: true,
          strokeColor: '#2563eb',
          strokeOpacity: 0.85,
          strokeWeight: 4,
          map: mapInstanceRef.current,
        });

        polylineRef.current = poly;

        // Ajustar encuadre del mapa a la ruta
        const bounds = new mapsLib.LatLngBounds();
        pathCoords.forEach(p => bounds.extend(p));
        mapInstanceRef.current.fitBounds(bounds);
      } else {
        // Si el camión no tiene ruta, centrar en la ubicación del camión
        mapInstanceRef.current.setCenter({
          lat: camionSeleccionado.ultimaUbicacion.latitud,
          lng: camionSeleccionado.ultimaUbicacion.longitud,
        });
        mapInstanceRef.current.setZoom(9);
      }
    } else {
      // Si no hay selección, restaurar vista general
      mapInstanceRef.current.setCenter({ lat: 9.3, lng: -66.5 });
      mapInstanceRef.current.setZoom(6.5);
    }
  }, [camiones, fabricas, clientes, rutas, camionSeleccionado, googleMapsLoaded]);

  // --- Lógica del Fallback SVG interactivo ---
  const latMin = 6.0;
  const latMax = 12.0;
  const lngMin = -73.0;
  const lngMax = -60.0;

  const aCoordenadasSvg = (lat: number, lng: number) => {
    const x = ((lng - lngMin) / (lngMax - lngMin)) * 100;
    const y = ((latMax - lat) / (latMax - latMin)) * 100;
    return {
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    };
  };

  const camionesSVG = camionSeleccionado ? [camionSeleccionado] : camiones;
  const fabricasActivas = fabricas.filter(f => f.activo);
  const clientesActivos = clientes.filter(c => c.activo);

  // Obtener puntos de la ruta si hay selección
  const rutaSeleccionada = camionSeleccionado ? rutas[camionSeleccionado.id] : null;
  const puntosRutaSvg = rutaSeleccionada?.puntos.map(p => aCoordenadasSvg(p.latitud, p.longitud)) || [];

  return (
    <div className="flex-1 relative flex flex-col h-[50%] md:h-full w-full bg-slate-950 order-1 md:order-2">
      {/* Indicador superior flotante */}
      <div className="absolute top-4 left-4 bg-slate-900/90 border border-slate-800/80 backdrop-blur-xs px-4 py-2.5 rounded-xl text-slate-300 text-xs z-10 flex items-start space-x-2 shadow-lg max-w-sm">
        <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
        <div>
          <p className="font-bold text-slate-200">
            {apiKeyMissing ? 'Visor Geográfico (Modo Simulado)' : 'Mapa de Flota Satelital'}
          </p>
          <p className="opacity-80 mt-0.5">
            {camionSeleccionado
              ? `Enfocado en Camión ${camionSeleccionado.placa}. Ruta: ${rutaSeleccionada ? `${rutaSeleccionada.puntos.length} puntos` : 'Sin asignar'}`
              : 'Mostrando todos los camiones activos en la red nacional de transporte.'}
          </p>
        </div>
      </div>

      {/* Contenedor del mapa Google Maps */}
      <div
        ref={mapContainerRef}
        style={{ display: useGoogleMaps ? 'block' : 'none' }}
        className="w-full h-full flex-1"
      />

      {/* Contenedor del Mapa SVG Venezuela de Fallback */}
      {!useGoogleMaps && (
        <div className="w-full h-full flex-1 relative flex items-center justify-center p-6 select-none overflow-hidden bg-slate-950">
          {/* Mapa SVG de fondo */}
          <svg
            className="w-full h-full max-h-[85vh] text-slate-900 opacity-40 hover:opacity-45 transition-opacity"
            viewBox="0 0 500 300"
            fill="currentColor"
          >
            {/* Contorno simplificado de la geografía venezolana */}
            <path d="M 50,100 Q 120,40 180,80 T 280,60 T 360,50 T 450,110 Q 420,180 390,220 T 300,260 T 240,240 T 150,230 T 90,190 Z" />
            {/* Mar Caribe */}
            <text x="250" y="30" fill="#38bdf8" opacity="0.3" fontSize="12" className="italic font-bold tracking-widest text-center">MAR CARIBE</text>
          </svg>

          {/* Ciudades de referencia en el SVG */}
          {CIUDADES_REF.map(ciudad => {
            const pos = aCoordenadasSvg(ciudad.lat, ciudad.lng);
            return (
              <div
                key={ciudad.nombre}
                className="absolute flex flex-col items-center pointer-events-none opacity-40"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full" />
                <span className="text-[8px] text-slate-400 mt-0.5 font-medium">{ciudad.nombre}</span>
              </div>
            );
          })}

          {/* Dibujo de la Polilínea de Ruta en el SVG */}
          {puntosRutaSvg.length > 1 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Línea de ruta con efecto dash animado */}
              <polyline
                points={puntosRutaSvg.map(p => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-route-flow"
                style={{
                  strokeDasharray: '4, 2',
                }}
              />
            </svg>
          )}

          {/* Marcadores de Fábricas en SVG */}
          {fabricasActivas.map(f => {
            const pos = aCoordenadasSvg(f.latitud, f.longitud);
            return (
              <div
                key={f.id}
                className="absolute -ml-3.5 -mt-3.5 flex flex-col items-center group z-20"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                title={`Fábrica: ${f.nombre}`}
              >
                <div className="bg-amber-500 hover:bg-amber-400 p-1.5 rounded-full text-white shadow-lg border border-amber-600 transition-transform hover:scale-110 cursor-pointer">
                  <Factory className="w-3.5 h-3.5" />
                </div>
                <span className="absolute top-7 bg-slate-900/90 text-white text-[8px] px-1.5 py-0.5 rounded-sm border border-slate-700 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
                  {f.nombre}
                </span>
              </div>
            );
          })}

          {/* Marcadores de Clientes en SVG */}
          {clientesActivos.map(c => {
            const pos = aCoordenadasSvg(c.latitud, c.longitud);
            return (
              <div
                key={c.id}
                className="absolute -ml-3.5 -mt-3.5 flex flex-col items-center group z-20"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                title={`Cliente: ${c.nombre}`}
              >
                <div className="bg-blue-600 hover:bg-blue-500 p-1.5 rounded-full text-white shadow-lg border border-blue-700 transition-transform hover:scale-110 cursor-pointer">
                  <UserCheck className="w-3.5 h-3.5" />
                </div>
                <span className="absolute top-7 bg-slate-900/90 text-white text-[8px] px-1.5 py-0.5 rounded-sm border border-slate-700 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
                  {c.nombre}
                </span>
              </div>
            );
          })}

          {/* Marcadores de Camiones en SVG */}
          {camionesSVG.map(c => {
            const pos = aCoordenadasSvg(c.ultimaUbicacion.latitud, c.ultimaUbicacion.longitud);
            const tieneRuta = !!rutas[c.id];

            return (
              <div
                key={c.id}
                onClick={() => onSeleccionarCamionId(c.id)}
                className="absolute -ml-4 -mt-4 flex flex-col items-center group cursor-pointer z-20"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <div
                  className={`p-2 rounded-full text-white shadow-xl border transition-all duration-200 group-hover:scale-110 active:scale-95
                    ${
                      tieneRuta
                        ? 'bg-emerald-600 border-emerald-700 group-hover:bg-emerald-500'
                        : 'bg-rose-600 border-rose-700 group-hover:bg-rose-500'
                    }
                  `}
                >
                  <Truck className="w-4 h-4" />
                </div>
                {/* Placa del camión */}
                <span className="mt-1 bg-slate-900/95 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded-sm border border-slate-800 shadow-sm">
                  {c.placa}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Botón flotante para alternar Leyenda */}
      <button
        onClick={() => setLeyendaAbierta(prev => !prev)}
        className="absolute bottom-4 right-4 bg-slate-900/95 border border-slate-800/90 hover:border-slate-700/90 text-slate-200 hover:text-white p-3 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 z-20 cursor-pointer flex items-center justify-center"
        title="Mostrar leyenda del mapa"
      >
        <Info className="w-5 h-5 text-blue-500" />
      </button>

      {/* Leyenda de Marcadores */}
      {leyendaAbierta && (
        <div className="absolute bottom-18 right-4 bg-slate-900/95 border border-slate-800/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl z-10 w-56 animate-fade-in flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              Leyenda
            </h4>
            <button 
              onClick={() => setLeyendaAbierta(false)}
              className="text-slate-400 hover:text-slate-200 p-0.5 rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex flex-col gap-2.5">
            {/* Camión con Ruta */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                {useGoogleMaps ? (
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs" />
                ) : (
                  <Truck className="w-3.5 h-3.5" />
                )}
              </div>
              <div className="text-[10px] leading-tight">
                <p className="font-bold text-slate-200">Camión con Ruta</p>
                <p className="text-[9px] text-slate-400">Ruta activa asignada</p>
              </div>
            </div>

            {/* Camión sin Ruta */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 shrink-0">
                {useGoogleMaps ? (
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-xs" />
                ) : (
                  <Truck className="w-3.5 h-3.5" />
                )}
              </div>
              <div className="text-[10px] leading-tight">
                <p className="font-bold text-slate-200">Camión sin Ruta</p>
                <p className="text-[9px] text-slate-400">Solo ubicación origen</p>
              </div>
            </div>

            {/* Fábrica */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                {useGoogleMaps ? (
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-xs" />
                ) : (
                  <Factory className="w-3.5 h-3.5" />
                )}
              </div>
              <div className="text-[10px] leading-tight">
                <p className="font-bold text-slate-200">Fábrica (Carga)</p>
                <p className="text-[9px] text-slate-400">Planta de carga activa</p>
              </div>
            </div>

            {/* Cliente */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 shrink-0">
                {useGoogleMaps ? (
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-xs" />
                ) : (
                  <UserCheck className="w-3.5 h-3.5" />
                )}
              </div>
              <div className="text-[10px] leading-tight">
                <p className="font-bold text-slate-200">Cliente (Entrega)</p>
                <p className="text-[9px] text-slate-400">Punto de descarga activo</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estilos CSS para el flujo animado de polilíneas SVG */}
      <style jsx global>{`
        @keyframes routeFlow {
          to {
            stroke-dashoffset: -12;
          }
        }
        .animate-route-flow {
          animation: routeFlow 2.5s linear infinite;
        }
      `}</style>
    </div>
  );
};
