"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientesModule = void 0;
const common_1 = require("@nestjs/common");
const cliente_repository_1 = require("../dominio/cliente.repository");
const prisma_cliente_repository_1 = require("./prisma-cliente.repository");
const crear_cliente_use_case_1 = require("../aplicacion/crear-cliente.use-case");
const actualizar_cliente_use_case_1 = require("../aplicacion/actualizar-cliente.use-case");
const listar_clientes_use_case_1 = require("../aplicacion/listar-clientes.use-case");
const obtener_cliente_use_case_1 = require("../aplicacion/obtener-cliente.use-case");
const eliminar_cliente_use_case_1 = require("../aplicacion/eliminar-cliente.use-case");
const clientes_controller_1 = require("../interfaz/clientes.controller");
let ClientesModule = class ClientesModule {
};
exports.ClientesModule = ClientesModule;
exports.ClientesModule = ClientesModule = __decorate([
    (0, common_1.Module)({
        controllers: [clientes_controller_1.ClientesController],
        providers: [
            {
                provide: cliente_repository_1.CLIENTE_REPOSITORY,
                useClass: prisma_cliente_repository_1.PrismaClienteRepository,
            },
            crear_cliente_use_case_1.CrearClienteUseCase,
            actualizar_cliente_use_case_1.ActualizarClienteUseCase,
            listar_clientes_use_case_1.ListarClientesUseCase,
            obtener_cliente_use_case_1.ObtenerClienteUseCase,
            eliminar_cliente_use_case_1.EliminarClienteUseCase,
        ],
        exports: [
            crear_cliente_use_case_1.CrearClienteUseCase,
            actualizar_cliente_use_case_1.ActualizarClienteUseCase,
            listar_clientes_use_case_1.ListarClientesUseCase,
            obtener_cliente_use_case_1.ObtenerClienteUseCase,
            eliminar_cliente_use_case_1.EliminarClienteUseCase,
        ],
    })
], ClientesModule);
//# sourceMappingURL=clientes.module.js.map