import { ObtenerRutaCamionUseCase } from '../aplicacion/obtener-ruta.use-case';
import { EliminarRutaCamionUseCase } from '../aplicacion/eliminar-ruta.use-case';
import { GenerarRutasUseCase } from '../aplicacion/generar-rutas.use-case';
import { RutaRespuestaDto } from './dto/ruta-respuesta.dto';
export declare class RutasController {
    private readonly obtenerRutaCamionUseCase;
    private readonly eliminarRutaCamionUseCase;
    private readonly generarRutasUseCase;
    constructor(obtenerRutaCamionUseCase: ObtenerRutaCamionUseCase, eliminarRutaCamionUseCase: EliminarRutaCamionUseCase, generarRutasUseCase: GenerarRutasUseCase);
    generar(): Promise<RutaRespuestaDto[]>;
    obtenerPorCamionId(camionId: string): Promise<RutaRespuestaDto>;
    eliminar(camionId: string): Promise<void>;
}
