import { Camion as CamionDominio } from '../dominio/camion';
import { Camion as CamionPrisma } from '@prisma/client';
export declare class PrismaCamionMapper {
    static toDomain(prismaCamion: CamionPrisma): CamionDominio;
}
