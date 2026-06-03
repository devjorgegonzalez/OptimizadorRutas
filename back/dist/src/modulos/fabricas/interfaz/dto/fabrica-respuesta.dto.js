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
exports.FabricaRespuestaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class FabricaRespuestaDto {
    id;
    nombre;
    latitud;
    longitud;
    activo;
    creadoEn;
    actualizadoEn;
    descripcion;
    direccion;
}
exports.FabricaRespuestaDto = FabricaRespuestaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Identificador único de la fábrica', example: 1 }),
    __metadata("design:type", Number)
], FabricaRespuestaDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre de la fábrica', example: 'Fábrica Principal Caracas' }),
    __metadata("design:type", String)
], FabricaRespuestaDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Latitud de la ubicación', example: 10.4806 }),
    __metadata("design:type", Number)
], FabricaRespuestaDto.prototype, "latitud", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Longitud de la ubicación', example: -66.9036 }),
    __metadata("design:type", Number)
], FabricaRespuestaDto.prototype, "longitud", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indica si la fábrica está activa', example: true }),
    __metadata("design:type", Boolean)
], FabricaRespuestaDto.prototype, "activo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha de creación', example: '2026-06-03T19:57:01.000Z' }),
    __metadata("design:type", Date)
], FabricaRespuestaDto.prototype, "creadoEn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha de última actualización', example: '2026-06-03T19:57:01.000Z' }),
    __metadata("design:type", Date)
], FabricaRespuestaDto.prototype, "actualizadoEn", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Descripción opcional', example: 'Fábrica de carga principal', nullable: true }),
    __metadata("design:type", Object)
], FabricaRespuestaDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Dirección física opcional', example: 'Zona Industrial La Yaguara', nullable: true }),
    __metadata("design:type", Object)
], FabricaRespuestaDto.prototype, "direccion", void 0);
//# sourceMappingURL=fabrica-respuesta.dto.js.map