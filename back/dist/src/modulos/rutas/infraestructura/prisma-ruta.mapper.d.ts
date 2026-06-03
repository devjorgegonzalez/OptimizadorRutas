import { RutaCamion as PrismaRuta, PuntoRuta as PrismaPunto } from '@prisma/client';
import { RutaCamion } from '../dominio/ruta';
export declare class PrismaRutaCamionMapper {
    static toDomain(ruta: PrismaRuta & {
        puntos: PrismaPunto[];
    }): RutaCamion;
}
