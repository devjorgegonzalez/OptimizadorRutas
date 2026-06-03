import { Inject, Injectable } from '@nestjs/common';
import { CAMION_REPOSITORY } from '../dominio/camion.repository';
import type { CamionRepository } from '../dominio/camion.repository';
import { Camion } from '../dominio/camion';

@Injectable()
export class ListarCamionesUseCase {
  constructor(
    @Inject(CAMION_REPOSITORY)
    private readonly camionRepository: CamionRepository,
  ) {}

  async ejecutar(filtroPlaca?: string): Promise<Camion[]> {
    return this.camionRepository.listar(filtroPlaca);
  }
}
