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
exports.FabricasController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crear_fabrica_use_case_1 = require("../aplicacion/crear-fabrica.use-case");
const actualizar_fabrica_use_case_1 = require("../aplicacion/actualizar-fabrica.use-case");
const listar_fabricas_use_case_1 = require("../aplicacion/listar-fabricas.use-case");
const obtener_fabrica_use_case_1 = require("../aplicacion/obtener-fabrica.use-case");
const eliminar_fabrica_use_case_1 = require("../aplicacion/eliminar-fabrica.use-case");
const crear_fabrica_dto_1 = require("./dto/crear-fabrica.dto");
const actualizar_fabrica_dto_1 = require("./dto/actualizar-fabrica.dto");
const fabrica_respuesta_dto_1 = require("./dto/fabrica-respuesta.dto");
const zod_validation_pipe_1 = require("../../../compartido/zod-validation.pipe");
let FabricasController = class FabricasController {
    crearFabricaUseCase;
    actualizarFabricaUseCase;
    listarFabricasUseCase;
    obtenerFabricaUseCase;
    eliminarFabricaUseCase;
    constructor(crearFabricaUseCase, actualizarFabricaUseCase, listarFabricasUseCase, obtenerFabricaUseCase, eliminarFabricaUseCase) {
        this.crearFabricaUseCase = crearFabricaUseCase;
        this.actualizarFabricaUseCase = actualizarFabricaUseCase;
        this.listarFabricasUseCase = listarFabricasUseCase;
        this.obtenerFabricaUseCase = obtenerFabricaUseCase;
        this.eliminarFabricaUseCase = eliminarFabricaUseCase;
    }
    async crear(dto) {
        return this.crearFabricaUseCase.ejecutar(dto);
    }
    async listar(nombre) {
        return this.listarFabricasUseCase.ejecutar(nombre);
    }
    async obtenerPorId(id) {
        return this.obtenerFabricaUseCase.ejecutar(Number(id));
    }
    async actualizar(id, dto) {
        return this.actualizarFabricaUseCase.ejecutar(Number(id), dto);
    }
    async eliminar(id) {
        await this.eliminarFabricaUseCase.ejecutar(Number(id));
    }
};
exports.FabricasController = FabricasController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar una nueva fábrica de carga' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Fábrica creada correctamente', type: fabrica_respuesta_dto_1.FabricaRespuestaDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos de entrada inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Nombre de fábrica duplicado' }),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(crear_fabrica_dto_1.CrearFabricaSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_fabrica_dto_1.CrearFabricaDto]),
    __metadata("design:returntype", Promise)
], FabricasController.prototype, "crear", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar y filtrar fábricas de la flota' }),
    (0, swagger_1.ApiQuery)({ name: 'nombre', required: false, description: 'Filtrar por nombre (coincidencia parcial)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Listado de fábricas devuelto con éxito', type: [fabrica_respuesta_dto_1.FabricaRespuestaDto] }),
    __param(0, (0, common_1.Query)('nombre')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FabricasController.prototype, "listar", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener los detalles de una fábrica por su ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la fábrica', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detalles de la fábrica encontrados', type: fabrica_respuesta_dto_1.FabricaRespuestaDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Fábrica no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FabricasController.prototype, "obtenerPorId", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar los datos de una fábrica' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la fábrica', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Fábrica actualizada correctamente', type: fabrica_respuesta_dto_1.FabricaRespuestaDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos de entrada inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Fábrica no encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Nombre duplicado por otro fábrica' }),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(actualizar_fabrica_dto_1.ActualizarFabricaSchema)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, actualizar_fabrica_dto_1.ActualizarFabricaDto]),
    __metadata("design:returntype", Promise)
], FabricasController.prototype, "actualizar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una fábrica del sistema' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la fábrica', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Fábrica eliminada' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Fábrica no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FabricasController.prototype, "eliminar", null);
exports.FabricasController = FabricasController = __decorate([
    (0, swagger_1.ApiTags)('Fábricas'),
    (0, common_1.Controller)('fabricas'),
    __metadata("design:paramtypes", [crear_fabrica_use_case_1.CrearFabricaUseCase,
        actualizar_fabrica_use_case_1.ActualizarFabricaUseCase,
        listar_fabricas_use_case_1.ListarFabricasUseCase,
        obtener_fabrica_use_case_1.ObtenerFabricaUseCase,
        eliminar_fabrica_use_case_1.EliminarFabricaUseCase])
], FabricasController);
//# sourceMappingURL=fabricas.controller.js.map