import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CLIENTE_REPOSITORY } from '../dominio/cliente.repository';
import type { ClienteRepository } from '../dominio/cliente.repository';
import { Cliente } from '../dominio/cliente';

@Injectable()
export class ObtenerClienteUseCase {
  constructor(
    @Inject(CLIENTE_REPOSITORY)
    private readonly clienteRepository: ClienteRepository,
  ) {}

  async ejecutar(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.obtenerPorId(id);
    if (!cliente) {
      throw new NotFoundException(`No existe el cliente con ID: ${id}`);
    }
    return cliente;
  }
}
