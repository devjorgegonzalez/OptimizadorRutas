import { Inject, Injectable } from '@nestjs/common';
import { RUTA_CAMION_REPOSITORY } from '../dominio/ruta.repository';
import type { RutaCamionRepository } from '../dominio/ruta.repository';
import { RutaCamion } from '../dominio/ruta';

@Injectable()
export class ObtenerRutaCamionUseCase {
  constructor(
    @Inject(RUTA_CAMION_REPOSITORY)
    private readonly repository: RutaCamionRepository,
  ) {}

  async ejecutar(camionId: number): Promise<RutaCamion | null> {
    return this.repository.obtenerPorCamionId(camionId);
  }
}
