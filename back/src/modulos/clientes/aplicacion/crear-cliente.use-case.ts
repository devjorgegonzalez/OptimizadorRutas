import { Inject, Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { CLIENTE_REPOSITORY } from '../dominio/cliente.repository';
import type { ClienteRepository } from '../dominio/cliente.repository';
import { Cliente } from '../dominio/cliente';

@Injectable()
export class CrearClienteUseCase {
  constructor(
    @Inject(CLIENTE_REPOSITORY)
    private readonly clienteRepository: ClienteRepository,
  ) {}

  async ejecutar(datos: {
    nombre: string;
    latitud: number;
    longitud: number;
    activo: boolean;
    descripcion?: string | null;
    direccion?: string | null;
  }): Promise<Cliente> {
    if (!datos.nombre || datos.nombre.trim() === '') {
      throw new BadRequestException('El nombre del cliente es obligatorio.');
    }

    const clienteExistente = await this.clienteRepository.obtenerPorNombre(datos.nombre);
    if (clienteExistente) {
      throw new ConflictException(`Ya existe un cliente registrado con el nombre: ${datos.nombre}`);
    }

    return this.clienteRepository.crear({
      nombre: datos.nombre.trim(),
      latitud: datos.latitud,
      longitud: datos.longitud,
      activo: datos.activo,
      descripcion: datos.descripcion || null,
      direccion: datos.direccion || null,
    });
  }
}
