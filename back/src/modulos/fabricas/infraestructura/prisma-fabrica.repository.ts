import { Injectable } from '@nestjs/common';
import { FabricaRepository } from '../dominio/fabrica.repository';
import { Fabrica } from '../dominio/fabrica';
import { PrismaService } from '../../../prisma/prisma.service';
import { PrismaFabricaMapper } from './prisma-fabrica.mapper';

@Injectable()
export class PrismaFabricaRepository implements FabricaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async crear(fabrica: Omit<Fabrica, 'id' | 'creadoEn' | 'actualizadoEn'>): Promise<Fabrica> {
    const nuevo = await this.prisma.fabrica.create({
      data: {
        nombre: fabrica.nombre,
        latitud: fabrica.latitud,
        longitud: fabrica.longitud,
        activo: fabrica.activo,
        descripcion: fabrica.descripcion,
        direccion: fabrica.direccion,
      },
    });
    return PrismaFabricaMapper.toDomain(nuevo);
  }

  async actualizar(id: number, fabrica: Partial<Omit<Fabrica, 'id' | 'creadoEn' | 'actualizadoEn'>>): Promise<Fabrica> {
    const data: any = {};
    if (fabrica.nombre !== undefined) data.nombre = fabrica.nombre;
    if (fabrica.latitud !== undefined) data.latitud = fabrica.latitud;
    if (fabrica.longitud !== undefined) data.longitud = fabrica.longitud;
    if (fabrica.activo !== undefined) data.activo = fabrica.activo;
    if (fabrica.descripcion !== undefined) data.descripcion = fabrica.descripcion;
    if (fabrica.direccion !== undefined) data.direccion = fabrica.direccion;

    const actualizado = await this.prisma.fabrica.update({
      where: { id },
      data,
    });
    return PrismaFabricaMapper.toDomain(actualizado);
  }

  async obtenerPorId(id: number): Promise<Fabrica | null> {
    const fabrica = await this.prisma.fabrica.findUnique({
      where: { id },
    });
    return fabrica ? PrismaFabricaMapper.toDomain(fabrica) : null;
  }

  async obtenerPorNombre(nombre: string): Promise<Fabrica | null> {
    const fabrica = await this.prisma.fabrica.findUnique({
      where: { nombre },
    });
    return fabrica ? PrismaFabricaMapper.toDomain(fabrica) : null;
  }

  async listar(filtroNombre?: string): Promise<Fabrica[]> {
    const fabricas = await this.prisma.fabrica.findMany({
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
    return fabricas.map(PrismaFabricaMapper.toDomain);
  }

  async eliminar(id: number): Promise<void> {
    await this.prisma.fabrica.delete({
      where: { id },
    });
  }
}
