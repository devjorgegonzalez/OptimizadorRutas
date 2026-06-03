import { Cliente } from './cliente';
export interface ClienteRepository {
    crear(cliente: Omit<Cliente, 'id' | 'creadoEn' | 'actualizadoEn'>): Promise<Cliente>;
    actualizar(id: number, cliente: Partial<Omit<Cliente, 'id' | 'creadoEn' | 'actualizadoEn'>>): Promise<Cliente>;
    obtenerPorId(id: number): Promise<Cliente | null>;
    obtenerPorNombre(nombre: string): Promise<Cliente | null>;
    listar(filtroNombre?: string): Promise<Cliente[]>;
    eliminar(id: number): Promise<void>;
}
export declare const CLIENTE_REPOSITORY = "ClienteRepository";
