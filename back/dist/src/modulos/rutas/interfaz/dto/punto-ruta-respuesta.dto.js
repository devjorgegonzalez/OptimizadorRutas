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
exports.PuntoRutaRespuestaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PuntoRutaRespuestaDto {
    id;
    rutaCamionId;
    orden;
    tipoPunto;
    latitud;
    longitud;
    descripcion;
    creadoEn;
    actualizadoEn;
}
exports.PuntoRutaRespuestaDto = PuntoRutaRespuestaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Identificador del punto de ruta', example: 1 }),
    __metadata("design:type", Number)
], PuntoRutaRespuestaDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Identificador de la ruta del camión', example: 5 }),
    __metadata("design:type", Number)
], PuntoRutaRespuestaDto.prototype, "rutaCamionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Orden de visita del punto', example: 0 }),
    __metadata("design:type", Number)
], PuntoRutaRespuestaDto.prototype, "orden", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipo de punto', enum: ['ORIGEN', 'FABRICA', 'CLIENTE'], example: 'ORIGEN' }),
    __metadata("design:type", String)
], PuntoRutaRespuestaDto.prototype, "tipoPunto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Latitud del punto', example: 10.4806 }),
    __metadata("design:type", Number)
], PuntoRutaRespuestaDto.prototype, "latitud", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Longitud del punto', example: -66.9036 }),
    __metadata("design:type", Number)
], PuntoRutaRespuestaDto.prototype, "longitud", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Descripción o nombre del punto', example: 'Ubicación actual del camión', nullable: true }),
    __metadata("design:type", Object)
], PuntoRutaRespuestaDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha de creación', example: '2026-06-03T19:57:01.000Z' }),
    __metadata("design:type", Date)
], PuntoRutaRespuestaDto.prototype, "creadoEn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha de última actualización', example: '2026-06-03T19:57:01.000Z' }),
    __metadata("design:type", Date)
], PuntoRutaRespuestaDto.prototype, "actualizadoEn", void 0);
//# sourceMappingURL=punto-ruta-respuesta.dto.js.map