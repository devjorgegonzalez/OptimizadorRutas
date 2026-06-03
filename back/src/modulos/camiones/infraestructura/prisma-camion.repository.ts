import { Injectable } from '@nestjs/common';
import { CamionRepository } from '../dominio/camion.repository';
import { Camion } from '../dominio/camion';
import { PrismaService } from '../../../prisma/prisma.service';
import { PrismaCamionMapper } from './prisma-camion.mapper';

@Injectable()
export class PrismaCamionRepository implements CamionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async crear(camion: Omit<Camion, 'id' | 'creadoEn' | 'actualizadoEn'>): Promise<Camion> {
    const nuevoCamion = await this.prisma.camion.create({
      data: {
        placa: camion.placa,
        capacidad: camion.capacidad,
        latitudOrigen: camion.puntoOrigen.latitud,
        longitudOrigen: camion.puntoOrigen.longitud,
        latitudUltima: camion.ultimaUbicacion.latitud,
        longitudUltima: camion.ultimaUbicacion.longitud,
      },
    });
    return PrismaCamionMapper.toDomain(nuevoCamion);
  }

  async actualizar(id: number, camion: Partial<Omit<Camion, 'id' | 'creadoEn' | 'actualizadoEn'>>): Promise<Camion> {
    const data: any = {};
    if (camion.placa !== undefined) data.placa = camion.placa;
    if (camion.capacidad !== undefined) data.capacidad = camion.capacidad;
    if (camion.puntoOrigen !== undefined) {
      data.latitudOrigen = camion.puntoOrigen.latitud;
      data.longitudOrigen = camion.puntoOrigen.longitud;
    }
    if (camion.ultimaUbicacion !== undefined) {
      data.latitudUltima = camion.ultimaUbicacion.latitud;
      data.longitudUltima = camion.ultimaUbicacion.longitud;
    }

    const camionActualizado = await this.prisma.camion.update({
      where: { id },
      data,
    });
    return PrismaCamionMapper.toDomain(camionActualizado);
  }

  async obtenerPorId(id: number): Promise<Camion | null> {
    const camion = await this.prisma.camion.findUnique({
      where: { id },
    });
    return camion ? PrismaCamionMapper.toDomain(camion) : null;
  }

  async obtenerPorPlaca(placa: string): Promise<Camion | null> {
    const camion = await this.prisma.camion.findUnique({
      where: { placa },
    });
    return camion ? PrismaCamionMapper.toDomain(camion) : null;
  }

  async listar(filtroPlaca?: string): Promise<Camion[]> {
    const camiones = await this.prisma.camion.findMany({
      where: filtroPlaca
        ? {
            placa: {
              contains: filtroPlaca,
              mode: 'insensitive',
            },
          }
        : {},
      orderBy: { creadoEn: 'desc' },
    });
    return camiones.map(PrismaCamionMapper.toDomain);
  }

  async eliminar(id: number): Promise<void> {
    await this.prisma.camion.delete({
      where: { id },
    });
  }
}
