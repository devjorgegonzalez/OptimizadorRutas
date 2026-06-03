export interface UbicacionCamion {
  latitud: number;
  longitud: number;
}

export class Camion {
  constructor(
    public readonly id: number,
    public readonly placa: string,
    public readonly capacidad: number,
    public readonly puntoOrigen: UbicacionCamion,
    public readonly ultimaUbicacion: UbicacionCamion,
    public readonly creadoEn: Date,
    public readonly actualizadoEn: Date,
  ) {}
}
