'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useLoading } from '@/context/LoadingContext';
import { camionesService, Camion } from '@/modulos/camiones/aplicacion/camiones.service';
import { clientesService, Cliente } from '@/modulos/clientes/aplicacion/clientes.service';
import { fabricasService, Fabrica } from '@/modulos/fabricas/aplicacion/fabricas.service';
import { rutasService, RutaCamion } from '@/modulos/rutas/aplicacion/rutas.service';
import { SidebarVisor } from '@/modulos/rutas/interfaz/sidebar-visor';
import { MapaFlota } from '@/modulos/rutas/interfaz/mapa-flota';
import { ShieldAlert } from 'lucide-react';

export default function PaginaVisorContent() {
  const { setLoading } = useLoading();
  const [camiones, setCamiones] = useState<Camion[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [fabricas, setFabricas] = useState<Fabrica[]>([]);
  const [rutas, setRutas] = useState<Record<number, RutaCamion | null>>({});
  const [camionSeleccionado, setCamionSeleccionado] = useState<Camion | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [recargarState, setRecargarState] = useState(0);

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    setErrorText(null);
    try {
      // 1. Cargar Camiones, Clientes y Fábricas
      const [listaCamiones, listaClientes, listaFabricas] = await Promise.all([
        camionesService.listar(),
        clientesService.listar(),
        fabricasService.listar(),
      ]);

      setCamiones(listaCamiones);
      setClientes(listaClientes);
      setFabricas(listaFabricas);

      // 2. Cargar rutas para cada camión de forma paralela
      const mapaRutas: Record<number, RutaCamion | null> = {};
      await Promise.all(
        listaCamiones.map(async c => {
          try {
            const ruta = await rutasService.obtenerPorCamionId(c.id);
            mapaRutas[c.id] = ruta;
          } catch (err: any) {
            if (err.message === 'ROUTE_NOT_FOUND') {
              mapaRutas[c.id] = null;
            } else {
              console.warn(`Error al cargar ruta para camión ${c.placa}:`, err.message);
              mapaRutas[c.id] = null;
            }
          }
        }),
      );

      setRutas(mapaRutas);
    } catch (err: any) {
      setErrorText(err.message || 'No se pudo conectar con el servidor de la API.');
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos, recargarState]);

  // Manejar la generación optimizada de rutas
  const manejarGenerarRutas = async () => {
    setLoading(true);
    setErrorText(null);
    try {
      await rutasService.generarRutas();
      // Incrementar trigger para forzar recarga completa
      setRecargarState(prev => prev + 1);
      setCamionSeleccionado(null);
    } catch (err: any) {
      setErrorText(err.message || 'Ocurrió un error al optimizar las rutas de la flota.');
    } finally {
      setLoading(false);
    }
  };

  // Manejar la eliminación de la ruta asignada a un camión
  const manejarEliminarRuta = async (camionId: number) => {
    const camion = camiones.find(c => c.id === camionId);
    const confirmar = window.confirm(
      `¿Estás seguro de que deseas eliminar la ruta del camión ${camion ? camion.placa : camionId}?`,
    );
    if (!confirmar) return;

    setLoading(true);
    setErrorText(null);
    try {
      await rutasService.eliminarRuta(camionId);
      setRutas(prev => ({
        ...prev,
        [camionId]: null,
      }));
      if (camionSeleccionado?.id === camionId) {
        setCamionSeleccionado(null);
      }
    } catch (err: any) {
      setErrorText(err.message || 'Error al eliminar la ruta del camión.');
    } finally {
      setLoading(false);
    }
  };

  const seleccionarCamionPorId = (id: number | null) => {
    if (id === null) {
      setCamionSeleccionado(null);
    } else {
      const camion = camiones.find(c => c.id === id);
      if (camion) {
        setCamionSeleccionado(camion);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-130px)] md:h-[calc(100vh-80px)] -m-6 md:-m-10 overflow-hidden relative">
      {/* Banner de Error Flotante */}
      {errorText && (
        <div className="absolute top-4 left-4 right-4 md:left-auto md:w-96 bg-destructive/90 backdrop-blur-xs border border-destructive/20 p-4 rounded-xl text-white z-50 flex items-start space-x-3 shadow-2xl animate-fade-in">
          <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Error de Operación</p>
            <p className="text-xs opacity-90 mt-0.5">{errorText}</p>
          </div>
        </div>
      )}

      {/* Panel lateral de control */}
      <SidebarVisor
        camiones={camiones}
        rutas={rutas}
        camionSeleccionado={camionSeleccionado}
        onSeleccionarCamion={setCamionSeleccionado}
        onGenerarRutas={manejarGenerarRutas}
        onEliminarRuta={manejarEliminarRuta}
        loading={false}
      />

      {/* Mapa interactivo de pantalla completa */}
      <MapaFlota
        camiones={camiones}
        clientes={clientes}
        fabricas={fabricas}
        rutas={rutas}
        camionSeleccionado={camionSeleccionado}
        onSeleccionarCamionId={seleccionarCamionPorId}
      />
    </div>
  );
}
