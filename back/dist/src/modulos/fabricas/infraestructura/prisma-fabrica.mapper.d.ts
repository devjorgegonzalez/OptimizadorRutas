import { Fabrica as FabricaDominio } from '../dominio/fabrica';
import { Fabrica as FabricaPrisma } from '@prisma/client';
export declare class PrismaFabricaMapper {
    static toDomain(prismaFabrica: FabricaPrisma): FabricaDominio;
}
