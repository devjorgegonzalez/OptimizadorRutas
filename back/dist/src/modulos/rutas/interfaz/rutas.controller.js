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
exports.RutasController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const obtener_ruta_use_case_1 = require("../aplicacion/obtener-ruta.use-case");
const eliminar_ruta_use_case_1 = require("../aplicacion/eliminar-ruta.use-case");
const generar_rutas_use_case_1 = require("../aplicacion/generar-rutas.use-case");
const ruta_respuesta_dto_1 = require("./dto/ruta-respuesta.dto");
let RutasController = class RutasController {
    obtenerRutaCamionUseCase;
    eliminarRutaCamionUseCase;
    generarRutasUseCase;
    constructor(obtenerRutaCamionUseCase, eliminarRutaCamionUseCase, generarRutasUseCase) {
        this.obtenerRutaCamionUseCase = obtenerRutaCamionUseCase;
        this.eliminarRutaCamionUseCase = eliminarRutaCamionUseCase;
        this.generarRutasUseCase = generarRutasUseCase;
    }
    async generar() {
        return this.generarRutasUseCase.ejecutar();
    }
    async obtenerPorCamionId(camionId) {
        const ruta = await this.obtenerRutaCamionUseCase.ejecutar(Number(camionId));
        if (!ruta) {
            throw new common_1.NotFoundException(`Ruta no encontrada para el camión con ID ${camionId}`);
        }
        return ruta;
    }
    async eliminar(camionId) {
        await this.eliminarRutaCamionUseCase.ejecutar(Number(camionId));
    }
};
exports.RutasController = RutasController;
__decorate([
    (0, common_1.Post)('generar'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Generar y optimizar rutas para camiones sin ruta asignada' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Rutas generadas y optimizadas con éxito', type: [ruta_respuesta_dto_1.RutaRespuestaDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RutasController.prototype, "generar", null);
__decorate([
    (0, common_1.Get)('camion/:camionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener la ruta asignada a un camión' }),
    (0, swagger_1.ApiParam)({ name: 'camionId', description: 'ID del camión', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detalles de la ruta encontrados', type: ruta_respuesta_dto_1.RutaRespuestaDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ruta no encontrada para este camión' }),
    __param(0, (0, common_1.Param)('camionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RutasController.prototype, "obtenerPorCamionId", null);
__decorate([
    (0, common_1.Delete)('camion/:camionId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar la ruta asignada a un camión' }),
    (0, swagger_1.ApiParam)({ name: 'camionId', description: 'ID del camión', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Ruta eliminada con éxito' }),
    __param(0, (0, common_1.Param)('camionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RutasController.prototype, "eliminar", null);
exports.RutasController = RutasController = __decorate([
    (0, swagger_1.ApiTags)('Rutas'),
    (0, common_1.Controller)('rutas'),
    __metadata("design:paramtypes", [obtener_ruta_use_case_1.ObtenerRutaCamionUseCase,
        eliminar_ruta_use_case_1.EliminarRutaCamionUseCase,
        generar_rutas_use_case_1.GenerarRutasUseCase])
], RutasController);
//# sourceMappingURL=rutas.controller.js.map