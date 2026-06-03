import { UbicacionDto } from './crear-camion.dto';
export declare class CamionRespuestaDto {
    id: number;
    placa: string;
    capacidad: number;
    puntoOrigen: UbicacionDto;
    ultimaUbicacion: UbicacionDto;
    creadoEn: Date;
    actualizadoEn: Date;
}
