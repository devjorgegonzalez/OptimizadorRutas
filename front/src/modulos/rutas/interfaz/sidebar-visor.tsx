'use client';
import React, { useState } from 'react';
import { Search, Truck, MapPin, Trash2, ArrowRight, Play, RefreshCw, Layers, CheckCircle, HelpCircle } from 'lucide-react';
import { Camion } from '../../camiones/aplicacion/camiones.service';
import { RutaCamion } from '../aplicacion/rutas.service';

interface SidebarVisorProps {
  camiones: Camion[];
  rutas: Record<number, RutaCamion | null>;
  camionSeleccionado: Camion | null;
  onSeleccionarCamion: (camion: Camion | null) => void;
  onGenerarRutas: () => void;
  onEliminarRuta: (camionId: number) => void;
  loading: boolean;
}

export const SidebarVisor: React.FC<SidebarVisorProps> = ({
  camiones,
  rutas,
  camionSeleccionado,
  onSeleccionarCamion,
  onGenerarRutas,
  onEliminarRuta,
  loading,
}) => {
  const [filtroPlaca, setFiltroPlaca] = useState('');

  const camionesFiltrados = camiones.filter(c =>
    c.placa.toLowerCase().includes(filtroPlaca.toLowerCase()),
  );

  const camionesSinRuta = camiones.filter(c => !rutas[c.id]);

  return (
    <div className="w-full md:w-96 bg-card border-r border-border flex flex-col h-full shadow-lg">
      {/* Cabecera del Visor */}
      <div className="p-6 border-b border-border space-y-4">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            Optimización de Rutas
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Supervisa la flota y genera recorridos de carga optimizados.
          </p>
        </div>

        {/* Botón de Optimización */}
        <button
          onClick={onGenerarRutas}
          disabled={loading || camionesSinRuta.length === 0}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer
            ${
              camionesSinRuta.length === 0
                ? 'bg-muted text-muted-foreground shadow-none cursor-not-allowed'
                : 'bg-primary hover:bg-primary/95 text-primary-foreground shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]'
            }
          `}
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4 fill-current" />
          )}
          Optimizar Flota ({camionesSinRuta.length})
        </button>
      </div>

      {/* Buscador */}
      <div className="px-6 py-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={filtroPlaca}
            onChange={e => setFiltroPlaca(e.target.value)}
            placeholder="Buscar camión por placa..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Contenido Dinámico */}
      <div className="flex-1 overflow-y-auto">
        {camionSeleccionado ? (
          /* Vista Detalle del Camión Seleccionado */
          <div className="p-6 space-y-6 animate-fade-in">
            {/* Cabecera del Detalle */}
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-sm">
                    CAMIÓN
                  </span>
                  <span className="text-foreground font-mono font-bold">
                    {camionSeleccionado.placa}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Capacidad: {camionSeleccionado.capacidad} Ton
                </p>
              </div>
              <button
                onClick={() => onSeleccionarCamion(null)}
                className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer"
              >
                Cerrar Detalle
              </button>
            </div>

            {/* Secuencia de la Ruta */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Recorrido de Entrega
              </h3>

              {rutas[camionSeleccionado.id] ? (
                /* Detalle de los Puntos de la Ruta */
                <div className="relative pl-6 border-l border-dashed border-border ml-2 space-y-5 py-1">
                  {rutas[camionSeleccionado.id]?.puntos.map((punto, index) => {
                    let iconColor = 'bg-primary text-primary-foreground';
                    let label = 'Parada';

                    if (punto.tipoPunto === 'ORIGEN') {
                      iconColor = 'bg-slate-500 text-white';
                      label = 'Origen';
                    } else if (punto.tipoPunto === 'FABRICA') {
                      iconColor = 'bg-amber-500 text-white';
                      label = 'Carga en Fábrica';
                    } else if (punto.tipoPunto === 'CLIENTE') {
                      iconColor = 'bg-green-500 text-white';
                      label = 'Descarga en Cliente';
                    }

                    return (
                      <div key={punto.id} className="relative flex flex-col gap-0.5">
                        {/* Indicador de Punto */}
                        <div
                          className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${iconColor}`}
                        >
                          {index + 1}
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                          {label}
                        </span>
                        <span className="text-xs font-bold text-foreground">
                          {punto.descripcion}
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          ({punto.latitud.toFixed(4)}, {punto.longitud.toFixed(4)})
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Camión Sin Ruta */
                <div className="bg-muted/40 p-4 rounded-xl border border-border flex flex-col items-center justify-center text-center py-6">
                  <HelpCircle className="w-8 h-8 text-muted-foreground/60 mb-2" />
                  <p className="text-xs font-bold text-foreground">Sin ruta asignada</p>
                  <p className="text-[10px] text-muted-foreground mt-1 max-w-[200px]">
                    Presiona el botón "Optimizar Flota" para calcular su recorrido.
                  </p>
                </div>
              )}
            </div>

            {/* Acción de Eliminación */}
            {rutas[camionSeleccionado.id] && (
              <button
                onClick={() => onEliminarRuta(camionSeleccionado.id)}
                className="w-full py-2.5 px-4 bg-destructive/10 hover:bg-destructive/15 text-destructive border border-destructive/20 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar Ruta Asignada
              </button>
            )}
          </div>
        ) : (
          /* Listado de Camiones */
          <div className="divide-y divide-border">
            {camionesFiltrados.length === 0 ? (
              <div className="p-8 text-center text-xs text-muted-foreground">
                No se encontraron camiones.
              </div>
            ) : (
              camionesFiltrados.map(camion => {
                const tieneRuta = !!rutas[camion.id];
                const ruta = rutas[camion.id];
                const totalParadas = ruta ? ruta.puntos.length : 0;

                return (
                  <div
                    key={camion.id}
                    onClick={() => onSeleccionarCamion(camion)}
                    className="p-4 hover:bg-muted/40 transition-colors cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2.5 rounded-xl transition-colors
                          ${
                            tieneRuta
                              ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                              : 'bg-amber-500/10 text-amber-500'
                          }
                        `}
                      >
                        <Truck className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-mono font-bold text-foreground group-hover:text-primary transition-colors">
                          {camion.placa}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Capacidad: {camion.capacidad} Ton
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {tieneRuta ? (
                        <div className="text-right">
                          <span className="inline-flex items-center gap-1 bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-sm">
                            <CheckCircle className="w-2.5 h-2.5" />
                            Ruta OK
                          </span>
                          <p className="text-[9px] text-muted-foreground mt-0.5">
                            {totalParadas} paradas
                          </p>
                        </div>
                      ) : (
                        <span className="bg-amber-500/10 text-amber-600 dark:text-amber-500 text-[10px] font-bold px-2 py-0.5 rounded-sm">
                          Sin Ruta
                        </span>
                      )}
                      <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};
