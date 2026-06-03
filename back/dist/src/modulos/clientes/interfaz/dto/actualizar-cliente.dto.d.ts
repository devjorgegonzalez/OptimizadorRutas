import { z } from 'zod';
export declare const ActualizarClienteSchema: z.ZodObject<{
    nombre: z.ZodOptional<z.ZodString>;
    latitud: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    longitud: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    activo: z.ZodOptional<z.ZodBoolean>;
    descripcion: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    direccion: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare class ActualizarClienteDto {
    nombre?: string;
    latitud?: number;
    longitud?: number;
    activo?: boolean;
    descripcion?: string | null;
    direccion?: string | null;
}
