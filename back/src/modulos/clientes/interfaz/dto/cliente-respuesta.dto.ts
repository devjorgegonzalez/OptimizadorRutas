import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ClienteRespuestaDto {
  @ApiProperty({ description: 'Identificador único del cliente', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nombre del cliente', example: 'Supermercado Central Caracas' })
  nombre: string;

  @ApiProperty({ description: 'Latitud de la ubicación', example: 10.4806 })
  latitud: number;

  @ApiProperty({ description: 'Longitud de la ubicación', example: -66.9036 })
  longitud: number;

  @ApiProperty({ description: 'Indica si el cliente está activo', example: true })
  activo: boolean;

  @ApiProperty({ description: 'Fecha de creación', example: '2026-06-03T19:57:01.000Z' })
  creadoEn: Date;

  @ApiProperty({ description: 'Fecha de última actualización', example: '2026-06-03T19:57:01.000Z' })
  actualizadoEn: Date;

  @ApiPropertyOptional({ description: 'Descripción opcional del cliente', example: 'Cliente corporativo', nullable: true })
  descripcion: string | null;

  @ApiPropertyOptional({ description: 'Dirección física opcional', example: 'Av. Francisco de Miranda, Local 4', nullable: true })
  direccion: string | null;
}
