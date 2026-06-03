import type { ClienteRepository } from '../dominio/cliente.repository';
import { Cliente } from '../dominio/cliente';
export declare class ObtenerClienteUseCase {
    private readonly clienteRepository;
    constructor(clienteRepository: ClienteRepository);
    ejecutar(id: number): Promise<Cliente>;
}
