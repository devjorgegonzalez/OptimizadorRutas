import type { FabricaRepository } from '../dominio/fabrica.repository';
export declare class EliminarFabricaUseCase {
    private readonly fabricaRepository;
    constructor(fabricaRepository: FabricaRepository);
    ejecutar(id: number): Promise<void>;
}
