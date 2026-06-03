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
exports.PrismaClienteRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const prisma_cliente_mapper_1 = require("./prisma-cliente.mapper");
let PrismaClienteRepository = class PrismaClienteRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async crear(cliente) {
        const nuevo = await this.prisma.cliente.create({
            data: {
                nombre: cliente.nombre,
                latitud: cliente.latitud,
                longitud: cliente.longitud,
                activo: cliente.activo,
                descripcion: cliente.descripcion,
                direccion: cliente.direccion,
            },
        });
        return prisma_cliente_mapper_1.PrismaClienteMapper.toDomain(nuevo);
    }
    async actualizar(id, cliente) {
        const data = {};
        if (cliente.nombre !== undefined)
            data.nombre = cliente.nombre;
        if (cliente.latitud !== undefined)
            data.latitud = cliente.latitud;
        if (cliente.longitud !== undefined)
            data.longitud = cliente.longitud;
        if (cliente.activo !== undefined)
            data.activo = cliente.activo;
        if (cliente.descripcion !== undefined)
            data.descripcion = cliente.descripcion;
        if (cliente.direccion !== undefined)
            data.direccion = cliente.direccion;
        const actualizado = await this.prisma.cliente.update({
            where: { id },
            data,
        });
        return prisma_cliente_mapper_1.PrismaClienteMapper.toDomain(actualizado);
    }
    async obtenerPorId(id) {
        const cliente = await this.prisma.cliente.findUnique({
            where: { id },
        });
        return cliente ? prisma_cliente_mapper_1.PrismaClienteMapper.toDomain(cliente) : null;
    }
    async obtenerPorNombre(nombre) {
        const cliente = await this.prisma.cliente.findUnique({
            where: { nombre },
        });
        return cliente ? prisma_cliente_mapper_1.PrismaClienteMapper.toDomain(cliente) : null;
    }
    async listar(filtroNombre) {
        const clientes = await this.prisma.cliente.findMany({
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
        return clientes.map(prisma_cliente_mapper_1.PrismaClienteMapper.toDomain);
    }
    async eliminar(id) {
        await this.prisma.cliente.delete({
            where: { id },
        });
    }
};
exports.PrismaClienteRepository = PrismaClienteRepository;
exports.PrismaClienteRepository = PrismaClienteRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaClienteRepository);
//# sourceMappingURL=prisma-cliente.repository.js.map