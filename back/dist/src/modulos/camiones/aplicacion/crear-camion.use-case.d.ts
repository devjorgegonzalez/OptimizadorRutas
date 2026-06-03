import type { CamionRepository } from '../dominio/camion.repository';
import { Camion, UbicacionCamion } from '../dominio/camion';
export declare class CrearCamionUseCase {
    private readonly camionRepository;
    constructor(camionRepository: CamionRepository);
    ejecutar(datos: {
        placa: string;
        capacidad: number;
        puntoOrigen: UbicacionCamion;
        ultimaUbicacion: UbicacionCamion;
    }): Promise<Camion>;
}
