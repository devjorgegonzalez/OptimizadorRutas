export declare class PuntoRuta {
    readonly id: number;
    readonly rutaCamionId: number;
    readonly orden: number;
    readonly tipoPunto: string;
    readonly latitud: number;
    readonly longitud: number;
    readonly descripcion: string | null;
    readonly creadoEn: Date;
    readonly actualizadoEn: Date;
    constructor(id: number, rutaCamionId: number, orden: number, tipoPunto: string, latitud: number, longitud: number, descripcion: string | null, creadoEn: Date, actualizadoEn: Date);
}
export declare class RutaCamion {
    readonly id: number;
    readonly camionId: number;
    readonly puntos: PuntoRuta[];
    readonly creadoEn: Date;
    readonly actualizadoEn: Date;
    constructor(id: number, camionId: number, puntos: PuntoRuta[], creadoEn: Date, actualizadoEn: Date);
}
