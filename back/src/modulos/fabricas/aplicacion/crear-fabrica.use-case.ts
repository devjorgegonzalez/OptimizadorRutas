import { Inject, Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { FABRICA_REPOSITORY } from '../dominio/fabrica.repository';
import type { FabricaRepository } from '../dominio/fabrica.repository';
import { Fabrica } from '../dominio/fabrica';

@Injectable()
export class CrearFabricaUseCase {
  constructor(
    @Inject(FABRICA_REPOSITORY)
    private readonly fabricaRepository: FabricaRepository,
  ) {}

  async ejecutar(datos: {
    nombre: string;
    latitud: number;
    longitud: number;
    activo: boolean;
    descripcion?: string | null;
    direccion?: string | null;
  }): Promise<Fabrica> {
    if (!datos.nombre || datos.nombre.trim() === '') {
      throw new BadRequestException('El nombre de la fábrica es obligatorio.');
    }

    const existente = await this.fabricaRepository.obtenerPorNombre(datos.nombre);
    if (existente) {
      throw new ConflictException(`Ya existe una fábrica registrada con el nombre: ${datos.nombre}`);
    }

    return this.fabricaRepository.crear({
      nombre: datos.nombre.trim(),
      latitud: datos.latitud,
      longitud: datos.longitud,
      activo: datos.activo,
      descripcion: datos.descripcion || null,
      direccion: datos.direccion || null,
    });
  }
}
