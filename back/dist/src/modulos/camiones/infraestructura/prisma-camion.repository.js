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
exports.PrismaCamionRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const prisma_camion_mapper_1 = require("./prisma-camion.mapper");
let PrismaCamionRepository = class PrismaCamionRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async crear(camion) {
        const nuevoCamion = await this.prisma.camion.create({
            data: {
                placa: camion.placa,
                capacidad: camion.capacidad,
                latitudOrigen: camion.puntoOrigen.latitud,
                longitudOrigen: camion.puntoOrigen.longitud,
                latitudUltima: camion.ultimaUbicacion.latitud,
                longitudUltima: camion.ultimaUbicacion.longitud,
            },
        });
        return prisma_camion_mapper_1.PrismaCamionMapper.toDomain(nuevoCamion);
    }
    async actualizar(id, camion) {
        const data = {};
        if (camion.placa !== undefined)
            data.placa = camion.placa;
        if (camion.capacidad !== undefined)
            data.capacidad = camion.capacidad;
        if (camion.puntoOrigen !== undefined) {
            data.latitudOrigen = camion.puntoOrigen.latitud;
            data.longitudOrigen = camion.puntoOrigen.longitud;
        }
        if (camion.ultimaUbicacion !== undefined) {
            data.latitudUltima = camion.ultimaUbicacion.latitud;
            data.longitudUltima = camion.ultimaUbicacion.longitud;
        }
        const camionActualizado = await this.prisma.camion.update({
            where: { id },
            data,
        });
        return prisma_camion_mapper_1.PrismaCamionMapper.toDomain(camionActualizado);
    }
    async obtenerPorId(id) {
        const camion = await this.prisma.camion.findUnique({
            where: { id },
        });
        return camion ? prisma_camion_mapper_1.PrismaCamionMapper.toDomain(camion) : null;
    }
    async obtenerPorPlaca(placa) {
        const camion = await this.prisma.camion.findUnique({
            where: { placa },
        });
        return camion ? prisma_camion_mapper_1.PrismaCamionMapper.toDomain(camion) : null;
    }
    async listar(filtroPlaca) {
        const camiones = await this.prisma.camion.findMany({
            where: filtroPlaca
                ? {
                    placa: {
                        contains: filtroPlaca,
                        mode: 'insensitive',
                    },
                }
                : {},
            orderBy: { creadoEn: 'desc' },
        });
        return camiones.map(prisma_camion_mapper_1.PrismaCamionMapper.toDomain);
    }
    async eliminar(id) {
        await this.prisma.camion.delete({
            where: { id },
        });
    }
};
exports.PrismaCamionRepository = PrismaCamionRepository;
exports.PrismaCamionRepository = PrismaCamionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaCamionRepository);
//# sourceMappingURL=prisma-camion.repository.js.map