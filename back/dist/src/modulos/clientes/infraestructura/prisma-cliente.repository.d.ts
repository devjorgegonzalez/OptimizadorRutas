import { ClienteRepository } from '../dominio/cliente.repository';
import { Cliente } from '../dominio/cliente';
import { PrismaService } from '../../../prisma/prisma.service';
export declare class PrismaClienteRepository implements ClienteRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    crear(cliente: Omit<Cliente, 'id' | 'creadoEn' | 'actualizadoEn'>): Promise<Cliente>;
    actualizar(id: number, cliente: Partial<Omit<Cliente, 'id' | 'creadoEn' | 'actualizadoEn'>>): Promise<Cliente>;
    obtenerPorId(id: number): Promise<Cliente | null>;
    obtenerPorNombre(nombre: string): Promise<Cliente | null>;
    listar(filtroNombre?: string): Promise<Cliente[]>;
    eliminar(id: number): Promise<void>;
}
