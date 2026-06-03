import { FabricaRepository } from '../dominio/fabrica.repository';
import { Fabrica } from '../dominio/fabrica';
import { PrismaService } from '../../../prisma/prisma.service';
export declare class PrismaFabricaRepository implements FabricaRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    crear(fabrica: Omit<Fabrica, 'id' | 'creadoEn' | 'actualizadoEn'>): Promise<Fabrica>;
    actualizar(id: number, fabrica: Partial<Omit<Fabrica, 'id' | 'creadoEn' | 'actualizadoEn'>>): Promise<Fabrica>;
    obtenerPorId(id: number): Promise<Fabrica | null>;
    obtenerPorNombre(nombre: string): Promise<Fabrica | null>;
    listar(filtroNombre?: string): Promise<Fabrica[]>;
    eliminar(id: number): Promise<void>;
}
