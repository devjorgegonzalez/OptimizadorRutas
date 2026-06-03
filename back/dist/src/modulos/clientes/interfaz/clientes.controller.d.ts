import { CrearClienteUseCase } from '../aplicacion/crear-cliente.use-case';
import { ActualizarClienteUseCase } from '../aplicacion/actualizar-cliente.use-case';
import { ListarClientesUseCase } from '../aplicacion/listar-clientes.use-case';
import { ObtenerClienteUseCase } from '../aplicacion/obtener-cliente.use-case';
import { EliminarClienteUseCase } from '../aplicacion/eliminar-cliente.use-case';
import { CrearClienteDto } from './dto/crear-cliente.dto';
import { ActualizarClienteDto } from './dto/actualizar-cliente.dto';
import { ClienteRespuestaDto } from './dto/cliente-respuesta.dto';
export declare class ClientesController {
    private readonly crearClienteUseCase;
    private readonly actualizarClienteUseCase;
    private readonly listarClientesUseCase;
    private readonly obtenerClienteUseCase;
    private readonly eliminarClienteUseCase;
    constructor(crearClienteUseCase: CrearClienteUseCase, actualizarClienteUseCase: ActualizarClienteUseCase, listarClientesUseCase: ListarClientesUseCase, obtenerClienteUseCase: ObtenerClienteUseCase, eliminarClienteUseCase: EliminarClienteUseCase);
    crear(dto: CrearClienteDto): Promise<ClienteRespuestaDto>;
    listar(nombre?: string): Promise<ClienteRespuestaDto[]>;
    obtenerPorId(id: string): Promise<ClienteRespuestaDto>;
    actualizar(id: string, dto: ActualizarClienteDto): Promise<ClienteRespuestaDto>;
    eliminar(id: string): Promise<void>;
}
