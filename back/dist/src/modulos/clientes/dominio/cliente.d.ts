export interface UbicacionCliente {
    latitud: number;
    longitud: number;
}
export declare class Cliente {
    readonly id: number;
    readonly nombre: string;
    readonly latitud: number;
    readonly longitud: number;
    readonly activo: boolean;
    readonly creadoEn: Date;
    readonly actualizadoEn: Date;
    readonly descripcion: string | null;
    readonly direccion: string | null;
    constructor(id: number, nombre: string, latitud: number, longitud: number, activo: boolean, creadoEn: Date, actualizadoEn: Date, descripcion: string | null, direccion: string | null);
}
