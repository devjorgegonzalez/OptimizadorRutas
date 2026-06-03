import { ApiPropertyOptional } from '@nestjs/swagger';
import { z } from 'zod';

export const ActualizarClienteSchema = z.object({
  nombre: z.string().min(1).max(100).optional(),
  latitud: z.coerce.number().min(-90).max(90).optional(),
  longitud: z.coerce.number().min(-180).max(180).optional(),
  activo: z.boolean().optional(),
  descripcion: z.string().max(255).optional().nullable(),
  direccion: z.string().max(255).optional().nullable(),
});

export class ActualizarClienteDto {
  @ApiPropertyOptional({ description: 'Nombre del cliente', example: 'Supermercado Central Caracas' })
  nombre?: string;

  @ApiPropertyOptional({ description: 'Latitud del cliente', example: 10.4806 })
  latitud?: number;

  @ApiPropertyOptional({ description: 'Longitud del cliente', example: -66.9036 })
  longitud?: number;

  @ApiPropertyOptional({ description: 'Indica si el cliente está activo', example: true })
  activo?: boolean;

  @ApiPropertyOptional({ description: 'Descripción opcional', example: 'Cliente corporativo' })
  descripcion?: string | null;

  @ApiPropertyOptional({ description: 'Dirección física opcional', example: 'Av. Francisco de Miranda, Local 4' })
  direccion?: string | null;
}
