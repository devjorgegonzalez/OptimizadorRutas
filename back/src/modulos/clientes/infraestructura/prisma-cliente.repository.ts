import { Injectable } from '@nestjs/common';
import { ClienteRepository } from '../dominio/cliente.repository';
import { Cliente } from '../dominio/cliente';
import { PrismaService } from '../../../prisma/prisma.service';
import { PrismaClienteMapper } from './prisma-cliente.mapper';

@Injectable()
export class PrismaClienteRepository implements ClienteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async crear(cliente: Omit<Cliente, 'id' | 'creadoEn' | 'actualizadoEn'>): Promise<Cliente> {
    const nuevo = await this.prisma.cliente.create({
      data: {
        nombre: cliente.nombre,
        latitud: cliente.latitud,
        longitud: cliente.longitud,
        activo: cliente.activo,
        descripcion: cliente.descripcion,
        direccion: cliente.direccion,
      },
    });
    return PrismaClienteMapper.toDomain(nuevo);
  }

  async actualizar(id: number, cliente: Partial<Omit<Cliente, 'id' | 'creadoEn' | 'actualizadoEn'>>): Promise<Cliente> {
    const data: any = {};
    if (cliente.nombre !== undefined) data.nombre = cliente.nombre;
    if (cliente.latitud !== undefined) data.latitud = cliente.latitud;
    if (cliente.longitud !== undefined) data.longitud = cliente.longitud;
    if (cliente.activo !== undefined) data.activo = cliente.activo;
    if (cliente.descripcion !== undefined) data.descripcion = cliente.descripcion;
    if (cliente.direccion !== undefined) data.direccion = cliente.direccion;

    const actualizado = await this.prisma.cliente.update({
      where: { id },
      data,
    });
    return PrismaClienteMapper.toDomain(actualizado);
  }

  async obtenerPorId(id: number): Promise<Cliente | null> {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id },
    });
    return cliente ? PrismaClienteMapper.toDomain(cliente) : null;
  }

  async obtenerPorNombre(nombre: string): Promise<Cliente | null> {
    const cliente = await this.prisma.cliente.findUnique({
      where: { nombre },
    });
    return cliente ? PrismaClienteMapper.toDomain(cliente) : null;
  }

  async listar(filtroNombre?: string): Promise<Cliente[]> {
    const clientes = await this.prisma.cliente.findMany({
      where: filtroNombre
        ? {
            nombre: {
              contains: filtroNombre,
              mode: 'insensitive',
            },
          }
        : {},
      orderBy: { creadoEn: 'desc' },
    });
    return clientes.map(PrismaClienteMapper.toDomain);
  }

  async eliminar(id: number): Promise<void> {
    await this.prisma.cliente.delete({
      where: { id },
    });
  }
}
