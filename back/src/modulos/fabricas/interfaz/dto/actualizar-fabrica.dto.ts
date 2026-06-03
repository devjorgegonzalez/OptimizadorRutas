import { ApiPropertyOptional } from '@nestjs/swagger';
import { z } from 'zod';

export const ActualizarFabricaSchema = z.object({
  nombre: z.string().min(1).max(100).optional(),
  latitud: z.coerce.number().min(-90).max(90).optional(),
  longitud: z.coerce.number().min(-180).max(180).optional(),
  activo: z.boolean().optional(),
  descripcion: z.string().max(255).optional().nullable(),
  direccion: z.string().max(255).optional().nullable(),
});

export class ActualizarFabricaDto {
  @ApiPropertyOptional({ description: 'Nombre de la fábrica', example: 'Fábrica Principal Caracas' })
  nombre?: string;

  @ApiPropertyOptional({ description: 'Latitud de la fábrica', example: 10.4806 })
  latitud?: number;

  @ApiPropertyOptional({ description: 'Longitud de la fábrica', example: -66.9036 })
  longitud?: number;

  @ApiPropertyOptional({ description: 'Indica si la fábrica está activa', example: true })
  activo?: boolean;

  @ApiPropertyOptional({ description: 'Descripción opcional', example: 'Fábrica de carga principal' })
  descripcion?: string | null;

  @ApiPropertyOptional({ description: 'Dirección física opcional', example: 'Zona Industrial La Yaguara' })
  direccion?: string | null;
}
