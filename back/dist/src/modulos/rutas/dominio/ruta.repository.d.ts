import { RutaCamion, PuntoRuta } from './ruta';
export interface RutaCamionRepository {
    guardar(camionId: number, puntos: Omit<PuntoRuta, 'id' | 'rutaCamionId' | 'creadoEn' | 'actualizadoEn'>[]): Promise<RutaCamion>;
    obtenerPorCamionId(camionId: number): Promise<RutaCamion | null>;
    eliminar(camionId: number): Promise<void>;
    listarTodas(): Promise<RutaCamion[]>;
}
export declare const RUTA_CAMION_REPOSITORY = "RutaCamionRepository";
