import { z } from 'zod';
import { UbicacionDto } from './crear-camion.dto';
export declare const ActualizarCamionSchema: z.ZodObject<{
    placa: z.ZodOptional<z.ZodString>;
    capacidad: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    puntoOrigen: z.ZodOptional<z.ZodObject<{
        latitud: z.ZodCoercedNumber<unknown>;
        longitud: z.ZodCoercedNumber<unknown>;
    }, z.core.$strip>>;
    ultimaUbicacion: z.ZodOptional<z.ZodObject<{
        latitud: z.ZodCoercedNumber<unknown>;
        longitud: z.ZodCoercedNumber<unknown>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare class ActualizarCamionDto {
    placa?: string;
    capacidad?: number;
    puntoOrigen?: UbicacionDto;
    ultimaUbicacion?: UbicacionDto;
}
