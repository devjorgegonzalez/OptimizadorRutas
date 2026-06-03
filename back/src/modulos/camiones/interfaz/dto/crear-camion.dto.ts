import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const UbicacionSchema = z.object({
  latitud: z.coerce.number().min(-90).max(90, { message: 'La latitud debe estar entre -90 y 90' }),
  longitud: z.coerce.number().min(-180).max(180, { message: 'La longitud debe estar entre -180 y 180' }),
});

export const CrearCamionSchema = z.object({
  placa: z.string().min(1, { message: 'La placa es requerida' }).max(20),
  capacidad: z.coerce.number().positive({ message: 'La capacidad debe ser mayor a cero' }),
  puntoOrigen: UbicacionSchema,
  ultimaUbicacion: UbicacionSchema,
});

export class UbicacionDto {
  @ApiProperty({ description: 'Latitud de la ubicación', example: 10.2522 })
  latitud: number;

  @ApiProperty({ description: 'Longitud de la ubicación', example: -67.6015 })
  longitud: number;
}

export class CrearCamionDto {
  @ApiProperty({ description: 'Placa única del camión', example: 'AB123CD' })
  placa: string;

  @ApiProperty({ description: 'Capacidad máxima de carga', example: 15.5 })
  capacidad: number;

  @ApiProperty({ description: 'Punto de origen / última ubicación seleccionada', type: UbicacionDto })
  puntoOrigen: UbicacionDto;

  @ApiProperty({ description: 'Última ubicación conocida', type: UbicacionDto })
  ultimaUbicacion: UbicacionDto;
}
