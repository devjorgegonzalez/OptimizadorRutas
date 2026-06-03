import { z } from 'zod';
export declare const UbicacionSchema: z.ZodObject<{
    latitud: z.ZodCoercedNumber<unknown>;
    longitud: z.ZodCoercedNumber<unknown>;
}, z.core.$strip>;
export declare const CrearCamionSchema: z.ZodObject<{
    placa: z.ZodString;
    capacidad: z.ZodCoercedNumber<unknown>;
    puntoOrigen: z.ZodObject<{
        latitud: z.ZodCoercedNumber<unknown>;
        longitud: z.ZodCoercedNumber<unknown>;
    }, z.core.$strip>;
    ultimaUbicacion: z.ZodObject<{
        latitud: z.ZodCoercedNumber<unknown>;
        longitud: z.ZodCoercedNumber<unknown>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare class UbicacionDto {
    latitud: number;
    longitud: number;
}
export declare class CrearCamionDto {
    placa: string;
    capacidad: number;
    puntoOrigen: UbicacionDto;
    ultimaUbicacion: UbicacionDto;
}
