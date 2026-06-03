import { Module } from '@nestjs/common';
import { FABRICA_REPOSITORY } from '../dominio/fabrica.repository';
import { PrismaFabricaRepository } from './prisma-fabrica.repository';
import { CrearFabricaUseCase } from '../aplicacion/crear-fabrica.use-case';
import { ActualizarFabricaUseCase } from '../aplicacion/actualizar-fabrica.use-case';
import { ListarFabricasUseCase } from '../aplicacion/listar-fabricas.use-case';
import { ObtenerFabricaUseCase } from '../aplicacion/obtener-fabrica.use-case';
import { EliminarFabricaUseCase } from '../aplicacion/eliminar-fabrica.use-case';
import { FabricasController } from '../interfaz/fabricas.controller';

@Module({
  controllers: [FabricasController],
  providers: [
    {
      provide: FABRICA_REPOSITORY,
      useClass: PrismaFabricaRepository,
    },
    CrearFabricaUseCase,
    ActualizarFabricaUseCase,
    ListarFabricasUseCase,
    ObtenerFabricaUseCase,
    EliminarFabricaUseCase,
  ],
  exports: [
    CrearFabricaUseCase,
    ActualizarFabricaUseCase,
    ListarFabricasUseCase,
    ObtenerFabricaUseCase,
    EliminarFabricaUseCase,
  ],
})
export class FabricasModule {}
