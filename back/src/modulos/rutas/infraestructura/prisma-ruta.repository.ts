import { Injectable } from '@nestjs/common';
import { RutaCamionRepository } from '../dominio/ruta.repository';
import { RutaCamion, PuntoRuta } from '../dominio/ruta';
import { PrismaService } from '../../../prisma/prisma.service';
import { PrismaRutaCamionMapper } from './prisma-ruta.mapper';

@Injectable()
export class PrismaRutaCamionRepository implements RutaCamionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async guardar(
    camionId: number,
    puntos: Omit<PuntoRuta, 'id' | 'rutaCamionId' | 'creadoEn' | 'actualizadoEn'>[],
  ): Promise<RutaCamion> {
    const nuevaRuta = await this.prisma.$transaction(async tx => {
      // 1. Eliminar cualquier ruta existente para este camión
      await tx.rutaCamion.deleteMany({
        where: { camionId },
      });

      // 2. Crear la nueva ruta y sus puntos asociados
      const creada = await tx.rutaCamion.create({
        data: {
          camionId,
          puntos: {
            create: puntos.map(p => ({
              orden: p.orden,
              tipoPunto: p.tipoPunto,
              latitud: p.latitud,
              longitud: p.longitud,
              descripcion: p.descripcion,
            })),
          },
        },
        include: {
          puntos: true,
        },
      });

      return creada;
    });

    return PrismaRutaCamionMapper.toDomain(nuevaRuta);
  }

  async obtenerPorCamionId(camionId: number): Promise<RutaCamion | null> {
    const ruta = await this.prisma.rutaCamion.findUnique({
      where: { camionId },
      include: {
        puntos: true,
      },
    });

    if (!ruta) return null;
    return PrismaRutaCamionMapper.toDomain(ruta);
  }

  async eliminar(camionId: number): Promise<void> {
    await this.prisma.rutaCamion.deleteMany({
      where: { camionId },
    });
  }

  async listarTodas(): Promise<RutaCamion[]> {
    const rutas = await this.prisma.rutaCamion.findMany({
      include: {
        puntos: true,
      },
    });
    return rutas.map(PrismaRutaCamionMapper.toDomain);
  }
}
