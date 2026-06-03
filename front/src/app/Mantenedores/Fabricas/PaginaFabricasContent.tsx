'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { Factory, ShieldAlert, Award, ToggleLeft, ToggleRight } from 'lucide-react';
import { useLoading } from '@/context/LoadingContext';
import { fabricasService, Fabrica } from '@/modulos/fabricas/aplicacion/fabricas.service';
import { FiltrosFabricas } from '@/modulos/fabricas/interfaz/filtros-fabricas';
import { TablaFabricas } from '@/modulos/fabricas/interfaz/tabla-fabricas';
import { ModalFabrica } from '@/modulos/fabricas/interfaz/modal-fabrica';

export default function PaginaFabricasContent() {
  const { setLoading } = useLoading();
  const [fabricas, setFabricas] = useState<Fabrica[]>([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [fabricaSeleccionada, setFabricaSeleccionada] = useState<Fabrica | null>(null);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  const cargarFabricas = useCallback(async (nombre?: string) => {
    setLoading(true);
    setErrorBanner(null);
    try {
      const data = await fabricasService.listar(nombre);
      setFabricas(data);
    } catch (err: any) {
      setErrorBanner(err.message || 'No se pudo conectar con el servidor de la API.');
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    cargarFabricas();
  }, [cargarFabricas]);

  const manejarGuardarFabrica = async (datos: Omit<Fabrica, 'id' | 'creadoEn' | 'actualizadoEn'>) => {
    setLoading(true);
    setErrorBanner(null);
    setMensajeExito(null);
    try {
      if (fabricaSeleccionada) {
        await fabricasService.actualizar(fabricaSeleccionada.id, datos);
        setMensajeExito(`Fábrica ${datos.nombre} actualizada exitosamente.`);
      } else {
        await fabricasService.crear(datos);
        setMensajeExito(`Fábrica ${datos.nombre} registrada exitosamente.`);
      }
      setModalAbierto(false);
      setFabricaSeleccionada(null);
      await cargarFabricas(filtroNombre);
    } catch (err: any) {
      setErrorBanner(err.message || 'Ocurrió un error al guardar la fábrica.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const manejarEliminarFabrica = async (id: number) => {
    const fabrica = fabricas.find(f => f.id === id);
    if (!fabrica) return;

    const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar la fábrica ${fabrica.nombre}?`);
    if (!confirmar) return;

    setLoading(true);
    setErrorBanner(null);
    setMensajeExito(null);
    try {
      await fabricasService.eliminar(id);
      setMensajeExito(`Fábrica ${fabrica.nombre} eliminada exitosamente.`);
      await cargarFabricas(filtroNombre);
    } catch (err: any) {
      setErrorBanner(err.message || 'Error al eliminar la fábrica.');
    } finally {
      setLoading(false);
    }
  };

  const abrirParaNuevo = () => {
    setFabricaSeleccionada(null);
    setModalAbierto(true);
  };

  const abrirParaEditar = (fabrica: Fabrica) => {
    setFabricaSeleccionada(fabrica);
    setModalAbierto(true);
  };

  const totalFabricas = fabricas.length;
  const activas = fabricas.filter(f => f.activo).length;
  const inactivas = totalFabricas - activas;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Gestión de Fábricas</h1>
        <p className="text-muted-foreground mt-1">
          Administra las plantas o fábricas de origen/carga de productos.
        </p>
      </div>

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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-card p-5 rounded-2xl border border-border shadow-xs flex items-center space-x-4">
          <div className="bg-primary/10 p-3 rounded-xl text-primary">
            <Factory className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Fábricas</p>
            <p className="text-2xl font-bold text-foreground mt-1">{totalFabricas}</p>
          </div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-xs flex items-center space-x-4">
          <div className="bg-green-500/10 p-3 rounded-xl text-green-600 dark:text-green-400">
            <ToggleRight className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Activas</p>
            <p className="text-2xl font-bold text-foreground mt-1">{activas}</p>
          </div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-xs flex items-center space-x-4">
          <div className="bg-amber-500/10 p-3 rounded-xl text-amber-500">
            <ToggleLeft className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Inactivas</p>
            <p className="text-2xl font-bold text-foreground mt-1">{inactivas}</p>
          </div>
        </div>
      </div>

      <FiltrosFabricas
        onFiltrar={(nombre) => {
          setFiltroNombre(nombre);
          cargarFabricas(nombre);
        }}
        onAgregarClick={abrirParaNuevo}
        onRefrescar={() => cargarFabricas(filtroNombre)}
      />

      <TablaFabricas
        fabricas={fabricas}
        onEditar={abrirParaEditar}
        onEliminar={manejarEliminarFabrica}
      />

      <ModalFabrica
        fabrica={fabricaSeleccionada}
        abierto={modalAbierto}
        onCerrar={() => setModalAbierto(false)}
        onGuardar={manejarGuardarFabrica}
      />
    </div>
  );
}
