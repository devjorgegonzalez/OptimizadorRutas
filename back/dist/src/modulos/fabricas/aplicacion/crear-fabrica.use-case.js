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
exports.CrearFabricaUseCase = void 0;
const common_1 = require("@nestjs/common");
const fabrica_repository_1 = require("../dominio/fabrica.repository");
let CrearFabricaUseCase = class CrearFabricaUseCase {
    fabricaRepository;
    constructor(fabricaRepository) {
        this.fabricaRepository = fabricaRepository;
    }
    async ejecutar(datos) {
        if (!datos.nombre || datos.nombre.trim() === '') {
            throw new common_1.BadRequestException('El nombre de la fábrica es obligatorio.');
        }
        const existente = await this.fabricaRepository.obtenerPorNombre(datos.nombre);
        if (existente) {
            throw new common_1.ConflictException(`Ya existe una fábrica registrada con el nombre: ${datos.nombre}`);
        }
        return this.fabricaRepository.crear({
            nombre: datos.nombre.trim(),
            latitud: datos.latitud,
            longitud: datos.longitud,
            activo: datos.activo,
            descripcion: datos.descripcion || null,
            direccion: datos.direccion || null,
        });
    }
};
exports.CrearFabricaUseCase = CrearFabricaUseCase;
exports.CrearFabricaUseCase = CrearFabricaUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(fabrica_repository_1.FABRICA_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CrearFabricaUseCase);
//# sourceMappingURL=crear-fabrica.use-case.js.map