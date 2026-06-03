import type { ClienteRepository } from '../dominio/cliente.repository';
import { Cliente } from '../dominio/cliente';
export declare class ActualizarClienteUseCase {
    private readonly clienteRepository;
    constructor(clienteRepository: ClienteRepository);
    ejecutar(id: number, datos: {
        nombre?: string;
        latitud?: number;
        longitud?: number;
        activo?: boolean;
        descripcion?: string | null;
        direccion?: string | null;
    }): Promise<Cliente>;
}
