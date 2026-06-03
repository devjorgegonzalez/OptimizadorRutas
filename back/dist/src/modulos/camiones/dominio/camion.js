"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camion = void 0;
class Camion {
    id;
    placa;
    capacidad;
    puntoOrigen;
    ultimaUbicacion;
    creadoEn;
    actualizadoEn;
    constructor(id, placa, capacidad, puntoOrigen, ultimaUbicacion, creadoEn, actualizadoEn) {
        this.id = id;
        this.placa = placa;
        this.capacidad = capacidad;
        this.puntoOrigen = puntoOrigen;
        this.ultimaUbicacion = ultimaUbicacion;
        this.creadoEn = creadoEn;
        this.actualizadoEn = actualizadoEn;
    }
}
exports.Camion = Camion;
//# sourceMappingURL=camion.js.map