import type { ClienteRepository } from '../dominio/cliente.repository';
import { Cliente } from '../dominio/cliente';
export declare class CrearClienteUseCase {
    private readonly clienteRepository;
    constructor(clienteRepository: ClienteRepository);
    ejecutar(datos: {
        nombre: string;
        latitud: number;
        longitud: number;
        activo: boolean;
        descripcion?: string | null;
        direccion?: string | null;
    }): Promise<Cliente>;
}
