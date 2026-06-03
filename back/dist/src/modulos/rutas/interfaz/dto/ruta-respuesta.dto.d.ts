import { PuntoRutaRespuestaDto } from './punto-ruta-respuesta.dto';
export declare class RutaRespuestaDto {
    id: number;
    camionId: number;
    puntos: PuntoRutaRespuestaDto[];
    creadoEn: Date;
    actualizadoEn: Date;
}
