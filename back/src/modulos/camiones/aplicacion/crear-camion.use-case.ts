import { Inject, Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { CAMION_REPOSITORY } from '../dominio/camion.repository';
import type { CamionRepository } from '../dominio/camion.repository';
import { Camion, UbicacionCamion } from '../dominio/camion';

@Injectable()
export class CrearCamionUseCase {
  constructor(
    @Inject(CAMION_REPOSITORY)
    private readonly camionRepository: CamionRepository,
  ) {}

  async ejecutar(datos: {
    placa: string;
    capacidad: number;
    puntoOrigen: UbicacionCamion;
    ultimaUbicacion: UbicacionCamion;
  }): Promise<Camion> {
    if (!datos.placa || datos.placa.trim() === '') {
      throw new BadRequestException('La placa es obligatoria.');
    }

    if (datos.capacidad <= 0) {
      throw new BadRequestException('La capacidad debe ser mayor a cero.');
    }

    const camionExistente = await this.camionRepository.obtenerPorPlaca(datos.placa);
    if (camionExistente) {
      throw new ConflictException(`Ya existe un camión registrado con la placa: ${datos.placa}`);
    }

    return this.camionRepository.crear({
      placa: datos.placa.trim().toUpperCase(),
      capacidad: datos.capacidad,
      puntoOrigen: datos.puntoOrigen,
      ultimaUbicacion: datos.ultimaUbicacion,
    });
  }
}
