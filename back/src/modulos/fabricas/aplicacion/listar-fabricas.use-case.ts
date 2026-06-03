import { Inject, Injectable } from '@nestjs/common';
import { FABRICA_REPOSITORY } from '../dominio/fabrica.repository';
import type { FabricaRepository } from '../dominio/fabrica.repository';
import { Fabrica } from '../dominio/fabrica';

@Injectable()
export class ListarFabricasUseCase {
  constructor(
    @Inject(FABRICA_REPOSITORY)
    private readonly fabricaRepository: FabricaRepository,
  ) {}

  async ejecutar(filtroNombre?: string): Promise<Fabrica[]> {
    return this.fabricaRepository.listar(filtroNombre);
  }
}
