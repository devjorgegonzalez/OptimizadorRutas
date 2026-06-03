import { Inject, Injectable } from '@nestjs/common';
import { RUTA_CAMION_REPOSITORY } from '../dominio/ruta.repository';
import type { RutaCamionRepository } from '../dominio/ruta.repository';

@Injectable()
export class EliminarRutaCamionUseCase {
  constructor(
    @Inject(RUTA_CAMION_REPOSITORY)
    private readonly repository: RutaCamionRepository,
  ) {}

  async ejecutar(camionId: number): Promise<void> {
    await this.repository.eliminar(camionId);
  }
}
