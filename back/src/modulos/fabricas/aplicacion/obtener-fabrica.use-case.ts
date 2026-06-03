import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FABRICA_REPOSITORY } from '../dominio/fabrica.repository';
import type { FabricaRepository } from '../dominio/fabrica.repository';
import { Fabrica } from '../dominio/fabrica';

@Injectable()
export class ObtenerFabricaUseCase {
  constructor(
    @Inject(FABRICA_REPOSITORY)
    private readonly fabricaRepository: FabricaRepository,
  ) {}

  async ejecutar(id: number): Promise<Fabrica> {
    const fabrica = await this.fabricaRepository.obtenerPorId(id);
    if (!fabrica) {
      throw new NotFoundException(`No existe la fábrica con ID: ${id}`);
    }
    return fabrica;
  }
}
