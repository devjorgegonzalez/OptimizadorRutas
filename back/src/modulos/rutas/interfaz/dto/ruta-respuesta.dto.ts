import { ApiProperty } from '@nestjs/swagger';
import { PuntoRutaRespuestaDto } from './punto-ruta-respuesta.dto';

export class RutaRespuestaDto {
  @ApiProperty({ description: 'Identificador único de la ruta del camión', example: 1 })
  id: number;

  @ApiProperty({ description: 'Identificador del camión asignado', example: 2 })
  camionId: number;

  @ApiProperty({ description: 'Puntos ordenados de la ruta del camión', type: [PuntoRutaRespuestaDto] })
  puntos: PuntoRutaRespuestaDto[];

  @ApiProperty({ description: 'Fecha de creación', example: '2026-06-03T19:57:01.000Z' })
  creadoEn: Date;

  @ApiProperty({ description: 'Fecha de última actualización', example: '2026-06-03T19:57:01.000Z' })
  actualizadoEn: Date;
}
