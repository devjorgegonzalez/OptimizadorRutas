export interface UbicacionCamion {
    latitud: number;
    longitud: number;
}
export declare class Camion {
    readonly id: number;
    readonly placa: string;
    readonly capacidad: number;
    readonly puntoOrigen: UbicacionCamion;
    readonly ultimaUbicacion: UbicacionCamion;
    readonly creadoEn: Date;
    readonly actualizadoEn: Date;
    constructor(id: number, placa: string, capacidad: number, puntoOrigen: UbicacionCamion, ultimaUbicacion: UbicacionCamion, creadoEn: Date, actualizadoEn: Date);
}
