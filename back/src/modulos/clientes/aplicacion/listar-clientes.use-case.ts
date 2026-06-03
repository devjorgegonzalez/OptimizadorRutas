import { Inject, Injectable } from '@nestjs/common';
import { CLIENTE_REPOSITORY } from '../dominio/cliente.repository';
import type { ClienteRepository } from '../dominio/cliente.repository';
import { Cliente } from '../dominio/cliente';

@Injectable()
export class ListarClientesUseCase {
  constructor(
    @Inject(CLIENTE_REPOSITORY)
    private readonly clienteRepository: ClienteRepository,
  ) {}

  async ejecutar(filtroNombre?: string): Promise<Cliente[]> {
    return this.clienteRepository.listar(filtroNombre);
  }
}
