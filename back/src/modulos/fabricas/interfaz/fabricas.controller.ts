import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { CrearFabricaUseCase } from '../aplicacion/crear-fabrica.use-case';
import { ActualizarFabricaUseCase } from '../aplicacion/actualizar-fabrica.use-case';
import { ListarFabricasUseCase } from '../aplicacion/listar-fabricas.use-case';
import { ObtenerFabricaUseCase } from '../aplicacion/obtener-fabrica.use-case';
import { EliminarFabricaUseCase } from '../aplicacion/eliminar-fabrica.use-case';
import { CrearFabricaDto, CrearFabricaSchema } from './dto/crear-fabrica.dto';
import { ActualizarFabricaDto, ActualizarFabricaSchema } from './dto/actualizar-fabrica.dto';
import { FabricaRespuestaDto } from './dto/fabrica-respuesta.dto';
import { ZodValidationPipe } from '../../../compartido/zod-validation.pipe';

@ApiTags('Fábricas')
@Controller('fabricas')
export class FabricasController {
  constructor(
    private readonly crearFabricaUseCase: CrearFabricaUseCase,
    private readonly actualizarFabricaUseCase: ActualizarFabricaUseCase,
    private readonly listarFabricasUseCase: ListarFabricasUseCase,
    private readonly obtenerFabricaUseCase: ObtenerFabricaUseCase,
    private readonly eliminarFabricaUseCase: EliminarFabricaUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar una nueva fábrica de carga' })
  @ApiResponse({ status: 201, description: 'Fábrica creada correctamente', type: FabricaRespuestaDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 409, description: 'Nombre de fábrica duplicado' })
  @UsePipes(new ZodValidationPipe(CrearFabricaSchema))
  async crear(@Body() dto: CrearFabricaDto): Promise<FabricaRespuestaDto> {
    return this.crearFabricaUseCase.ejecutar(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar y filtrar fábricas de la flota' })
  @ApiQuery({ name: 'nombre', required: false, description: 'Filtrar por nombre (coincidencia parcial)' })
  @ApiResponse({ status: 200, description: 'Listado de fábricas devuelto con éxito', type: [FabricaRespuestaDto] })
  async listar(@Query('nombre') nombre?: string): Promise<FabricaRespuestaDto[]> {
    return this.listarFabricasUseCase.ejecutar(nombre);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener los detalles de una fábrica por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la fábrica', type: Number })
  @ApiResponse({ status: 200, description: 'Detalles de la fábrica encontrados', type: FabricaRespuestaDto })
  @ApiResponse({ status: 404, description: 'Fábrica no encontrada' })
  async obtenerPorId(@Param('id') id: string): Promise<FabricaRespuestaDto> {
    return this.obtenerFabricaUseCase.ejecutar(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar los datos de una fábrica' })
  @ApiParam({ name: 'id', description: 'ID de la fábrica', type: Number })
  @ApiResponse({ status: 200, description: 'Fábrica actualizada correctamente', type: FabricaRespuestaDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 404, description: 'Fábrica no encontrada' })
  @ApiResponse({ status: 409, description: 'Nombre duplicado por otro fábrica' })
  @UsePipes(new ZodValidationPipe(ActualizarFabricaSchema))
  async actualizar(@Param('id') id: string, @Body() dto: ActualizarFabricaDto): Promise<FabricaRespuestaDto> {
    return this.actualizarFabricaUseCase.ejecutar(Number(id), dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una fábrica del sistema' })
  @ApiParam({ name: 'id', description: 'ID de la fábrica', type: Number })
  @ApiResponse({ status: 204, description: 'Fábrica eliminada' })
  @ApiResponse({ status: 404, description: 'Fábrica no encontrada' })
  async eliminar(@Param('id') id: string): Promise<void> {
    await this.eliminarFabricaUseCase.ejecutar(Number(id));
  }
}
