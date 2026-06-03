import { Fabrica as FabricaDominio } from '../dominio/fabrica';
import { Fabrica as FabricaPrisma } from '@prisma/client';

export class PrismaFabricaMapper {
  static toDomain(prismaFabrica: FabricaPrisma): FabricaDominio {
    return new FabricaDominio(
      prismaFabrica.id,
      prismaFabrica.nombre,
      prismaFabrica.latitud,
      prismaFabrica.longitud,
      prismaFabrica.activo,
      prismaFabrica.creadoEn,
      prismaFabrica.actualizadoEn,
      prismaFabrica.descripcion,
      prismaFabrica.direccion,
    );
  }
}
