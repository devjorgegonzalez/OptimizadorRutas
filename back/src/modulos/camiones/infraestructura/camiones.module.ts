import { Module } from '@nestjs/common';
import { CAMION_REPOSITORY } from '../dominio/camion.repository';
import { PrismaCamionRepository } from './prisma-camion.repository';
import { CrearCamionUseCase } from '../aplicacion/crear-camion.use-case';
import { ActualizarCamionUseCase } from '../aplicacion/actualizar-camion.use-case';
import { ListarCamionesUseCase } from '../aplicacion/listar-camiones.use-case';
import { ObtenerCamionUseCase } from '../aplicacion/obtener-camion.use-case';
import { EliminarCamionUseCase } from '../aplicacion/eliminar-camion.use-case';
import { CamionesController } from '../interfaz/camiones.controller';

@Module({
  controllers: [CamionesController],
  providers: [
    {
      provide: CAMION_REPOSITORY,
      useClass: PrismaCamionRepository,
    },
    CrearCamionUseCase,
    ActualizarCamionUseCase,
    ListarCamionesUseCase,
    ObtenerCamionUseCase,
    EliminarCamionUseCase,
  ],
  exports: [
    CrearCamionUseCase,
    ActualizarCamionUseCase,
    ListarCamionesUseCase,
    ObtenerCamionUseCase,
    EliminarCamionUseCase,
  ],
})
export class CamionesModule {}
