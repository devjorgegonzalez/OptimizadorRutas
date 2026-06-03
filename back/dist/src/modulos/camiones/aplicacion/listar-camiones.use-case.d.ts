import type { CamionRepository } from '../dominio/camion.repository';
import { Camion } from '../dominio/camion';
export declare class ListarCamionesUseCase {
    private readonly camionRepository;
    constructor(camionRepository: CamionRepository);
    ejecutar(filtroPlaca?: string): Promise<Camion[]>;
}
