import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { CrearClienteUseCase } from '../aplicacion/crear-cliente.use-case';
import { ActualizarClienteUseCase } from '../aplicacion/actualizar-cliente.use-case';
import { ListarClientesUseCase } from '../aplicacion/listar-clientes.use-case';
import { ObtenerClienteUseCase } from '../aplicacion/obtener-cliente.use-case';
import { EliminarClienteUseCase } from '../aplicacion/eliminar-cliente.use-case';
import { CrearClienteDto, CrearClienteSchema } from './dto/crear-cliente.dto';
import { ActualizarClienteDto, ActualizarClienteSchema } from './dto/actualizar-cliente.dto';
import { ClienteRespuestaDto } from './dto/cliente-respuesta.dto';
import { ZodValidationPipe } from '../../../compartido/zod-validation.pipe';

@ApiTags('Clientes')
@Controller('clientes')
export class ClientesController {
  constructor(
    private readonly crearClienteUseCase: CrearClienteUseCase,
    private readonly actualizarClienteUseCase: ActualizarClienteUseCase,
    private readonly listarClientesUseCase: ListarClientesUseCase,
    private readonly obtenerClienteUseCase: ObtenerClienteUseCase,
    private readonly eliminarClienteUseCase: EliminarClienteUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar un nuevo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente creado correctamente', type: ClienteRespuestaDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 409, description: 'Nombre de cliente duplicado' })
  @UsePipes(new ZodValidationPipe(CrearClienteSchema))
  async crear(@Body() dto: CrearClienteDto): Promise<ClienteRespuestaDto> {
    return this.crearClienteUseCase.ejecutar(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar y filtrar clientes' })
  @ApiQuery({ name: 'nombre', required: false, description: 'Filtrar por nombre (coincidencia parcial)' })
  @ApiResponse({ status: 200, description: 'Listado de clientes devuelto con éxito', type: [ClienteRespuestaDto] })
  async listar(@Query('nombre') nombre?: string): Promise<ClienteRespuestaDto[]> {
    return this.listarClientesUseCase.ejecutar(nombre);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener los detalles de un cliente por su ID' })
  @ApiParam({ name: 'id', description: 'ID del cliente', type: Number })
  @ApiResponse({ status: 200, description: 'Detalles del cliente encontrados', type: ClienteRespuestaDto })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async obtenerPorId(@Param('id') id: string): Promise<ClienteRespuestaDto> {
    return this.obtenerClienteUseCase.ejecutar(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar los datos de un cliente' })
  @ApiParam({ name: 'id', description: 'ID del cliente', type: Number })
  @ApiResponse({ status: 200, description: 'Cliente actualizado correctamente', type: ClienteRespuestaDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  @ApiResponse({ status: 409, description: 'Nombre duplicado por otro cliente' })
  @UsePipes(new ZodValidationPipe(ActualizarClienteSchema))
  async actualizar(@Param('id') id: string, @Body() dto: ActualizarClienteDto): Promise<ClienteRespuestaDto> {
    return this.actualizarClienteUseCase.ejecutar(Number(id), dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un cliente del sistema' })
  @ApiParam({ name: 'id', description: 'ID del cliente', type: Number })
  @ApiResponse({ status: 204, description: 'Cliente eliminado' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async eliminar(@Param('id') id: string): Promise<void> {
    await this.eliminarClienteUseCase.ejecutar(Number(id));
  }
}
