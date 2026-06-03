'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { Truck, ShieldAlert, Award, TrendingUp } from 'lucide-react';
import { useLoading } from '@/context/LoadingContext';
import { camionesService, Camion } from '@/modulos/camiones/aplicacion/camiones.service';
import { FiltrosCamiones } from '@/modulos/camiones/interfaz/filtros-camiones';
import { TablaCamiones } from '@/modulos/camiones/interfaz/tabla-camiones';
import { ModalCamion } from '@/modulos/camiones/interfaz/modal-camion';

export default function PaginaCamionesContent() {
  const { setLoading } = useLoading();
  const [camiones, setCamiones] = useState<Camion[]>([]);
  const [filtroPlaca, setFiltroPlaca] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [camionSeleccionado, setCamionSeleccionado] = useState<Camion | null>(null);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  // Cargar camiones desde la API
  const cargarCamiones = useCallback(async (placa?: string) => {
    setLoading(true);
    setErrorBanner(null);
    try {
      const data = await camionesService.listar(placa);
      setCamiones(data);
    } catch (err: any) {
      setErrorBanner(err.message || 'No se pudo conectar con el servidor de la API.');
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    cargarCamiones();
  }, [cargarCamiones]);

  // Manejar creación o edición
  const manejarGuardarCamion = async (datos: Omit<Camion, 'id' | 'creadoEn' | 'actualizadoEn'>) => {
    setLoading(true);
    setErrorBanner(null);
    setMensajeExito(null);
    try {
      if (camionSeleccionado) {
        console.log(camionSeleccionado.id, datos)
        await camionesService.actualizar(camionSeleccionado.id, datos);
        setMensajeExito(`Camión con placa ${datos.placa} actualizado exitosamente.`);
      } else {
        await camionesService.crear(datos);
        setMensajeExito(`Camión con placa ${datos.placa} registrado exitosamente.`);
      }
      setModalAbierto(false);
      setCamionSeleccionado(null);
      // Recargar lista
      await cargarCamiones(filtroPlaca);
    } catch (err: any) {
      setErrorBanner(err.message || 'Ocurrió un error al procesar el camión.');
      throw err; // Lanza el error para que el modal sepa que no debe cerrarse si hay error
    } finally {
      setLoading(false);
    }
  };

  // Manejar eliminación
  const manejarEliminarCamion = async (id: number) => {
    const camion = camiones.find(c => c.id === id);
    if (!camion) return;

    const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar el camión con placa ${camion.placa}? Esta acción borrará todas sus rutas asociadas.`);
    if (!confirmar) return;

    setLoading(true);
    setErrorBanner(null);
    setMensajeExito(null);
    try {
      await camionesService.eliminar(id);
      setMensajeExito(`Camión con placa ${camion.placa} eliminado exitosamente.`);
      await cargarCamiones(filtroPlaca);
    } catch (err: any) {
      setErrorBanner(err.message || 'Error al eliminar el camión.');
    } finally {
      setLoading(false);
    }
  };

  // Abrir modal para nuevo camión
  const abrirParaNuevo = () => {
    setCamionSeleccionado(null);
    setModalAbierto(true);
  };

  // Abrir modal para editar
  const abrirParaEditar = (camion: Camion) => {
    setCamionSeleccionado(camion);
    setModalAbierto(true);
  };

  // Métricas rápidas
  const totalCamiones = camiones.length;
  const capacidadTotal = camiones.reduce((acc, c) => acc + c.capacidad, 0);
  const capacidadPromedio = totalCamiones > 0 ? (capacidadTotal / totalCamiones).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* Cabecera de Página */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Gestión de Camiones</h1>
          <p className="text-muted-foreground mt-1">
            Administra la flota de transporte, ubicaciones de origen y capacidad de carga.
          </p>
        </div>
      </div>

      {/* Alertas de Éxito / Error */}
      {errorBanner && (
        <div className="bg-destructive/10 border border-destructive/30 px-5 py-4 rounded-xl flex items-start space-x-3 text-destructive animate-fade-in">
          <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm font-medium">
            <span className="font-bold">Error:</span> {errorBanner}
          </div>
        </div>
      )}

      {mensajeExito && (
        <div className="bg-green-500/10 border border-green-500/30 px-5 py-4 rounded-xl flex items-start space-x-3 text-green-600 dark:text-green-400 animate-fade-in">
          <Award className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm font-medium">
            <span className="font-bold">Éxito:</span> {mensajeExito}
          </div>
        </div>
      )}

      {/* Cartas de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-card p-5 rounded-2xl border border-border shadow-xs flex items-center space-x-4">
          <div className="bg-primary/10 p-3 rounded-xl text-primary">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Flota Activa</p>
            <p className="text-2xl font-bold text-foreground mt-1">{totalCamiones} Camiones</p>
          </div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-xs flex items-center space-x-4">
          <div className="bg-blue-500/10 p-3 rounded-xl text-blue-500">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Capacidad Total</p>
            <p className="text-2xl font-bold text-foreground mt-1">{capacidadTotal.toFixed(1)} Toneladas</p>
          </div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-xs flex items-center space-x-4">
          <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-500">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Capacidad Promedio</p>
            <p className="text-2xl font-bold text-foreground mt-1">{capacidadPromedio} Toneladas</p>
          </div>
        </div>
      </div>

      {/* Filtros de Tabla */}
      <FiltrosCamiones
        onFiltrar={(placa) => {
          setFiltroPlaca(placa);
          cargarCamiones(placa);
        }}
        onAgregarClick={abrirParaNuevo}
        onRefrescar={() => cargarCamiones(filtroPlaca)}
      />

      {/* Tabla Principal */}
      <TablaCamiones
        camiones={camiones}
        onEditar={abrirParaEditar}
        onEliminar={manejarEliminarCamion}
      />

      {/* Modal de Ingreso / Edición */}
      <ModalCamion
        camion={camionSeleccionado}
        abierto={modalAbierto}
        onCerrar={() => setModalAbierto(false)}
        onGuardar={manejarGuardarCamion}
      />
    </div>
  );
}
