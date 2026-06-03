'use client';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Settings, Save } from 'lucide-react';
import { Fabrica } from '../aplicacion/fabricas.service';
import { MapaUbicacion } from '../../camiones/interfaz/mapa-ubicacion'; // Reusamos el mapa

const schema = z.object({
  nombre: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(100, { message: 'El nombre no puede exceder 100 caracteres' }),
  activo: z.boolean(),
  latitud: z.number().min(-90).max(90),
  longitud: z.number().min(-180).max(180),
  descripcion: z.string().max(255).optional().nullable(),
  direccion: z.string().max(255).optional().nullable(),
});

type FormValores = z.infer<typeof schema>;

interface ModalFabricaProps {
  fabrica: Fabrica | null;
  abierto: boolean;
  onCerrar: () => void;
  onGuardar: (datos: Omit<Fabrica, 'id' | 'creadoEn' | 'actualizadoEn'>) => Promise<void>;
}

export const ModalFabrica: React.FC<ModalFabricaProps> = ({ fabrica, abierto, onCerrar, onGuardar }) => {
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
      nombre: '',
      activo: true,
      latitud: 10.4806,
      longitud: -66.9036,
      descripcion: '',
      direccion: '',
    },
  });

  const watchLat = watch('latitud');
  const watchLng = watch('longitud');

  useEffect(() => {
    if (abierto) {
      if (fabrica) {
        reset({
          nombre: fabrica.nombre,
          activo: fabrica.activo,
          latitud: fabrica.latitud,
          longitud: fabrica.longitud,
          descripcion: fabrica.descripcion || '',
          direccion: fabrica.direccion || '',
        });
      } else {
        reset({
          nombre: '',
          activo: true,
          latitud: 10.4806,
          longitud: -66.9036,
          descripcion: '',
          direccion: '',
        });
      }
    }
  }, [fabrica, abierto, reset]);

  if (!abierto) return null;

  const alEnviar = async (valores: FormValores) => {
    await onGuardar({
      nombre: valores.nombre.trim(),
      latitud: valores.latitud,
      longitud: valores.longitud,
      activo: valores.activo,
      descripcion: valores.descripcion || null,
      direccion: valores.direccion || null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        onClick={onCerrar}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="relative bg-card text-foreground border border-border w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in z-10 max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-border bg-muted/20">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-2 rounded-xl text-primary">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-foreground">
              {fabrica ? 'Editar Fábrica' : 'Registrar Nueva Fábrica'}
            </h3>
          </div>
          <button
            onClick={onCerrar}
            className="p-1.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(alEnviar)} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Nombre de la Fábrica</label>
              <input
                type="text"
                placeholder="Ej. Planta Caracas"
                {...register('nombre')}
                className={`w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground
                  ${errors.nombre ? 'border-destructive focus:ring-destructive/20 focus:border-destructive' : 'border-border'}
                `}
              />
              {errors.nombre && (
                <p className="text-xs text-destructive font-medium">{errors.nombre.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Estado</label>
              <select
                {...register('activo', {
                  setValueAs: (value) => value === 'true' || value === true
                })}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Descripción (Opcional)</label>
              <input
                type="text"
                placeholder="Ej. Planta de carga de cemento"
                {...register('descripcion')}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Dirección Física (Opcional)</label>
              <input
                type="text"
                placeholder="Ej. Zona Industrial La Yaguara"
                {...register('direccion')}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
              />
            </div>
          </div>

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
              {isSubmitting ? 'Guardando...' : 'Guardar Fábrica'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
