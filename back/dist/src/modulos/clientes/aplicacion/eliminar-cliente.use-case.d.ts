import type { ClienteRepository } from '../dominio/cliente.repository';
export declare class EliminarClienteUseCase {
    private readonly clienteRepository;
    constructor(clienteRepository: ClienteRepository);
    ejecutar(id: number): Promise<void>;
}
