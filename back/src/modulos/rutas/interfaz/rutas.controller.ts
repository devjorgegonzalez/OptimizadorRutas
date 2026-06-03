import { Controller, Get, Post, Delete, Param, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ObtenerRutaCamionUseCase } from '../aplicacion/obtener-ruta.use-case';
import { EliminarRutaCamionUseCase } from '../aplicacion/eliminar-ruta.use-case';
import { GenerarRutasUseCase } from '../aplicacion/generar-rutas.use-case';
import { RutaRespuestaDto } from './dto/ruta-respuesta.dto';

@ApiTags('Rutas')
@Controller('rutas')
export class RutasController {
  constructor(
    private readonly obtenerRutaCamionUseCase: ObtenerRutaCamionUseCase,
    private readonly eliminarRutaCamionUseCase: EliminarRutaCamionUseCase,
    private readonly generarRutasUseCase: GenerarRutasUseCase,
  ) {}

  @Post('generar')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generar y optimizar rutas para camiones sin ruta asignada' })
  @ApiResponse({ status: 200, description: 'Rutas generadas y optimizadas con éxito', type: [RutaRespuestaDto] })
  async generar(): Promise<RutaRespuestaDto[]> {
    return this.generarRutasUseCase.ejecutar();
  }

  @Get('camion/:camionId')
  @ApiOperation({ summary: 'Obtener la ruta asignada a un camión' })
  @ApiParam({ name: 'camionId', description: 'ID del camión', type: Number })
  @ApiResponse({ status: 200, description: 'Detalles de la ruta encontrados', type: RutaRespuestaDto })
  @ApiResponse({ status: 404, description: 'Ruta no encontrada para este camión' })
  async obtenerPorCamionId(@Param('camionId') camionId: string): Promise<RutaRespuestaDto> {
    const ruta = await this.obtenerRutaCamionUseCase.ejecutar(Number(camionId));
    if (!ruta) {
      throw new NotFoundException(`Ruta no encontrada para el camión con ID ${camionId}`);
    }
    return ruta;
  }

  @Delete('camion/:camionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar la ruta asignada a un camión' })
  @ApiParam({ name: 'camionId', description: 'ID del camión', type: Number })
  @ApiResponse({ status: 204, description: 'Ruta eliminada con éxito' })
  async eliminar(@Param('camionId') camionId: string): Promise<void> {
    await this.eliminarRutaCamionUseCase.ejecutar(Number(camionId));
  }
}
