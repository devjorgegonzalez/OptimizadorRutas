import type { RutaCamionRepository } from '../dominio/ruta.repository';
export declare class EliminarRutaCamionUseCase {
    private readonly repository;
    constructor(repository: RutaCamionRepository);
    ejecutar(camionId: number): Promise<void>;
}
