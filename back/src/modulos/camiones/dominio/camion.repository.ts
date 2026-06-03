import { Camion } from './camion';

export interface CamionRepository {
  crear(camion: Omit<Camion, 'id' | 'creadoEn' | 'actualizadoEn'>): Promise<Camion>;
  actualizar(id: number, camion: Partial<Omit<Camion, 'id' | 'creadoEn' | 'actualizadoEn'>>): Promise<Camion>;
  obtenerPorId(id: number): Promise<Camion | null>;
  obtenerPorPlaca(placa: string): Promise<Camion | null>;
  listar(filtroPlaca?: string): Promise<Camion[]>;
  eliminar(id: number): Promise<void>;
}

// Token de inyección para usar con NestJS Dependency Injection
export const CAMION_REPOSITORY = 'CamionRepository';
