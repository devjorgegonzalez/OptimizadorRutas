import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { z } from 'zod';

export const CrearClienteSchema = z.object({
  nombre: z.string().min(1, { message: 'El nombre es requerido' }).max(100),
  latitud: z.coerce.number().min(-90).max(90, { message: 'La latitud debe estar entre -90 y 90' }),
  longitud: z.coerce.number().min(-180).max(180, { message: 'La longitud debe estar entre -180 y 180' }),
  activo: z.boolean().default(true),
  descripcion: z.string().max(255).optional().nullable(),
  direccion: z.string().max(255).optional().nullable(),
});

export class CrearClienteDto {
  @ApiProperty({ description: 'Nombre del cliente', example: 'Supermercado Central Caracas' })
  nombre: string;

  @ApiProperty({ description: 'Latitud del cliente', example: 10.4806 })
  latitud: number;

  @ApiProperty({ description: 'Longitud del cliente', example: -66.9036 })
  longitud: number;

  @ApiProperty({ description: 'Indica si el cliente está activo', example: true, default: true })
  activo: boolean;

  @ApiPropertyOptional({ description: 'Descripción opcional', example: 'Cliente corporativo' })
  descripcion?: string | null;

  @ApiPropertyOptional({ description: 'Dirección física opcional', example: 'Av. Francisco de Miranda, Local 4' })
  direccion?: string | null;
}
