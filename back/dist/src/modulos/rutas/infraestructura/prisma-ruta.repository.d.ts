import { RutaCamionRepository } from '../dominio/ruta.repository';
import { RutaCamion, PuntoRuta } from '../dominio/ruta';
import { PrismaService } from '../../../prisma/prisma.service';
export declare class PrismaRutaCamionRepository implements RutaCamionRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    guardar(camionId: number, puntos: Omit<PuntoRuta, 'id' | 'rutaCamionId' | 'creadoEn' | 'actualizadoEn'>[]): Promise<RutaCamion>;
    obtenerPorCamionId(camionId: number): Promise<RutaCamion | null>;
    eliminar(camionId: number): Promise<void>;
    listarTodas(): Promise<RutaCamion[]>;
}
