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
exports.CamionesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crear_camion_use_case_1 = require("../aplicacion/crear-camion.use-case");
const actualizar_camion_use_case_1 = require("../aplicacion/actualizar-camion.use-case");
const listar_camiones_use_case_1 = require("../aplicacion/listar-camiones.use-case");
const obtener_camion_use_case_1 = require("../aplicacion/obtener-camion.use-case");
const eliminar_camion_use_case_1 = require("../aplicacion/eliminar-camion.use-case");
const crear_camion_dto_1 = require("./dto/crear-camion.dto");
const actualizar_camion_dto_1 = require("./dto/actualizar-camion.dto");
const camion_respuesta_dto_1 = require("./dto/camion-respuesta.dto");
const zod_validation_pipe_1 = require("../../../compartido/zod-validation.pipe");
let CamionesController = class CamionesController {
    crearCamionUseCase;
    actualizarCamionUseCase;
    listarCamionesUseCase;
    obtenerCamionUseCase;
    eliminarCamionUseCase;
    constructor(crearCamionUseCase, actualizarCamionUseCase, listarCamionesUseCase, obtenerCamionUseCase, eliminarCamionUseCase) {
        this.crearCamionUseCase = crearCamionUseCase;
        this.actualizarCamionUseCase = actualizarCamionUseCase;
        this.listarCamionesUseCase = listarCamionesUseCase;
        this.obtenerCamionUseCase = obtenerCamionUseCase;
        this.eliminarCamionUseCase = eliminarCamionUseCase;
    }
    async crear(dto) {
        return this.crearCamionUseCase.ejecutar(dto);
    }
    async listar(placa) {
        return this.listarCamionesUseCase.ejecutar(placa);
    }
    async obtenerPorId(id) {
        return this.obtenerCamionUseCase.ejecutar(Number(id));
    }
    async actualizar(id, dto) {
        return this.actualizarCamionUseCase.ejecutar(Number(id), dto);
    }
    async eliminar(id) {
        await this.eliminarCamionUseCase.ejecutar(Number(id));
    }
};
exports.CamionesController = CamionesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar un nuevo camión' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Camión creado correctamente', type: camion_respuesta_dto_1.CamionRespuestaDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos de entrada inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Placa duplicada' }),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(crear_camion_dto_1.CrearCamionSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_camion_dto_1.CrearCamionDto]),
    __metadata("design:returntype", Promise)
], CamionesController.prototype, "crear", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar y filtrar camiones de la flota' }),
    (0, swagger_1.ApiQuery)({ name: 'placa', required: false, description: 'Filtrar por placa (coincidencia parcial)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Listado de camiones devuelto con éxito', type: [camion_respuesta_dto_1.CamionRespuestaDto] }),
    __param(0, (0, common_1.Query)('placa')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CamionesController.prototype, "listar", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener los detalles de un camión por su ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del camión', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detalles del camión encontrados', type: camion_respuesta_dto_1.CamionRespuestaDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Camión no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CamionesController.prototype, "obtenerPorId", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar los datos de un camión' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del camión', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Camión actualizado correctamente', type: camion_respuesta_dto_1.CamionRespuestaDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos de entrada inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Camión no encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Placa duplicada por otro camión' }),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(actualizar_camion_dto_1.ActualizarCamionSchema)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, actualizar_camion_dto_1.ActualizarCamionDto]),
    __metadata("design:returntype", Promise)
], CamionesController.prototype, "actualizar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un camión del sistema y sus rutas asociadas' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del camión', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Camión eliminado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Camión no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CamionesController.prototype, "eliminar", null);
exports.CamionesController = CamionesController = __decorate([
    (0, swagger_1.ApiTags)('Camiones'),
    (0, common_1.Controller)('camiones'),
    __metadata("design:paramtypes", [crear_camion_use_case_1.CrearCamionUseCase,
        actualizar_camion_use_case_1.ActualizarCamionUseCase,
        listar_camiones_use_case_1.ListarCamionesUseCase,
        obtener_camion_use_case_1.ObtenerCamionUseCase,
        eliminar_camion_use_case_1.EliminarCamionUseCase])
], CamionesController);
//# sourceMappingURL=camiones.controller.js.map