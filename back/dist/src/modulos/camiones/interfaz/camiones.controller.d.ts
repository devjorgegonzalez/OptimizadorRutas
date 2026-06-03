import { CrearCamionUseCase } from '../aplicacion/crear-camion.use-case';
import { ActualizarCamionUseCase } from '../aplicacion/actualizar-camion.use-case';
import { ListarCamionesUseCase } from '../aplicacion/listar-camiones.use-case';
import { ObtenerCamionUseCase } from '../aplicacion/obtener-camion.use-case';
import { EliminarCamionUseCase } from '../aplicacion/eliminar-camion.use-case';
import { CrearCamionDto } from './dto/crear-camion.dto';
import { ActualizarCamionDto } from './dto/actualizar-camion.dto';
import { CamionRespuestaDto } from './dto/camion-respuesta.dto';
export declare class CamionesController {
    private readonly crearCamionUseCase;
    private readonly actualizarCamionUseCase;
    private readonly listarCamionesUseCase;
    private readonly obtenerCamionUseCase;
    private readonly eliminarCamionUseCase;
    constructor(crearCamionUseCase: CrearCamionUseCase, actualizarCamionUseCase: ActualizarCamionUseCase, listarCamionesUseCase: ListarCamionesUseCase, obtenerCamionUseCase: ObtenerCamionUseCase, eliminarCamionUseCase: EliminarCamionUseCase);
    crear(dto: CrearCamionDto): Promise<CamionRespuestaDto>;
    listar(placa?: string): Promise<CamionRespuestaDto[]>;
    obtenerPorId(id: string): Promise<CamionRespuestaDto>;
    actualizar(id: string, dto: ActualizarCamionDto): Promise<CamionRespuestaDto>;
    eliminar(id: string): Promise<void>;
}
