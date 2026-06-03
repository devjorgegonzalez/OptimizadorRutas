'use client';
import React from 'react';
import { Edit2, Trash2, MapPin } from 'lucide-react';
import { Camion } from '../aplicacion/camiones.service';

interface TablaCamionesProps {
  camiones: Camion[];
  onEditar: (camion: Camion) => void;
  onEliminar: (id: number) => void;
}

export const TablaCamiones: React.FC<TablaCamionesProps> = ({ camiones, onEditar, onEliminar }) => {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-muted-foreground text-xs font-semibold uppercase tracking-wider">
              <th className="px-6 py-4">Placa</th>
              <th className="px-6 py-4">Capacidad</th>
              <th className="px-6 py-4">Punto Origen (Lat, Lng)</th>
              <th className="px-6 py-4">Última Ubicación (Lat, Lng)</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {camiones.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-4xl">🚛</span>
                    <p className="mt-4 font-semibold text-lg text-foreground">No se encontraron camiones</p>
                    <p className="text-sm mt-1">Registra un nuevo camión para comenzar.</p>
                  </div>
                </td>
              </tr>
            ) : (
              camiones.map((camion) => (
                <tr 
                  key={camion.id}
                  className="hover:bg-muted/10 transition-colors"
                >
                  <td className="px-6 py-4.5 font-bold text-foreground">
                    <span className="bg-primary/5 text-primary border border-primary/20 px-3 py-1 rounded-md text-xs tracking-wider font-mono">
                      {camion.placa}
                    </span>
                  </td>
                  <td className="px-6 py-4.5 text-muted-foreground">
                    <span className="font-semibold text-foreground">{camion.capacidad}</span> Toneladas
                  </td>
                  <td className="px-6 py-4.5">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${camion.puntoOrigen.latitud},${camion.puntoOrigen.longitud}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-blue-500 hover:text-blue-600 transition-colors gap-1.5 font-mono"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      {camion.puntoOrigen.latitud.toFixed(4)}, {camion.puntoOrigen.longitud.toFixed(4)}
                    </a>
                  </td>
                  <td className="px-6 py-4.5">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${camion.ultimaUbicacion.latitud},${camion.ultimaUbicacion.longitud}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-blue-500 hover:text-blue-600 transition-colors gap-1.5 font-mono"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      {camion.ultimaUbicacion.latitud.toFixed(4)}, {camion.ultimaUbicacion.longitud.toFixed(4)}
                    </a>
                  </td>
                  <td className="px-6 py-4.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onEditar(camion)}
                        className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                        title="Editar camión"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEliminar(camion.id)}
                        className="p-2 rounded-lg hover:bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all cursor-pointer"
                        title="Eliminar camión"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
