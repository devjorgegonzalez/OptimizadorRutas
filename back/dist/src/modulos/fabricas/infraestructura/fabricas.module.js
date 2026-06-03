"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FabricasModule = void 0;
const common_1 = require("@nestjs/common");
const fabrica_repository_1 = require("../dominio/fabrica.repository");
const prisma_fabrica_repository_1 = require("./prisma-fabrica.repository");
const crear_fabrica_use_case_1 = require("../aplicacion/crear-fabrica.use-case");
const actualizar_fabrica_use_case_1 = require("../aplicacion/actualizar-fabrica.use-case");
const listar_fabricas_use_case_1 = require("../aplicacion/listar-fabricas.use-case");
const obtener_fabrica_use_case_1 = require("../aplicacion/obtener-fabrica.use-case");
const eliminar_fabrica_use_case_1 = require("../aplicacion/eliminar-fabrica.use-case");
const fabricas_controller_1 = require("../interfaz/fabricas.controller");
let FabricasModule = class FabricasModule {
};
exports.FabricasModule = FabricasModule;
exports.FabricasModule = FabricasModule = __decorate([
    (0, common_1.Module)({
        controllers: [fabricas_controller_1.FabricasController],
        providers: [
            {
                provide: fabrica_repository_1.FABRICA_REPOSITORY,
                useClass: prisma_fabrica_repository_1.PrismaFabricaRepository,
            },
            crear_fabrica_use_case_1.CrearFabricaUseCase,
            actualizar_fabrica_use_case_1.ActualizarFabricaUseCase,
            listar_fabricas_use_case_1.ListarFabricasUseCase,
            obtener_fabrica_use_case_1.ObtenerFabricaUseCase,
            eliminar_fabrica_use_case_1.EliminarFabricaUseCase,
        ],
        exports: [
            crear_fabrica_use_case_1.CrearFabricaUseCase,
            actualizar_fabrica_use_case_1.ActualizarFabricaUseCase,
            listar_fabricas_use_case_1.ListarFabricasUseCase,
            obtener_fabrica_use_case_1.ObtenerFabricaUseCase,
            eliminar_fabrica_use_case_1.EliminarFabricaUseCase,
        ],
    })
], FabricasModule);
//# sourceMappingURL=fabricas.module.js.map