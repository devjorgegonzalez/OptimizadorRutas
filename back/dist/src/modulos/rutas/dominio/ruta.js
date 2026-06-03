"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RutaCamion = exports.PuntoRuta = void 0;
class PuntoRuta {
    id;
    rutaCamionId;
    orden;
    tipoPunto;
    latitud;
    longitud;
    descripcion;
    creadoEn;
    actualizadoEn;
    constructor(id, rutaCamionId, orden, tipoPunto, latitud, longitud, descripcion, creadoEn, actualizadoEn) {
        this.id = id;
        this.rutaCamionId = rutaCamionId;
        this.orden = orden;
        this.tipoPunto = tipoPunto;
        this.latitud = latitud;
        this.longitud = longitud;
        this.descripcion = descripcion;
        this.creadoEn = creadoEn;
        this.actualizadoEn = actualizadoEn;
    }
}
exports.PuntoRuta = PuntoRuta;
class RutaCamion {
    id;
    camionId;
    puntos;
    creadoEn;
    actualizadoEn;
    constructor(id, camionId, puntos, creadoEn, actualizadoEn) {
        this.id = id;
        this.camionId = camionId;
        this.puntos = puntos;
        this.creadoEn = creadoEn;
        this.actualizadoEn = actualizadoEn;
    }
}
exports.RutaCamion = RutaCamion;
//# sourceMappingURL=ruta.js.map