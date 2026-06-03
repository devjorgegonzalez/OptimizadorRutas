import { Inject, Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CLIENTE_REPOSITORY } from '../dominio/cliente.repository';
import type { ClienteRepository } from '../dominio/cliente.repository';
import { Cliente } from '../dominio/cliente';

@Injectable()
export class ActualizarClienteUseCase {
  constructor(
    @Inject(CLIENTE_REPOSITORY)
    private readonly clienteRepository: ClienteRepository,
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
  ): Promise<Cliente> {
    const cliente = await this.clienteRepository.obtenerPorId(id);
    if (!cliente) {
      throw new NotFoundException(`No existe el cliente con ID: ${id}`);
    }

    if (datos.nombre) {
      const nombreLimpio = datos.nombre.trim();
      if (nombreLimpio !== cliente.nombre) {
        const clienteExistente = await this.clienteRepository.obtenerPorNombre(nombreLimpio);
        if (clienteExistente) {
          throw new ConflictException(`Ya existe otro cliente registrado con el nombre: ${nombreLimpio}`);
        }
        datos.nombre = nombreLimpio;
      }
    }

    return this.clienteRepository.actualizar(id, datos);
  }
}
