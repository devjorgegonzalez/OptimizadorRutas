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
exports.ActualizarFabricaDto = exports.ActualizarFabricaSchema = void 0;
const swagger_1 = require("@nestjs/swagger");
const zod_1 = require("zod");
exports.ActualizarFabricaSchema = zod_1.z.object({
    nombre: zod_1.z.string().min(1).max(100).optional(),
    latitud: zod_1.z.coerce.number().min(-90).max(90).optional(),
    longitud: zod_1.z.coerce.number().min(-180).max(180).optional(),
    activo: zod_1.z.boolean().optional(),
    descripcion: zod_1.z.string().max(255).optional().nullable(),
    direccion: zod_1.z.string().max(255).optional().nullable(),
});
class ActualizarFabricaDto {
    nombre;
    latitud;
    longitud;
    activo;
    descripcion;
    direccion;
}
exports.ActualizarFabricaDto = ActualizarFabricaDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nombre de la fábrica', example: 'Fábrica Principal Caracas' }),
    __metadata("design:type", String)
], ActualizarFabricaDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Latitud de la fábrica', example: 10.4806 }),
    __metadata("design:type", Number)
], ActualizarFabricaDto.prototype, "latitud", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Longitud de la fábrica', example: -66.9036 }),
    __metadata("design:type", Number)
], ActualizarFabricaDto.prototype, "longitud", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Indica si la fábrica está activa', example: true }),
    __metadata("design:type", Boolean)
], ActualizarFabricaDto.prototype, "activo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Descripción opcional', example: 'Fábrica de carga principal' }),
    __metadata("design:type", Object)
], ActualizarFabricaDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Dirección física opcional', example: 'Zona Industrial La Yaguara' }),
    __metadata("design:type", Object)
], ActualizarFabricaDto.prototype, "direccion", void 0);
//# sourceMappingURL=actualizar-fabrica.dto.js.map