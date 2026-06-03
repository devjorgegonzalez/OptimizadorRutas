import { CrearFabricaUseCase } from '../aplicacion/crear-fabrica.use-case';
import { ActualizarFabricaUseCase } from '../aplicacion/actualizar-fabrica.use-case';
import { ListarFabricasUseCase } from '../aplicacion/listar-fabricas.use-case';
import { ObtenerFabricaUseCase } from '../aplicacion/obtener-fabrica.use-case';
import { EliminarFabricaUseCase } from '../aplicacion/eliminar-fabrica.use-case';
import { CrearFabricaDto } from './dto/crear-fabrica.dto';
import { ActualizarFabricaDto } from './dto/actualizar-fabrica.dto';
import { FabricaRespuestaDto } from './dto/fabrica-respuesta.dto';
export declare class FabricasController {
    private readonly crearFabricaUseCase;
    private readonly actualizarFabricaUseCase;
    private readonly listarFabricasUseCase;
    private readonly obtenerFabricaUseCase;
    private readonly eliminarFabricaUseCase;
    constructor(crearFabricaUseCase: CrearFabricaUseCase, actualizarFabricaUseCase: ActualizarFabricaUseCase, listarFabricasUseCase: ListarFabricasUseCase, obtenerFabricaUseCase: ObtenerFabricaUseCase, eliminarFabricaUseCase: EliminarFabricaUseCase);
    crear(dto: CrearFabricaDto): Promise<FabricaRespuestaDto>;
    listar(nombre?: string): Promise<FabricaRespuestaDto[]>;
    obtenerPorId(id: string): Promise<FabricaRespuestaDto>;
    actualizar(id: string, dto: ActualizarFabricaDto): Promise<FabricaRespuestaDto>;
    eliminar(id: string): Promise<void>;
}
