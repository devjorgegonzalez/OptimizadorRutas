import type { RutaCamionRepository } from '../dominio/ruta.repository';
import { RutaCamion } from '../dominio/ruta';
export declare class ObtenerRutaCamionUseCase {
    private readonly repository;
    constructor(repository: RutaCamionRepository);
    ejecutar(camionId: number): Promise<RutaCamion | null>;
}
