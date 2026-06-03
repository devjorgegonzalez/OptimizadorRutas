"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaRutaCamionMapper = void 0;
const ruta_1 = require("../dominio/ruta");
class PrismaRutaCamionMapper {
    static toDomain(ruta) {
        const puntos = (ruta.puntos || [])
            .map(p => new ruta_1.PuntoRuta(p.id, p.rutaCamionId, p.orden, p.tipoPunto, p.latitud, p.longitud, p.descripcion, p.creadoEn, p.actualizadoEn))
            .sort((a, b) => a.orden - b.orden);
        return new ruta_1.RutaCamion(ruta.id, ruta.camionId, puntos, ruta.creadoEn, ruta.actualizadoEn);
    }
}
exports.PrismaRutaCamionMapper = PrismaRutaCamionMapper;
//# sourceMappingURL=prisma-ruta.mapper.js.map