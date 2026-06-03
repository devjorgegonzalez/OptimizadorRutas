import { RutaCamion as PrismaRuta, PuntoRuta as PrismaPunto } from '@prisma/client';
import { RutaCamion, PuntoRuta } from '../dominio/ruta';

export class PrismaRutaCamionMapper {
  static toDomain(ruta: PrismaRuta & { puntos: PrismaPunto[] }): RutaCamion {
    const puntos = (ruta.puntos || [])
      .map(
        p =>
          new PuntoRuta(
            p.id,
            p.rutaCamionId,
            p.orden,
            p.tipoPunto,
            p.latitud,
            p.longitud,
            p.descripcion,
            p.creadoEn,
            p.actualizadoEn,
          ),
      )
      .sort((a, b) => a.orden - b.orden);

    return new RutaCamion(
      ruta.id,
      ruta.camionId,
      puntos,
      ruta.creadoEn,
      ruta.actualizadoEn,
    );
  }
}
