"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
class Cliente {
    id;
    nombre;
    latitud;
    longitud;
    activo;
    creadoEn;
    actualizadoEn;
    descripcion;
    direccion;
    constructor(id, nombre, latitud, longitud, activo, creadoEn, actualizadoEn, descripcion, direccion) {
        this.id = id;
        this.nombre = nombre;
        this.latitud = latitud;
        this.longitud = longitud;
        this.activo = activo;
        this.creadoEn = creadoEn;
        this.actualizadoEn = actualizadoEn;
        this.descripcion = descripcion;
        this.direccion = direccion;
    }
}
exports.Cliente = Cliente;
//# sourceMappingURL=cliente.js.map