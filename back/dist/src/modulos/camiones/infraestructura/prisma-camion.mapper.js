"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCamionMapper = void 0;
const camion_1 = require("../dominio/camion");
class PrismaCamionMapper {
    static toDomain(prismaCamion) {
        return new camion_1.Camion(prismaCamion.id, prismaCamion.placa, prismaCamion.capacidad, { latitud: prismaCamion.latitudOrigen, longitud: prismaCamion.longitudOrigen }, { latitud: prismaCamion.latitudUltima, longitud: prismaCamion.longitudUltima }, prismaCamion.creadoEn, prismaCamion.actualizadoEn);
    }
}
exports.PrismaCamionMapper = PrismaCamionMapper;
//# sourceMappingURL=prisma-camion.mapper.js.map