import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CLIENTE_REPOSITORY } from '../dominio/cliente.repository';
import type { ClienteRepository } from '../dominio/cliente.repository';

@Injectable()
export class EliminarClienteUseCase {
  constructor(
    @Inject(CLIENTE_REPOSITORY)
    private readonly clienteRepository: ClienteRepository,
  ) {}

  async ejecutar(id: number): Promise<void> {
    const cliente = await this.clienteRepository.obtenerPorId(id);
    if (!cliente) {
      throw new NotFoundException(`No existe el cliente con ID: ${id}`);
    }
    await this.clienteRepository.eliminar(id);
  }
}
