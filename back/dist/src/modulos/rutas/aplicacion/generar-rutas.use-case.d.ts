import type { RutaCamionRepository } from '../dominio/ruta.repository';
import { ListarCamionesUseCase } from '../../camiones/aplicacion/listar-camiones.use-case';
import { ListarClientesUseCase } from '../../clientes/aplicacion/listar-clientes.use-case';
import { ListarFabricasUseCase } from '../../fabricas/aplicacion/listar-fabricas.use-case';
import { RutaCamion } from '../dominio/ruta';
export declare class GenerarRutasUseCase {
    private readonly repository;
    private readonly listarCamionesUseCase;
    private readonly listarClientesUseCase;
    private readonly listarFabricasUseCase;
    constructor(repository: RutaCamionRepository, listarCamionesUseCase: ListarCamionesUseCase, listarClientesUseCase: ListarClientesUseCase, listarFabricasUseCase: ListarFabricasUseCase);
    ejecutar(): Promise<RutaCamion[]>;
    private calcularDistancia;
}
