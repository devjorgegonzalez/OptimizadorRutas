import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CAMION_REPOSITORY } from '../dominio/camion.repository';
import type { CamionRepository } from '../dominio/camion.repository';

@Injectable()
export class EliminarCamionUseCase {
  constructor(
    @Inject(CAMION_REPOSITORY)
    private readonly camionRepository: CamionRepository,
  ) {}

  async ejecutar(id: number): Promise<void> {
    const camion = await this.camionRepository.obtenerPorId(id);
    if (!camion) {
      throw new NotFoundException(`No existe el camión con ID: ${id}`);
    }
    await this.camionRepository.eliminar(id);
  }
}
