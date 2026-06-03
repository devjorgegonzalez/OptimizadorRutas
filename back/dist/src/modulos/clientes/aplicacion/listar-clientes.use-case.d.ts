import type { ClienteRepository } from '../dominio/cliente.repository';
import { Cliente } from '../dominio/cliente';
export declare class ListarClientesUseCase {
    private readonly clienteRepository;
    constructor(clienteRepository: ClienteRepository);
    ejecutar(filtroNombre?: string): Promise<Cliente[]>;
}
