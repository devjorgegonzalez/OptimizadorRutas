import { CamionRepository } from '../dominio/camion.repository';
import { Camion } from '../dominio/camion';
import { PrismaService } from '../../../prisma/prisma.service';
export declare class PrismaCamionRepository implements CamionRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    crear(camion: Omit<Camion, 'id' | 'creadoEn' | 'actualizadoEn'>): Promise<Camion>;
    actualizar(id: number, camion: Partial<Omit<Camion, 'id' | 'creadoEn' | 'actualizadoEn'>>): Promise<Camion>;
    obtenerPorId(id: number): Promise<Camion | null>;
    obtenerPorPlaca(placa: string): Promise<Camion | null>;
    listar(filtroPlaca?: string): Promise<Camion[]>;
    eliminar(id: number): Promise<void>;
}
