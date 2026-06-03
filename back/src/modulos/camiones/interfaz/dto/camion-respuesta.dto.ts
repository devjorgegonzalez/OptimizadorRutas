import { ApiProperty } from '@nestjs/swagger';
import { UbicacionDto } from './crear-camion.dto';

export class CamionRespuestaDto {
  @ApiProperty({ description: 'Identificador del camión', example: 1 })
  id: number;

  @ApiProperty({ description: 'Placa única del camión', example: 'AB123CD' })
  placa: string;

  @ApiProperty({ description: 'Capacidad del camión', example: 15.5 })
  capacidad: number;

  @ApiProperty({ description: 'Punto de origen', type: UbicacionDto })
  puntoOrigen: UbicacionDto;

  @ApiProperty({ description: 'Última ubicación conocida', type: UbicacionDto })
  ultimaUbicacion: UbicacionDto;

  @ApiProperty({ description: 'Fecha de creación', example: '2026-06-03T19:57:01.000Z' })
  creadoEn: Date;

  @ApiProperty({ description: 'Fecha de última actualización', example: '2026-06-03T19:57:01.000Z' })
  actualizadoEn: Date;
}
