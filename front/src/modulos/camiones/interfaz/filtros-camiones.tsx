'use client';
import React, { useState } from 'react';
import { Search, Plus, RefreshCw } from 'lucide-react';

interface FiltrosCamionesProps {
  onFiltrar: (placa: string) => void;
  onAgregarClick: () => void;
  onRefrescar: () => void;
}

export const FiltrosCamiones: React.FC<FiltrosCamionesProps> = ({ onFiltrar, onAgregarClick, onRefrescar }) => {
  const [placa, setPlaca] = useState('');

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    onFiltrar(placa);
  };

  const manejarLimpiar = () => {
    setPlaca('');
    onFiltrar('');
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-card p-6 rounded-2xl border border-border shadow-xs">
      <form onSubmit={manejarEnvio} className="flex-1 flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            placeholder="Buscar por placa..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
          />
        </div>
        <button
          type="submit"
          className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium text-sm px-5 py-2.5 rounded-xl transition-all border border-border shadow-xs cursor-pointer"
        >
          Filtrar
        </button>
        {placa && (
          <button
            type="button"
            onClick={manejarLimpiar}
            className="text-muted-foreground hover:text-foreground text-sm font-medium px-3 py-2 cursor-pointer"
          >
            Limpiar
          </button>
        )}
      </form>

      <div className="flex items-center gap-2">
        <button
          onClick={onRefrescar}
          className="p-2.5 rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer"
          title="Refrescar lista"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
        <button
          onClick={onAgregarClick}
          className="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-primary/10 flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Nuevo Camión
        </button>
      </div>
    </div>
  );
};
