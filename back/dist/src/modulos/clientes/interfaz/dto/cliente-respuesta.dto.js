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
exports.ClienteRespuestaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ClienteRespuestaDto {
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
exports.ClienteRespuestaDto = ClienteRespuestaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Identificador único del cliente', example: 1 }),
    __metadata("design:type", Number)
], ClienteRespuestaDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre del cliente', example: 'Supermercado Central Caracas' }),
    __metadata("design:type", String)
], ClienteRespuestaDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Latitud de la ubicación', example: 10.4806 }),
    __metadata("design:type", Number)
], ClienteRespuestaDto.prototype, "latitud", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Longitud de la ubicación', example: -66.9036 }),
    __metadata("design:type", Number)
], ClienteRespuestaDto.prototype, "longitud", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indica si el cliente está activo', example: true }),
    __metadata("design:type", Boolean)
], ClienteRespuestaDto.prototype, "activo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha de creación', example: '2026-06-03T19:57:01.000Z' }),
    __metadata("design:type", Date)
], ClienteRespuestaDto.prototype, "creadoEn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha de última actualización', example: '2026-06-03T19:57:01.000Z' }),
    __metadata("design:type", Date)
], ClienteRespuestaDto.prototype, "actualizadoEn", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Descripción opcional del cliente', example: 'Cliente corporativo', nullable: true }),
    __metadata("design:type", Object)
], ClienteRespuestaDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Dirección física opcional', example: 'Av. Francisco de Miranda, Local 4', nullable: true }),
    __metadata("design:type", Object)
], ClienteRespuestaDto.prototype, "direccion", void 0);
//# sourceMappingURL=cliente-respuesta.dto.js.map