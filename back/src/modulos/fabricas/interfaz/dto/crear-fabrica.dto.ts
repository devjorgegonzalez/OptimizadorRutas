import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { z } from 'zod';

export const CrearFabricaSchema = z.object({
  nombre: z.string().min(1, { message: 'El nombre es requerido' }).max(100),
  latitud: z.coerce.number().min(-90).max(90, { message: 'La latitud debe estar entre -90 y 90' }),
  longitud: z.coerce.number().min(-180).max(180, { message: 'La longitud debe estar entre -180 y 180' }),
  activo: z.boolean().default(true),
  descripcion: z.string().max(255).optional().nullable(),
  direccion: z.string().max(255).optional().nullable(),
});

export class CrearFabricaDto {
  @ApiProperty({ description: 'Nombre de la fábrica', example: 'Fábrica Principal Caracas' })
  nombre: string;

  @ApiProperty({ description: 'Latitud de la fábrica', example: 10.4806 })
  latitud: number;

  @ApiProperty({ description: 'Longitud de la fábrica', example: -66.9036 })
  longitud: number;

  @ApiProperty({ description: 'Indica si la fábrica está activa', example: true, default: true })
  activo: boolean;

  @ApiPropertyOptional({ description: 'Descripción opcional', example: 'Fábrica de carga principal' })
  descripcion?: string | null;

  @ApiPropertyOptional({ description: 'Dirección física opcional', example: 'Zona Industrial La Yaguara' })
  direccion?: string | null;
}
