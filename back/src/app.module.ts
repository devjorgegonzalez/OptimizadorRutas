import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CamionesModule } from './modulos/camiones/infraestructura/camiones.module';
import { ClientesModule } from './modulos/clientes/infraestructura/clientes.module';
import { FabricasModule } from './modulos/fabricas/infraestructura/fabricas.module';
import { RutasModule } from './modulos/rutas/infraestructura/rutas.module';

@Module({
  imports: [PrismaModule, CamionesModule, ClientesModule, FabricasModule, RutasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
