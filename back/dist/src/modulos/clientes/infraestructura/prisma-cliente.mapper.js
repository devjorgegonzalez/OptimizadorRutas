"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaClienteMapper = void 0;
const cliente_1 = require("../dominio/cliente");
class PrismaClienteMapper {
    static toDomain(prismaCliente) {
        return new cliente_1.Cliente(prismaCliente.id, prismaCliente.nombre, prismaCliente.latitud, prismaCliente.longitud, prismaCliente.activo, prismaCliente.creadoEn, prismaCliente.actualizadoEn, prismaCliente.descripcion, prismaCliente.direccion);
    }
}
exports.PrismaClienteMapper = PrismaClienteMapper;
//# sourceMappingURL=prisma-cliente.mapper.js.map