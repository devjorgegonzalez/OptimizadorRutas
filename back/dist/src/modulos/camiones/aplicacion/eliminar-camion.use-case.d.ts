import type { CamionRepository } from '../dominio/camion.repository';
export declare class EliminarCamionUseCase {
    private readonly camionRepository;
    constructor(camionRepository: CamionRepository);
    ejecutar(id: number): Promise<void>;
}
