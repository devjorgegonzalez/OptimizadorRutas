import { Module } from '@nestjs/common';
import { CLIENTE_REPOSITORY } from '../dominio/cliente.repository';
import { PrismaClienteRepository } from './prisma-cliente.repository';
import { CrearClienteUseCase } from '../aplicacion/crear-cliente.use-case';
import { ActualizarClienteUseCase } from '../aplicacion/actualizar-cliente.use-case';
import { ListarClientesUseCase } from '../aplicacion/listar-clientes.use-case';
import { ObtenerClienteUseCase } from '../aplicacion/obtener-cliente.use-case';
import { EliminarClienteUseCase } from '../aplicacion/eliminar-cliente.use-case';
import { ClientesController } from '../interfaz/clientes.controller';

@Module({
  controllers: [ClientesController],
  providers: [
    {
      provide: CLIENTE_REPOSITORY,
      useClass: PrismaClienteRepository,
    },
    CrearClienteUseCase,
    ActualizarClienteUseCase,
    ListarClientesUseCase,
    ObtenerClienteUseCase,
    EliminarClienteUseCase,
  ],
  exports: [
    CrearClienteUseCase,
    ActualizarClienteUseCase,
    ListarClientesUseCase,
    ObtenerClienteUseCase,
    EliminarClienteUseCase,
  ],
})
export class ClientesModule {}
