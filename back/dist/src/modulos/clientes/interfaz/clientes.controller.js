"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crear_cliente_use_case_1 = require("../aplicacion/crear-cliente.use-case");
const actualizar_cliente_use_case_1 = require("../aplicacion/actualizar-cliente.use-case");
const listar_clientes_use_case_1 = require("../aplicacion/listar-clientes.use-case");
const obtener_cliente_use_case_1 = require("../aplicacion/obtener-cliente.use-case");
const eliminar_cliente_use_case_1 = require("../aplicacion/eliminar-cliente.use-case");
const crear_cliente_dto_1 = require("./dto/crear-cliente.dto");
const actualizar_cliente_dto_1 = require("./dto/actualizar-cliente.dto");
const cliente_respuesta_dto_1 = require("./dto/cliente-respuesta.dto");
const zod_validation_pipe_1 = require("../../../compartido/zod-validation.pipe");
let ClientesController = class ClientesController {
    crearClienteUseCase;
    actualizarClienteUseCase;
    listarClientesUseCase;
    obtenerClienteUseCase;
    eliminarClienteUseCase;
    constructor(crearClienteUseCase, actualizarClienteUseCase, listarClientesUseCase, obtenerClienteUseCase, eliminarClienteUseCase) {
        this.crearClienteUseCase = crearClienteUseCase;
        this.actualizarClienteUseCase = actualizarClienteUseCase;
        this.listarClientesUseCase = listarClientesUseCase;
        this.obtenerClienteUseCase = obtenerClienteUseCase;
        this.eliminarClienteUseCase = eliminarClienteUseCase;
    }
    async crear(dto) {
        return this.crearClienteUseCase.ejecutar(dto);
    }
    async listar(nombre) {
        return this.listarClientesUseCase.ejecutar(nombre);
    }
    async obtenerPorId(id) {
        return this.obtenerClienteUseCase.ejecutar(Number(id));
    }
    async actualizar(id, dto) {
        return this.actualizarClienteUseCase.ejecutar(Number(id), dto);
    }
    async eliminar(id) {
        await this.eliminarClienteUseCase.ejecutar(Number(id));
    }
};
exports.ClientesController = ClientesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar un nuevo cliente' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Cliente creado correctamente', type: cliente_respuesta_dto_1.ClienteRespuestaDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos de entrada inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Nombre de cliente duplicado' }),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(crear_cliente_dto_1.CrearClienteSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_cliente_dto_1.CrearClienteDto]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "crear", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar y filtrar clientes' }),
    (0, swagger_1.ApiQuery)({ name: 'nombre', required: false, description: 'Filtrar por nombre (coincidencia parcial)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Listado de clientes devuelto con éxito', type: [cliente_respuesta_dto_1.ClienteRespuestaDto] }),
    __param(0, (0, common_1.Query)('nombre')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "listar", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener los detalles de un cliente por su ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del cliente', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detalles del cliente encontrados', type: cliente_respuesta_dto_1.ClienteRespuestaDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cliente no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "obtenerPorId", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar los datos de un cliente' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del cliente', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cliente actualizado correctamente', type: cliente_respuesta_dto_1.ClienteRespuestaDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos de entrada inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cliente no encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Nombre duplicado por otro cliente' }),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(actualizar_cliente_dto_1.ActualizarClienteSchema)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, actualizar_cliente_dto_1.ActualizarClienteDto]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "actualizar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un cliente del sistema' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del cliente', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Cliente eliminado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cliente no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "eliminar", null);
exports.ClientesController = ClientesController = __decorate([
    (0, swagger_1.ApiTags)('Clientes'),
    (0, common_1.Controller)('clientes'),
    __metadata("design:paramtypes", [crear_cliente_use_case_1.CrearClienteUseCase,
        actualizar_cliente_use_case_1.ActualizarClienteUseCase,
        listar_clientes_use_case_1.ListarClientesUseCase,
        obtener_cliente_use_case_1.ObtenerClienteUseCase,
        eliminar_cliente_use_case_1.EliminarClienteUseCase])
], ClientesController);
//# sourceMappingURL=clientes.controller.js.map