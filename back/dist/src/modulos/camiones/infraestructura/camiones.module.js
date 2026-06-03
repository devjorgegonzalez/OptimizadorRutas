"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CamionesModule = void 0;
const common_1 = require("@nestjs/common");
const camion_repository_1 = require("../dominio/camion.repository");
const prisma_camion_repository_1 = require("./prisma-camion.repository");
const crear_camion_use_case_1 = require("../aplicacion/crear-camion.use-case");
const actualizar_camion_use_case_1 = require("../aplicacion/actualizar-camion.use-case");
const listar_camiones_use_case_1 = require("../aplicacion/listar-camiones.use-case");
const obtener_camion_use_case_1 = require("../aplicacion/obtener-camion.use-case");
const eliminar_camion_use_case_1 = require("../aplicacion/eliminar-camion.use-case");
const camiones_controller_1 = require("../interfaz/camiones.controller");
let CamionesModule = class CamionesModule {
};
exports.CamionesModule = CamionesModule;
exports.CamionesModule = CamionesModule = __decorate([
    (0, common_1.Module)({
        controllers: [camiones_controller_1.CamionesController],
        providers: [
            {
                provide: camion_repository_1.CAMION_REPOSITORY,
                useClass: prisma_camion_repository_1.PrismaCamionRepository,
            },
            crear_camion_use_case_1.CrearCamionUseCase,
            actualizar_camion_use_case_1.ActualizarCamionUseCase,
            listar_camiones_use_case_1.ListarCamionesUseCase,
            obtener_camion_use_case_1.ObtenerCamionUseCase,
            eliminar_camion_use_case_1.EliminarCamionUseCase,
        ],
        exports: [
            crear_camion_use_case_1.CrearCamionUseCase,
            actualizar_camion_use_case_1.ActualizarCamionUseCase,
            listar_camiones_use_case_1.ListarCamionesUseCase,
            obtener_camion_use_case_1.ObtenerCamionUseCase,
            eliminar_camion_use_case_1.EliminarCamionUseCase,
        ],
    })
], CamionesModule);
//# sourceMappingURL=camiones.module.js.map