"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RutasModule = void 0;
const common_1 = require("@nestjs/common");
const ruta_repository_1 = require("../dominio/ruta.repository");
const prisma_ruta_repository_1 = require("./prisma-ruta.repository");
const obtener_ruta_use_case_1 = require("../aplicacion/obtener-ruta.use-case");
const eliminar_ruta_use_case_1 = require("../aplicacion/eliminar-ruta.use-case");
const generar_rutas_use_case_1 = require("../aplicacion/generar-rutas.use-case");
const rutas_controller_1 = require("../interfaz/rutas.controller");
const camiones_module_1 = require("../../camiones/infraestructura/camiones.module");
const clientes_module_1 = require("../../clientes/infraestructura/clientes.module");
const fabricas_module_1 = require("../../fabricas/infraestructura/fabricas.module");
let RutasModule = class RutasModule {
};
exports.RutasModule = RutasModule;
exports.RutasModule = RutasModule = __decorate([
    (0, common_1.Module)({
        imports: [
            camiones_module_1.CamionesModule,
            clientes_module_1.ClientesModule,
            fabricas_module_1.FabricasModule,
        ],
        controllers: [rutas_controller_1.RutasController],
        providers: [
            {
                provide: ruta_repository_1.RUTA_CAMION_REPOSITORY,
                useClass: prisma_ruta_repository_1.PrismaRutaCamionRepository,
            },
            obtener_ruta_use_case_1.ObtenerRutaCamionUseCase,
            eliminar_ruta_use_case_1.EliminarRutaCamionUseCase,
            generar_rutas_use_case_1.GenerarRutasUseCase,
        ],
        exports: [
            obtener_ruta_use_case_1.ObtenerRutaCamionUseCase,
            eliminar_ruta_use_case_1.EliminarRutaCamionUseCase,
            generar_rutas_use_case_1.GenerarRutasUseCase,
        ],
    })
], RutasModule);
//# sourceMappingURL=rutas.module.js.map