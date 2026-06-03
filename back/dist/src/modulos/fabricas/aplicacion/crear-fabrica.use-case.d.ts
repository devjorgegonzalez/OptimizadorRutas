import type { FabricaRepository } from '../dominio/fabrica.repository';
import { Fabrica } from '../dominio/fabrica';
export declare class CrearFabricaUseCase {
    private readonly fabricaRepository;
    constructor(fabricaRepository: FabricaRepository);
    ejecutar(datos: {
        nombre: string;
        latitud: number;
        longitud: number;
        activo: boolean;
        descripcion?: string | null;
        direccion?: string | null;
    }): Promise<Fabrica>;
}
