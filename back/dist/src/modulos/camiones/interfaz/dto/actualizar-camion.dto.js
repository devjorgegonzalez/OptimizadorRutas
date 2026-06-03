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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActualizarCamionDto = exports.ActualizarCamionSchema = void 0;
const swagger_1 = require("@nestjs/swagger");
const zod_1 = require("zod");
const crear_camion_dto_1 = require("./crear-camion.dto");
exports.ActualizarCamionSchema = zod_1.z.object({
    placa: zod_1.z.string().min(1).max(20).optional(),
    capacidad: zod_1.z.coerce.number().positive().optional(),
    puntoOrigen: crear_camion_dto_1.UbicacionSchema.optional(),
    ultimaUbicacion: crear_camion_dto_1.UbicacionSchema.optional(),
});
class ActualizarCamionDto {
    placa;
    capacidad;
    puntoOrigen;
    ultimaUbicacion;
}
exports.ActualizarCamionDto = ActualizarCamionDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Placa única del camión', example: 'AB123CD' }),
    __metadata("design:type", String)
], ActualizarCamionDto.prototype, "placa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Capacidad máxima de carga', example: 18.0 }),
    __metadata("design:type", Number)
], ActualizarCamionDto.prototype, "capacidad", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Punto de origen', type: crear_camion_dto_1.UbicacionDto }),
    __metadata("design:type", crear_camion_dto_1.UbicacionDto)
], ActualizarCamionDto.prototype, "puntoOrigen", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Última ubicación conocida', type: crear_camion_dto_1.UbicacionDto }),
    __metadata("design:type", crear_camion_dto_1.UbicacionDto)
], ActualizarCamionDto.prototype, "ultimaUbicacion", void 0);
//# sourceMappingURL=actualizar-camion.dto.js.map