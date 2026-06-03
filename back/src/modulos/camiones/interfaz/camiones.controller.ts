import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { CrearCamionUseCase } from '../aplicacion/crear-camion.use-case';
import { ActualizarCamionUseCase } from '../aplicacion/actualizar-camion.use-case';
import { ListarCamionesUseCase } from '../aplicacion/listar-camiones.use-case';
import { ObtenerCamionUseCase } from '../aplicacion/obtener-camion.use-case';
import { EliminarCamionUseCase } from '../aplicacion/eliminar-camion.use-case';
import { CrearCamionDto, CrearCamionSchema } from './dto/crear-camion.dto';
import { ActualizarCamionDto, ActualizarCamionSchema } from './dto/actualizar-camion.dto';
import { CamionRespuestaDto } from './dto/camion-respuesta.dto';
import { ZodValidationPipe } from '../../../compartido/zod-validation.pipe';

@ApiTags('Camiones')
@Controller('camiones')
export class CamionesController {
  constructor(
    private readonly crearCamionUseCase: CrearCamionUseCase,
    private readonly actualizarCamionUseCase: ActualizarCamionUseCase,
    private readonly listarCamionesUseCase: ListarCamionesUseCase,
    private readonly obtenerCamionUseCase: ObtenerCamionUseCase,
    private readonly eliminarCamionUseCase: EliminarCamionUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar un nuevo camión' })
  @ApiResponse({ status: 201, description: 'Camión creado correctamente', type: CamionRespuestaDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 409, description: 'Placa duplicada' })
  @UsePipes(new ZodValidationPipe(CrearCamionSchema))
  async crear(@Body() dto: CrearCamionDto): Promise<CamionRespuestaDto> {
    return this.crearCamionUseCase.ejecutar(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar y filtrar camiones de la flota' })
  @ApiQuery({ name: 'placa', required: false, description: 'Filtrar por placa (coincidencia parcial)' })
  @ApiResponse({ status: 200, description: 'Listado de camiones devuelto con éxito', type: [CamionRespuestaDto] })
  async listar(@Query('placa') placa?: string): Promise<CamionRespuestaDto[]> {
    return this.listarCamionesUseCase.ejecutar(placa);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener los detalles de un camión por su ID' })
  @ApiParam({ name: 'id', description: 'ID del camión', type: Number })
  @ApiResponse({ status: 200, description: 'Detalles del camión encontrados', type: CamionRespuestaDto })
  @ApiResponse({ status: 404, description: 'Camión no encontrado' })
  async obtenerPorId(@Param('id') id: string): Promise<CamionRespuestaDto> {
    return this.obtenerCamionUseCase.ejecutar(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar los datos de un camión' })
  @ApiParam({ name: 'id', description: 'ID del camión', type: Number })
  @ApiResponse({ status: 200, description: 'Camión actualizado correctamente', type: CamionRespuestaDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 404, description: 'Camión no encontrado' })
  @ApiResponse({ status: 409, description: 'Placa duplicada por otro camión' })
  @UsePipes(new ZodValidationPipe(ActualizarCamionSchema))
  async actualizar(@Param('id') id: string, @Body() dto: ActualizarCamionDto): Promise<CamionRespuestaDto> {
    return this.actualizarCamionUseCase.ejecutar(Number(id), dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un camión del sistema y sus rutas asociadas' })
  @ApiParam({ name: 'id', description: 'ID del camión', type: Number })
  @ApiResponse({ status: 204, description: 'Camión eliminado' })
  @ApiResponse({ status: 404, description: 'Camión no encontrado' })
  async eliminar(@Param('id') id: string): Promise<void> {
    await this.eliminarCamionUseCase.ejecutar(Number(id));
  }
}
