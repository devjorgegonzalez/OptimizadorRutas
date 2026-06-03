import { Module } from '@nestjs/common';
import { RUTA_CAMION_REPOSITORY } from '../dominio/ruta.repository';
import { PrismaRutaCamionRepository } from './prisma-ruta.repository';
import { ObtenerRutaCamionUseCase } from '../aplicacion/obtener-ruta.use-case';
import { EliminarRutaCamionUseCase } from '../aplicacion/eliminar-ruta.use-case';
import { GenerarRutasUseCase } from '../aplicacion/generar-rutas.use-case';
import { RutasController } from '../interfaz/rutas.controller';
import { CamionesModule } from '../../camiones/infraestructura/camiones.module';
import { ClientesModule } from '../../clientes/infraestructura/clientes.module';
import { FabricasModule } from '../../fabricas/infraestructura/fabricas.module';

@Module({
  imports: [
    CamionesModule,
    ClientesModule,
    FabricasModule,
  ],
  controllers: [RutasController],
  providers: [
    {
      provide: RUTA_CAMION_REPOSITORY,
      useClass: PrismaRutaCamionRepository,
    },
    ObtenerRutaCamionUseCase,
    EliminarRutaCamionUseCase,
    GenerarRutasUseCase,
  ],
  exports: [
    ObtenerRutaCamionUseCase,
    EliminarRutaCamionUseCase,
    GenerarRutasUseCase,
  ],
})
export class RutasModule {}
