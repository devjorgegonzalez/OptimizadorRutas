'use client';
import React from 'react';
import { Edit2, Trash2, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { Fabrica } from '../aplicacion/fabricas.service';

interface TablaFabricasProps {
  fabricas: Fabrica[];
  onEditar: (fabrica: Fabrica) => void;
  onEliminar: (id: number) => void;
}

export const TablaFabricas: React.FC<TablaFabricasProps> = ({ fabricas, onEditar, onEliminar }) => {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-muted-foreground text-xs font-semibold uppercase tracking-wider">
              <th className="px-6 py-4">Fábrica</th>
              <th className="px-6 py-4">Dirección</th>
              <th className="px-6 py-4">Ubicación (Lat, Lng)</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {fabricas.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-4xl">🏭</span>
                    <p className="mt-4 font-semibold text-lg text-foreground">No se encontraron fábricas</p>
                    <p className="text-sm mt-1">Registra una nueva fábrica para comenzar.</p>
                  </div>
                </td>
              </tr>
            ) : (
              fabricas.map((fabrica) => (
                <tr 
                  key={fabrica.id}
                  className="hover:bg-muted/10 transition-colors"
                >
                  <td className="px-6 py-4.5">
                    <div>
                      <p className="font-bold text-foreground">{fabrica.nombre}</p>
                      {fabrica.descripcion && (
                        <p className="text-xs text-muted-foreground mt-0.5 max-w-xs truncate">{fabrica.descripcion}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4.5 text-muted-foreground max-w-xs truncate">
                    {fabrica.direccion || <span className="italic text-xs text-muted-foreground/65">No especificada</span>}
                  </td>
                  <td className="px-6 py-4.5">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${fabrica.latitud},${fabrica.longitud}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-blue-500 hover:text-blue-600 transition-colors gap-1.5 font-mono"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      {fabrica.latitud.toFixed(4)}, {fabrica.longitud.toFixed(4)}
                    </a>
                  </td>
                  <td className="px-6 py-4.5">
                    {fabrica.activo ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Activo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-destructive/10 text-destructive border border-destructive/20">
                        <XCircle className="w-3.5 h-3.5" />
                        Inactivo
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onEditar(fabrica)}
                        className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                        title="Editar fábrica"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEliminar(fabrica.id)}
                        className="p-2 rounded-lg hover:bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all cursor-pointer"
                        title="Eliminar fábrica"
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
