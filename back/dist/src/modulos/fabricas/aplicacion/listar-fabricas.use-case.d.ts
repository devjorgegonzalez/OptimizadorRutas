import type { FabricaRepository } from '../dominio/fabrica.repository';
import { Fabrica } from '../dominio/fabrica';
export declare class ListarFabricasUseCase {
    private readonly fabricaRepository;
    constructor(fabricaRepository: FabricaRepository);
    ejecutar(filtroNombre?: string): Promise<Fabrica[]>;
}
