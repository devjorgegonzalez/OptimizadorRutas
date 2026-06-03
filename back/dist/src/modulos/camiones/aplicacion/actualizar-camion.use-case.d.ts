import type { CamionRepository } from '../dominio/camion.repository';
import { Camion, UbicacionCamion } from '../dominio/camion';
export declare class ActualizarCamionUseCase {
    private readonly camionRepository;
    constructor(camionRepository: CamionRepository);
    ejecutar(id: number, datos: {
        placa?: string;
        capacidad?: number;
        puntoOrigen?: UbicacionCamion;
        ultimaUbicacion?: UbicacionCamion;
    }): Promise<Camion>;
}
