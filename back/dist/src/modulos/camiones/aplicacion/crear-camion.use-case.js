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
exports.CrearCamionUseCase = void 0;
const common_1 = require("@nestjs/common");
const camion_repository_1 = require("../dominio/camion.repository");
let CrearCamionUseCase = class CrearCamionUseCase {
    camionRepository;
    constructor(camionRepository) {
        this.camionRepository = camionRepository;
    }
    async ejecutar(datos) {
        if (!datos.placa || datos.placa.trim() === '') {
            throw new common_1.BadRequestException('La placa es obligatoria.');
        }
        if (datos.capacidad <= 0) {
            throw new common_1.BadRequestException('La capacidad debe ser mayor a cero.');
        }
        const camionExistente = await this.camionRepository.obtenerPorPlaca(datos.placa);
        if (camionExistente) {
            throw new common_1.ConflictException(`Ya existe un camión registrado con la placa: ${datos.placa}`);
        }
        return this.camionRepository.crear({
            placa: datos.placa.trim().toUpperCase(),
            capacidad: datos.capacidad,
            puntoOrigen: datos.puntoOrigen,
            ultimaUbicacion: datos.ultimaUbicacion,
        });
    }
};
exports.CrearCamionUseCase = CrearCamionUseCase;
exports.CrearCamionUseCase = CrearCamionUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(camion_repository_1.CAMION_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CrearCamionUseCase);
//# sourceMappingURL=crear-camion.use-case.js.map