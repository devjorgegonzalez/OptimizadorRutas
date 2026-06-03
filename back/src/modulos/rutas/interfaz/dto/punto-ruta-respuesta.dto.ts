import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PuntoRutaRespuestaDto {
  @ApiProperty({ description: 'Identificador del punto de ruta', example: 1 })
  id: number;

  @ApiProperty({ description: 'Identificador de la ruta del camión', example: 5 })
  rutaCamionId: number;

  @ApiProperty({ description: 'Orden de visita del punto', example: 0 })
  orden: number;

  @ApiProperty({ description: 'Tipo de punto', enum: ['ORIGEN', 'FABRICA', 'CLIENTE'], example: 'ORIGEN' })
  tipoPunto: string;

  @ApiProperty({ description: 'Latitud del punto', example: 10.4806 })
  latitud: number;

  @ApiProperty({ description: 'Longitud del punto', example: -66.9036 })
  longitud: number;

  @ApiPropertyOptional({ description: 'Descripción o nombre del punto', example: 'Ubicación actual del camión', nullable: true })
  descripcion: string | null;

  @ApiProperty({ description: 'Fecha de creación', example: '2026-06-03T19:57:01.000Z' })
  creadoEn: Date;

  @ApiProperty({ description: 'Fecha de última actualización', example: '2026-06-03T19:57:01.000Z' })
  actualizadoEn: Date;
}
