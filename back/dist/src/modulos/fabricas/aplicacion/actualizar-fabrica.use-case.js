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
exports.ActualizarFabricaUseCase = void 0;
const common_1 = require("@nestjs/common");
const fabrica_repository_1 = require("../dominio/fabrica.repository");
let ActualizarFabricaUseCase = class ActualizarFabricaUseCase {
    fabricaRepository;
    constructor(fabricaRepository) {
        this.fabricaRepository = fabricaRepository;
    }
    async ejecutar(id, datos) {
        const fabrica = await this.fabricaRepository.obtenerPorId(id);
        if (!fabrica) {
            throw new common_1.NotFoundException(`No existe la fábrica con ID: ${id}`);
        }
        if (datos.nombre) {
            const nombreLimpio = datos.nombre.trim();
            if (nombreLimpio !== fabrica.nombre) {
                const existente = await this.fabricaRepository.obtenerPorNombre(nombreLimpio);
                if (existente) {
                    throw new common_1.ConflictException(`Ya existe otra fábrica registrada con el nombre: ${nombreLimpio}`);
                }
                datos.nombre = nombreLimpio;
            }
        }
        return this.fabricaRepository.actualizar(id, datos);
    }
};
exports.ActualizarFabricaUseCase = ActualizarFabricaUseCase;
exports.ActualizarFabricaUseCase = ActualizarFabricaUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(fabrica_repository_1.FABRICA_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ActualizarFabricaUseCase);
//# sourceMappingURL=actualizar-fabrica.use-case.js.map