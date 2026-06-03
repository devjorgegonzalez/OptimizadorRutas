'use client';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Truck, Save } from 'lucide-react';
import { Camion } from '../aplicacion/camiones.service';
import { MapaUbicacion } from './mapa-ubicacion';

const schema = z.object({
  placa: z
    .string()
    .min(3, { message: 'La placa debe tener al menos 3 caracteres' })
    .max(10, { message: 'La placa no puede exceder 10 caracteres' })
    .regex(/^[A-Za-z0-9-]+$/, { message: 'Placa solo debe contener letras, números y guiones' }),
  capacidad: z
    .coerce.number()
    .positive({ message: 'La capacidad debe ser mayor a cero' }),
  latitud: z.number().min(-90).max(90),
  longitud: z.number().min(-180).max(180),
});

type FormValores = z.infer<typeof schema>;

interface ModalCamionProps {
  camion: Camion | null; // null si es creación
  abierto: boolean;
  onCerrar: () => void;
  onGuardar: (datos: Omit<Camion, 'id' | 'creadoEn' | 'actualizadoEn'>) => Promise<void>;
}

export const ModalCamion: React.FC<ModalCamionProps> = ({ camion, abierto, onCerrar, onGuardar }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValores>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      placa: '',
      capacidad: 1,
      latitud: 10.4806, // Caracas lat
      longitud: -66.9036, // Caracas lng
    },
  });

  const watchLat = watch('latitud');
  const watchLng = watch('longitud');

  // Cargar datos del camión al abrir para edición
  useEffect(() => {
    if (abierto) {
      if (camion) {
        reset({
          placa: camion.placa,
          capacidad: camion.capacidad,
          latitud: camion.puntoOrigen.latitud,
          longitud: camion.puntoOrigen.longitud,
        });
      } else {
        reset({
          placa: '',
          capacidad: 5,
          latitud: 10.4806,
          longitud: -66.9036,
        });
      }
    }
  }, [camion, abierto, reset]);

  if (!abierto) return null;

  const alEnviar = async (valores: FormValores) => {
    const ubicacion = {
      latitud: valores.latitud,
      longitud: valores.longitud,
    };
    
    await onGuardar({
      placa: valores.placa.toUpperCase().trim(),
      capacidad: valores.capacidad,
      puntoOrigen: ubicacion,
      ultimaUbicacion: ubicacion,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fondo oscuro */}
      <div 
        onClick={onCerrar}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Caja modal */}
      <div className="relative bg-card text-foreground border border-border w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in z-10 max-h-[90vh]">
        
        {/* Cabecera */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-border bg-muted/20">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-2 rounded-xl text-primary">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-foreground">
              {camion ? 'Editar Camión' : 'Registrar Nuevo Camión'}
            </h3>
          </div>
          <button
            onClick={onCerrar}
            className="p-1.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo / Formulario */}
        <form onSubmit={handleSubmit(alEnviar)} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Campo Placa */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Placa del Camión</label>
              <input
                type="text"
                placeholder="Ej. AB123CD"
                {...register('placa')}
                className={`w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground uppercase
                  ${errors.placa ? 'border-destructive focus:ring-destructive/20 focus:border-destructive' : 'border-border'}
                `}
              />
              {errors.placa && (
                <p className="text-xs text-destructive font-medium">{errors.placa.message}</p>
              )}
            </div>

            {/* Campo Capacidad */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Capacidad (Toneladas)</label>
              <input
                type="number"
                step="0.01"
                placeholder="Ej. 12"
                {...register('capacidad', { valueAsNumber: true })}
                className={`w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground
                  ${errors.capacidad ? 'border-destructive focus:ring-destructive/20 focus:border-destructive' : 'border-border'}
                `}
              />
              {errors.capacidad && (
                <p className="text-xs text-destructive font-medium">{errors.capacidad.message}</p>
              )}
            </div>
          </div>

          {/* Componente Mapa */}
          <div className="border-t border-border/50 pt-5">
            <Controller
              name="latitud"
              control={control}
              render={({ field }) => (
                <MapaUbicacion
                  latitud={field.value}
                  longitud={watchLng}
                  onChange={(lat, lng) => {
                    setValue('latitud', lat);
                    setValue('longitud', lng);
                  }}
                />
              )}
            />
          </div>

          {/* Pie del formulario / Botones */}
          <div className="flex items-center justify-end gap-3 border-t border-border pt-5 mt-4">
            <button
              type="button"
              onClick={onCerrar}
              className="px-5 py-2.5 rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground font-semibold text-sm transition-all cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/95 disabled:bg-primary/50 text-primary-foreground font-semibold text-sm px-6 py-2.5 rounded-xl transition-all shadow-md shadow-primary/10 flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Guardando...' : 'Guardar Camión'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
