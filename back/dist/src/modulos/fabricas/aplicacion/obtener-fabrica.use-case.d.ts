import type { FabricaRepository } from '../dominio/fabrica.repository';
import { Fabrica } from '../dominio/fabrica';
export declare class ObtenerFabricaUseCase {
    private readonly fabricaRepository;
    constructor(fabricaRepository: FabricaRepository);
    ejecutar(id: number): Promise<Fabrica>;
}
