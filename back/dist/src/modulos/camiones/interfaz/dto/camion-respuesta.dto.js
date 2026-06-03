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
exports.CamionRespuestaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const crear_camion_dto_1 = require("./crear-camion.dto");
class CamionRespuestaDto {
    id;
    placa;
    capacidad;
    puntoOrigen;
    ultimaUbicacion;
    creadoEn;
    actualizadoEn;
}
exports.CamionRespuestaDto = CamionRespuestaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Identificador del camión', example: 1 }),
    __metadata("design:type", Number)
], CamionRespuestaDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Placa única del camión', example: 'AB123CD' }),
    __metadata("design:type", String)
], CamionRespuestaDto.prototype, "placa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Capacidad del camión', example: 15.5 }),
    __metadata("design:type", Number)
], CamionRespuestaDto.prototype, "capacidad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Punto de origen', type: crear_camion_dto_1.UbicacionDto }),
    __metadata("design:type", crear_camion_dto_1.UbicacionDto)
], CamionRespuestaDto.prototype, "puntoOrigen", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Última ubicación conocida', type: crear_camion_dto_1.UbicacionDto }),
    __metadata("design:type", crear_camion_dto_1.UbicacionDto)
], CamionRespuestaDto.prototype, "ultimaUbicacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha de creación', example: '2026-06-03T19:57:01.000Z' }),
    __metadata("design:type", Date)
], CamionRespuestaDto.prototype, "creadoEn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha de última actualización', example: '2026-06-03T19:57:01.000Z' }),
    __metadata("design:type", Date)
], CamionRespuestaDto.prototype, "actualizadoEn", void 0);
//# sourceMappingURL=camion-respuesta.dto.js.map