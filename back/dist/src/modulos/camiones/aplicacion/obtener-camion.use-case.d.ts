import type { CamionRepository } from '../dominio/camion.repository';
import { Camion } from '../dominio/camion';
export declare class ObtenerCamionUseCase {
    private readonly camionRepository;
    constructor(camionRepository: CamionRepository);
    ejecutar(id: number): Promise<Camion>;
}
