import type { FabricaRepository } from '../dominio/fabrica.repository';
import { Fabrica } from '../dominio/fabrica';
export declare class ActualizarFabricaUseCase {
    private readonly fabricaRepository;
    constructor(fabricaRepository: FabricaRepository);
    ejecutar(id: number, datos: {
        nombre?: string;
        latitud?: number;
        longitud?: number;
        activo?: boolean;
        descripcion?: string | null;
        direccion?: string | null;
    }): Promise<Fabrica>;
}
