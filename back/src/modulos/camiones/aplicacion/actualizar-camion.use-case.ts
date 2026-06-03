import { Inject, Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CAMION_REPOSITORY } from '../dominio/camion.repository';
import type { CamionRepository } from '../dominio/camion.repository';
import { Camion, UbicacionCamion } from '../dominio/camion';

@Injectable()
export class ActualizarCamionUseCase {
  constructor(
    @Inject(CAMION_REPOSITORY)
    private readonly camionRepository: CamionRepository,
  ) {}

  async ejecutar(
    id: number,
    datos: {
      placa?: string;
      capacidad?: number;
      puntoOrigen?: UbicacionCamion;
      ultimaUbicacion?: UbicacionCamion;
    },
  ): Promise<Camion> {
    const camion = await this.camionRepository.obtenerPorId(id);
    if (!camion) {
      throw new NotFoundException(`No existe el camión con ID: ${id}`);
    }

    if (datos.capacidad !== undefined && datos.capacidad <= 0) {
      throw new BadRequestException('La capacidad debe ser mayor a cero.');
    }

    if (datos.placa) {
      const placaLimpia = datos.placa.trim().toUpperCase();
      if (placaLimpia !== camion.placa) {
        const camionExistente = await this.camionRepository.obtenerPorPlaca(placaLimpia);
        if (camionExistente) {
          throw new ConflictException(`Ya existe otro camión registrado con la placa: ${placaLimpia}`);
        }
        datos.placa = placaLimpia;
      }
    }

    return this.camionRepository.actualizar(id, datos);
  }
}
