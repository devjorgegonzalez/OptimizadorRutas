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
exports.PrismaRutaCamionRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const prisma_ruta_mapper_1 = require("./prisma-ruta.mapper");
let PrismaRutaCamionRepository = class PrismaRutaCamionRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async guardar(camionId, puntos) {
        const nuevaRuta = await this.prisma.$transaction(async (tx) => {
            await tx.rutaCamion.deleteMany({
                where: { camionId },
            });
            const creada = await tx.rutaCamion.create({
                data: {
                    camionId,
                    puntos: {
                        create: puntos.map(p => ({
                            orden: p.orden,
                            tipoPunto: p.tipoPunto,
                            latitud: p.latitud,
                            longitud: p.longitud,
                            descripcion: p.descripcion,
                        })),
                    },
                },
                include: {
                    puntos: true,
                },
            });
            return creada;
        });
        return prisma_ruta_mapper_1.PrismaRutaCamionMapper.toDomain(nuevaRuta);
    }
    async obtenerPorCamionId(camionId) {
        const ruta = await this.prisma.rutaCamion.findUnique({
            where: { camionId },
            include: {
                puntos: true,
            },
        });
        if (!ruta)
            return null;
        return prisma_ruta_mapper_1.PrismaRutaCamionMapper.toDomain(ruta);
    }
    async eliminar(camionId) {
        await this.prisma.rutaCamion.deleteMany({
            where: { camionId },
        });
    }
    async listarTodas() {
        const rutas = await this.prisma.rutaCamion.findMany({
            include: {
                puntos: true,
            },
        });
        return rutas.map(prisma_ruta_mapper_1.PrismaRutaCamionMapper.toDomain);
    }
};
exports.PrismaRutaCamionRepository = PrismaRutaCamionRepository;
exports.PrismaRutaCamionRepository = PrismaRutaCamionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaRutaCamionRepository);
//# sourceMappingURL=prisma-ruta.repository.js.map