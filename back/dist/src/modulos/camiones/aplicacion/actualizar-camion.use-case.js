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
exports.ActualizarCamionUseCase = void 0;
const common_1 = require("@nestjs/common");
const camion_repository_1 = require("../dominio/camion.repository");
let ActualizarCamionUseCase = class ActualizarCamionUseCase {
    camionRepository;
    constructor(camionRepository) {
        this.camionRepository = camionRepository;
    }
    async ejecutar(id, datos) {
        const camion = await this.camionRepository.obtenerPorId(id);
        if (!camion) {
            throw new common_1.NotFoundException(`No existe el camión con ID: ${id}`);
        }
        if (datos.capacidad !== undefined && datos.capacidad <= 0) {
            throw new common_1.BadRequestException('La capacidad debe ser mayor a cero.');
        }
        if (datos.placa) {
            const placaLimpia = datos.placa.trim().toUpperCase();
            if (placaLimpia !== camion.placa) {
                const camionExistente = await this.camionRepository.obtenerPorPlaca(placaLimpia);
                if (camionExistente) {
                    throw new common_1.ConflictException(`Ya existe otro camión registrado con la placa: ${placaLimpia}`);
                }
                datos.placa = placaLimpia;
            }
        }
        return this.camionRepository.actualizar(id, datos);
    }
};
exports.ActualizarCamionUseCase = ActualizarCamionUseCase;
exports.ActualizarCamionUseCase = ActualizarCamionUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(camion_repository_1.CAMION_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ActualizarCamionUseCase);
//# sourceMappingURL=actualizar-camion.use-case.js.map