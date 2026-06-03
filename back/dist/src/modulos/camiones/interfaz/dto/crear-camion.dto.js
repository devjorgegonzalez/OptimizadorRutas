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
exports.CrearCamionDto = exports.UbicacionDto = exports.CrearCamionSchema = exports.UbicacionSchema = void 0;
const swagger_1 = require("@nestjs/swagger");
const zod_1 = require("zod");
exports.UbicacionSchema = zod_1.z.object({
    latitud: zod_1.z.coerce.number().min(-90).max(90, { message: 'La latitud debe estar entre -90 y 90' }),
    longitud: zod_1.z.coerce.number().min(-180).max(180, { message: 'La longitud debe estar entre -180 y 180' }),
});
exports.CrearCamionSchema = zod_1.z.object({
    placa: zod_1.z.string().min(1, { message: 'La placa es requerida' }).max(20),
    capacidad: zod_1.z.coerce.number().positive({ message: 'La capacidad debe ser mayor a cero' }),
    puntoOrigen: exports.UbicacionSchema,
    ultimaUbicacion: exports.UbicacionSchema,
});
class UbicacionDto {
    latitud;
    longitud;
}
exports.UbicacionDto = UbicacionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Latitud de la ubicación', example: 10.2522 }),
    __metadata("design:type", Number)
], UbicacionDto.prototype, "latitud", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Longitud de la ubicación', example: -67.6015 }),
    __metadata("design:type", Number)
], UbicacionDto.prototype, "longitud", void 0);
class CrearCamionDto {
    placa;
    capacidad;
    puntoOrigen;
    ultimaUbicacion;
}
exports.CrearCamionDto = CrearCamionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Placa única del camión', example: 'AB123CD' }),
    __metadata("design:type", String)
], CrearCamionDto.prototype, "placa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Capacidad máxima de carga', example: 15.5 }),
    __metadata("design:type", Number)
], CrearCamionDto.prototype, "capacidad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Punto de origen / última ubicación seleccionada', type: UbicacionDto }),
    __metadata("design:type", UbicacionDto)
], CrearCamionDto.prototype, "puntoOrigen", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Última ubicación conocida', type: UbicacionDto }),
    __metadata("design:type", UbicacionDto)
], CrearCamionDto.prototype, "ultimaUbicacion", void 0);
//# sourceMappingURL=crear-camion.dto.js.map