export interface UbicacionFabrica {
  latitud: number;
  longitud: number;
}

export class Fabrica {
  constructor(
    public readonly id: number,
    public readonly nombre: string,
    public readonly latitud: number,
    public readonly longitud: number,
    public readonly activo: boolean,
    public readonly creadoEn: Date,
    public readonly actualizadoEn: Date,
    public readonly descripcion: string | null,
    public readonly direccion: string | null,
  ) {}
}
