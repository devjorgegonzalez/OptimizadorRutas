import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FABRICA_REPOSITORY } from '../dominio/fabrica.repository';
import type { FabricaRepository } from '../dominio/fabrica.repository';

@Injectable()
export class EliminarFabricaUseCase {
  constructor(
    @Inject(FABRICA_REPOSITORY)
    private readonly fabricaRepository: FabricaRepository,
  ) {}

  async ejecutar(id: number): Promise<void> {
    const fabrica = await this.fabricaRepository.obtenerPorId(id);
    if (!fabrica) {
      throw new NotFoundException(`No existe la fábrica con ID: ${id}`);
    }
    await this.fabricaRepository.eliminar(id);
  }
}
