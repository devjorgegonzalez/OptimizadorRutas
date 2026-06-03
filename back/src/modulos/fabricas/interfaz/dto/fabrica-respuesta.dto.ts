import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FabricaRespuestaDto {
  @ApiProperty({ description: 'Identificador único de la fábrica', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nombre de la fábrica', example: 'Fábrica Principal Caracas' })
  nombre: string;

  @ApiProperty({ description: 'Latitud de la ubicación', example: 10.4806 })
  latitud: number;

  @ApiProperty({ description: 'Longitud de la ubicación', example: -66.9036 })
  longitud: number;

  @ApiProperty({ description: 'Indica si la fábrica está activa', example: true })
  activo: boolean;

  @ApiProperty({ description: 'Fecha de creación', example: '2026-06-03T19:57:01.000Z' })
  creadoEn: Date;

  @ApiProperty({ description: 'Fecha de última actualización', example: '2026-06-03T19:57:01.000Z' })
  actualizadoEn: Date;

  @ApiPropertyOptional({ description: 'Descripción opcional', example: 'Fábrica de carga principal', nullable: true })
  descripcion: string | null;

  @ApiPropertyOptional({ description: 'Dirección física opcional', example: 'Zona Industrial La Yaguara', nullable: true })
  direccion: string | null;
}
