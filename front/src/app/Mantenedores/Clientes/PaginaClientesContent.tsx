'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { Users, ShieldAlert, Award, ToggleLeft, ToggleRight } from 'lucide-react';
import { useLoading } from '@/context/LoadingContext';
import { clientesService, Cliente } from '@/modulos/clientes/aplicacion/clientes.service';
import { FiltrosClientes } from '@/modulos/clientes/interfaz/filtros-clientes';
import { TablaClientes } from '@/modulos/clientes/interfaz/tabla-clientes';
import { ModalCliente } from '@/modulos/clientes/interfaz/modal-cliente';

export default function PaginaClientesContent() {
  const { setLoading } = useLoading();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  const cargarClientes = useCallback(async (nombre?: string) => {
    setLoading(true);
    setErrorBanner(null);
    try {
      const data = await clientesService.listar(nombre);
      setClientes(data);
    } catch (err: any) {
      setErrorBanner(err.message || 'No se pudo conectar con el servidor de la API.');
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    cargarClientes();
  }, [cargarClientes]);

  const manejarGuardarCliente = async (datos: Omit<Cliente, 'id' | 'creadoEn' | 'actualizadoEn'>) => {
    setLoading(true);
    setErrorBanner(null);
    setMensajeExito(null);
    try {
      if (clienteSeleccionado) {
        await clientesService.actualizar(clienteSeleccionado.id, datos);
        setMensajeExito(`Cliente ${datos.nombre} actualizado exitosamente.`);
      } else {
        await clientesService.crear(datos);
        setMensajeExito(`Cliente ${datos.nombre} registrado exitosamente.`);
      }
      setModalAbierto(false);
      setClienteSeleccionado(null);
      await cargarClientes(filtroNombre);
    } catch (err: any) {
      setErrorBanner(err.message || 'Ocurrió un error al guardar el cliente.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const manejarEliminarCliente = async (id: number) => {
    const cliente = clientes.find(c => c.id === id);
    if (!cliente) return;

    const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar al cliente ${cliente.nombre}?`);
    if (!confirmar) return;

    setLoading(true);
    setErrorBanner(null);
    setMensajeExito(null);
    try {
      await clientesService.eliminar(id);
      setMensajeExito(`Cliente ${cliente.nombre} eliminado exitosamente.`);
      await cargarClientes(filtroNombre);
    } catch (err: any) {
      setErrorBanner(err.message || 'Error al eliminar el cliente.');
    } finally {
      setLoading(false);
    }
  };

  const abrirParaNuevo = () => {
    setClienteSeleccionado(null);
    setModalAbierto(true);
  };

  const abrirParaEditar = (cliente: Cliente) => {
    setClienteSeleccionado(cliente);
    setModalAbierto(true);
  };

  const totalClientes = clientes.length;
  const activos = clientes.filter(c => c.activo).length;
  const inactivos = totalClientes - activos;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Gestión de Clientes</h1>
        <p className="text-muted-foreground mt-1">
          Administra las ubicaciones de entrega de carga y datos de clientes.
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
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Clientes</p>
            <p className="text-2xl font-bold text-foreground mt-1">{totalClientes}</p>
          </div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-xs flex items-center space-x-4">
          <div className="bg-green-500/10 p-3 rounded-xl text-green-600 dark:text-green-400">
            <ToggleRight className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Activos</p>
            <p className="text-2xl font-bold text-foreground mt-1">{activos}</p>
          </div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-xs flex items-center space-x-4">
          <div className="bg-amber-500/10 p-3 rounded-xl text-amber-500">
            <ToggleLeft className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Inactivos</p>
            <p className="text-2xl font-bold text-foreground mt-1">{inactivos}</p>
          </div>
        </div>
      </div>

      <FiltrosClientes
        onFiltrar={(nombre) => {
          setFiltroNombre(nombre);
          cargarClientes(nombre);
        }}
        onAgregarClick={abrirParaNuevo}
        onRefrescar={() => cargarClientes(filtroNombre)}
      />

      <TablaClientes
        clientes={clientes}
        onEditar={abrirParaEditar}
        onEliminar={manejarEliminarCliente}
      />

      <ModalCliente
        cliente={clienteSeleccionado}
        abierto={modalAbierto}
        onCerrar={() => setModalAbierto(false)}
        onGuardar={manejarGuardarCliente}
      />
    </div>
  );
}
