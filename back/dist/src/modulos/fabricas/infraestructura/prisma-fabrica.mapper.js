"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaFabricaMapper = void 0;
const fabrica_1 = require("../dominio/fabrica");
class PrismaFabricaMapper {
    static toDomain(prismaFabrica) {
        return new fabrica_1.Fabrica(prismaFabrica.id, prismaFabrica.nombre, prismaFabrica.latitud, prismaFabrica.longitud, prismaFabrica.activo, prismaFabrica.creadoEn, prismaFabrica.actualizadoEn, prismaFabrica.descripcion, prismaFabrica.direccion);
    }
}
exports.PrismaFabricaMapper = PrismaFabricaMapper;
//# sourceMappingURL=prisma-fabrica.mapper.js.map