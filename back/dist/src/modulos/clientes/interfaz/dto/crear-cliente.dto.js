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
exports.CrearClienteDto = exports.CrearClienteSchema = void 0;
const swagger_1 = require("@nestjs/swagger");
const zod_1 = require("zod");
exports.CrearClienteSchema = zod_1.z.object({
    nombre: zod_1.z.string().min(1, { message: 'El nombre es requerido' }).max(100),
    latitud: zod_1.z.coerce.number().min(-90).max(90, { message: 'La latitud debe estar entre -90 y 90' }),
    longitud: zod_1.z.coerce.number().min(-180).max(180, { message: 'La longitud debe estar entre -180 y 180' }),
    activo: zod_1.z.boolean().default(true),
    descripcion: zod_1.z.string().max(255).optional().nullable(),
    direccion: zod_1.z.string().max(255).optional().nullable(),
});
class CrearClienteDto {
    nombre;
    latitud;
    longitud;
    activo;
    descripcion;
    direccion;
}
exports.CrearClienteDto = CrearClienteDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre del cliente', example: 'Supermercado Central Caracas' }),
    __metadata("design:type", String)
], CrearClienteDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Latitud del cliente', example: 10.4806 }),
    __metadata("design:type", Number)
], CrearClienteDto.prototype, "latitud", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Longitud del cliente', example: -66.9036 }),
    __metadata("design:type", Number)
], CrearClienteDto.prototype, "longitud", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indica si el cliente está activo', example: true, default: true }),
    __metadata("design:type", Boolean)
], CrearClienteDto.prototype, "activo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Descripción opcional', example: 'Cliente corporativo' }),
    __metadata("design:type", Object)
], CrearClienteDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Dirección física opcional', example: 'Av. Francisco de Miranda, Local 4' }),
    __metadata("design:type", Object)
], CrearClienteDto.prototype, "direccion", void 0);
//# sourceMappingURL=crear-cliente.dto.js.map