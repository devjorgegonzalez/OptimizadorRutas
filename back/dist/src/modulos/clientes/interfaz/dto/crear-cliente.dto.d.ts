import { z } from 'zod';
export declare const CrearClienteSchema: z.ZodObject<{
    nombre: z.ZodString;
    latitud: z.ZodCoercedNumber<unknown>;
    longitud: z.ZodCoercedNumber<unknown>;
    activo: z.ZodDefault<z.ZodBoolean>;
    descripcion: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    direccion: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare class CrearClienteDto {
    nombre: string;
    latitud: number;
    longitud: number;
    activo: boolean;
    descripcion?: string | null;
    direccion?: string | null;
}
