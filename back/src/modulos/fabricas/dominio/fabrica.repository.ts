import { Fabrica } from './fabrica';

export interface FabricaRepository {
  crear(fabrica: Omit<Fabrica, 'id' | 'creadoEn' | 'actualizadoEn'>): Promise<Fabrica>;
  actualizar(id: number, fabrica: Partial<Omit<Fabrica, 'id' | 'creadoEn' | 'actualizadoEn'>>): Promise<Fabrica>;
  obtenerPorId(id: number): Promise<Fabrica | null>;
  obtenerPorNombre(nombre: string): Promise<Fabrica | null>;
  listar(filtroNombre?: string): Promise<Fabrica[]>;
  eliminar(id: number): Promise<void>;
}

export const FABRICA_REPOSITORY = 'FabricaRepository';
