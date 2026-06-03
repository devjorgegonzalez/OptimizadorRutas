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
exports.ActualizarClienteUseCase = void 0;
const common_1 = require("@nestjs/common");
const cliente_repository_1 = require("../dominio/cliente.repository");
let ActualizarClienteUseCase = class ActualizarClienteUseCase {
    clienteRepository;
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    async ejecutar(id, datos) {
        const cliente = await this.clienteRepository.obtenerPorId(id);
        if (!cliente) {
            throw new common_1.NotFoundException(`No existe el cliente con ID: ${id}`);
        }
        if (datos.nombre) {
            const nombreLimpio = datos.nombre.trim();
            if (nombreLimpio !== cliente.nombre) {
                const clienteExistente = await this.clienteRepository.obtenerPorNombre(nombreLimpio);
                if (clienteExistente) {
                    throw new common_1.ConflictException(`Ya existe otro cliente registrado con el nombre: ${nombreLimpio}`);
                }
                datos.nombre = nombreLimpio;
            }
        }
        return this.clienteRepository.actualizar(id, datos);
    }
};
exports.ActualizarClienteUseCase = ActualizarClienteUseCase;
exports.ActualizarClienteUseCase = ActualizarClienteUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cliente_repository_1.CLIENTE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ActualizarClienteUseCase);
//# sourceMappingURL=actualizar-cliente.use-case.js.map