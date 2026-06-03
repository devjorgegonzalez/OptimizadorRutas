export class PuntoRuta {
  constructor(
    public readonly id: number,
    public readonly rutaCamionId: number,
    public readonly orden: number,
    public readonly tipoPunto: string, // "ORIGEN", "FABRICA", "CLIENTE"
    public readonly latitud: number,
    public readonly longitud: number,
    public readonly descripcion: string | null,
    public readonly creadoEn: Date,
    public readonly actualizadoEn: Date,
  ) {}
}

export class RutaCamion {
  constructor(
    public readonly id: number,
    public readonly camionId: number,
    public readonly puntos: PuntoRuta[],
    public readonly creadoEn: Date,
    public readonly actualizadoEn: Date,
  ) {}
}
