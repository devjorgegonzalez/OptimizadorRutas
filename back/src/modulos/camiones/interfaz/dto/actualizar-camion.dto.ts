import { ApiPropertyOptional } from '@nestjs/swagger';
import { z } from 'zod';
import { UbicacionSchema, UbicacionDto } from './crear-camion.dto';

export const ActualizarCamionSchema = z.object({
  placa: z.string().min(1).max(20).optional(),
  capacidad: z.coerce.number().positive().optional(),
  puntoOrigen: UbicacionSchema.optional(),
  ultimaUbicacion: UbicacionSchema.optional(),
});

export class ActualizarCamionDto {
  @ApiPropertyOptional({ description: 'Placa única del camión', example: 'AB123CD' })
  placa?: string;

  @ApiPropertyOptional({ description: 'Capacidad máxima de carga', example: 18.0 })
  capacidad?: number;

  @ApiPropertyOptional({ description: 'Punto de origen', type: UbicacionDto })
  puntoOrigen?: UbicacionDto;

  @ApiPropertyOptional({ description: 'Última ubicación conocida', type: UbicacionDto })
  ultimaUbicacion?: UbicacionDto;
}
