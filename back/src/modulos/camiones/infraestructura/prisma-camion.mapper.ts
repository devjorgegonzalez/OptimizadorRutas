import { Camion as CamionDominio } from '../dominio/camion';
import { Camion as CamionPrisma } from '@prisma/client';

export class PrismaCamionMapper {
  static toDomain(prismaCamion: CamionPrisma): CamionDominio {
    return new CamionDominio(
      prismaCamion.id,
      prismaCamion.placa,
      prismaCamion.capacidad,
      { latitud: prismaCamion.latitudOrigen, longitud: prismaCamion.longitudOrigen },
      { latitud: prismaCamion.latitudUltima, longitud: prismaCamion.longitudUltima },
      prismaCamion.creadoEn,
      prismaCamion.actualizadoEn,
    );
  }
}
