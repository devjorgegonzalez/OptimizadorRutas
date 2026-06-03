import { Inject, Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { FABRICA_REPOSITORY } from '../dominio/fabrica.repository';
import type { FabricaRepository } from '../dominio/fabrica.repository';
import { Fabrica } from '../dominio/fabrica';

@Injectable()
export class ActualizarFabricaUseCase {
  constructor(
    @Inject(FABRICA_REPOSITORY)
    private readonly fabricaRepository: FabricaRepository,
  ) {}

  async ejecutar(
    id: number,
    datos: {
      nombre?: string;
      latitud?: number;
      longitud?: number;
      activo?: boolean;
      descripcion?: string | null;
      direccion?: string | null;
    },
  ): Promise<Fabrica> {
    const fabrica = await this.fabricaRepository.obtenerPorId(id);
    if (!fabrica) {
      throw new NotFoundException(`No existe la fábrica con ID: ${id}`);
    }

    if (datos.nombre) {
      const nombreLimpio = datos.nombre.trim();
      if (nombreLimpio !== fabrica.nombre) {
        const existente = await this.fabricaRepository.obtenerPorNombre(nombreLimpio);
        if (existente) {
          throw new ConflictException(`Ya existe otra fábrica registrada con el nombre: ${nombreLimpio}`);
        }
        datos.nombre = nombreLimpio;
      }
    }

    return this.fabricaRepository.actualizar(id, datos);
  }
}
