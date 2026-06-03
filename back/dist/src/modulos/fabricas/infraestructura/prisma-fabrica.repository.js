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
exports.PrismaFabricaRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const prisma_fabrica_mapper_1 = require("./prisma-fabrica.mapper");
let PrismaFabricaRepository = class PrismaFabricaRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async crear(fabrica) {
        const nuevo = await this.prisma.fabrica.create({
            data: {
                nombre: fabrica.nombre,
                latitud: fabrica.latitud,
                longitud: fabrica.longitud,
                activo: fabrica.activo,
                descripcion: fabrica.descripcion,
                direccion: fabrica.direccion,
            },
        });
        return prisma_fabrica_mapper_1.PrismaFabricaMapper.toDomain(nuevo);
    }
    async actualizar(id, fabrica) {
        const data = {};
        if (fabrica.nombre !== undefined)
            data.nombre = fabrica.nombre;
        if (fabrica.latitud !== undefined)
            data.latitud = fabrica.latitud;
        if (fabrica.longitud !== undefined)
            data.longitud = fabrica.longitud;
        if (fabrica.activo !== undefined)
            data.activo = fabrica.activo;
        if (fabrica.descripcion !== undefined)
            data.descripcion = fabrica.descripcion;
        if (fabrica.direccion !== undefined)
            data.direccion = fabrica.direccion;
        const actualizado = await this.prisma.fabrica.update({
            where: { id },
            data,
        });
        return prisma_fabrica_mapper_1.PrismaFabricaMapper.toDomain(actualizado);
    }
    async obtenerPorId(id) {
        const fabrica = await this.prisma.fabrica.findUnique({
            where: { id },
        });
        return fabrica ? prisma_fabrica_mapper_1.PrismaFabricaMapper.toDomain(fabrica) : null;
    }
    async obtenerPorNombre(nombre) {
        const fabrica = await this.prisma.fabrica.findUnique({
            where: { nombre },
        });
        return fabrica ? prisma_fabrica_mapper_1.PrismaFabricaMapper.toDomain(fabrica) : null;
    }
    async listar(filtroNombre) {
        const fabricas = await this.prisma.fabrica.findMany({
            where: filtroNombre
                ? {
                    nombre: {
                        contains: filtroNombre,
                        mode: 'insensitive',
                    },
                }
                : {},
            orderBy: { creadoEn: 'desc' },
        });
        return fabricas.map(prisma_fabrica_mapper_1.PrismaFabricaMapper.toDomain);
    }
    async eliminar(id) {
        await this.prisma.fabrica.delete({
            where: { id },
        });
    }
};
exports.PrismaFabricaRepository = PrismaFabricaRepository;
exports.PrismaFabricaRepository = PrismaFabricaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaFabricaRepository);
//# sourceMappingURL=prisma-fabrica.repository.js.map