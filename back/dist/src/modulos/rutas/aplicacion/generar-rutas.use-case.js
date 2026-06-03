"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerarRutasUseCase = void 0;
const common_1 = require("@nestjs/common");
const ruta_repository_1 = require("../dominio/ruta.repository");
const listar_camiones_use_case_1 = require("../../camiones/aplicacion/listar-camiones.use-case");
const listar_clientes_use_case_1 = require("../../clientes/aplicacion/listar-clientes.use-case");
const listar_fabricas_use_case_1 = require("../../fabricas/aplicacion/listar-fabricas.use-case");
let GenerarRutasUseCase = class GenerarRutasUseCase {
    repository;
    listarCamionesUseCase;
    listarClientesUseCase;
    listarFabricasUseCase;
    constructor(repository, listarCamionesUseCase, listarClientesUseCase, listarFabricasUseCase) {
        this.repository = repository;
        this.listarCamionesUseCase = listarCamionesUseCase;
        this.listarClientesUseCase = listarClientesUseCase;
        this.listarFabricasUseCase = listarFabricasUseCase;
    }
    async ejecutar() {
        const rutasExistentes = await this.repository.listarTodas();
        const camionesConRutaIds = new Set(rutasExistentes.map(r => r.camionId));
        const camiones = await this.listarCamionesUseCase.ejecutar();
        const clientes = await this.listarClientesUseCase.ejecutar();
        const fabricas = await this.listarFabricasUseCase.ejecutar();
        const camionesSinRuta = camiones.filter(c => !camionesConRutaIds.has(c.id));
        const clientesActivos = clientes.filter(c => c.activo);
        const fabricasActivas = fabricas.filter(f => f.activo);
        if (camionesSinRuta.length === 0 || clientesActivos.length === 0 || fabricasActivas.length === 0) {
            return [];
        }
        const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        const projectId = process.env.GOOGLE_PROJECT_ID || 'optimizador-rutas';
        let rutasGeneradas = [];
        let googleMapsFailed = true;
        if (apiKey && apiKey !== 'undefined') {
            try {
                const shipments = clientesActivos.map(c => {
                    let closestFabrica = fabricasActivas[0];
                    let minDist = this.calcularDistancia(closestFabrica.latitud, closestFabrica.longitud, c.latitud, c.longitud);
                    for (const f of fabricasActivas) {
                        const d = this.calcularDistancia(f.latitud, f.longitud, c.latitud, c.longitud);
                        if (d < minDist) {
                            minDist = d;
                            closestFabrica = f;
                        }
                    }
                    return {
                        pickups: [{
                                arrivalLocation: { latitude: closestFabrica.latitud, longitude: closestFabrica.longitud }
                            }],
                        deliveries: [{
                                arrivalLocation: { latitude: c.latitud, longitude: c.longitud }
                            }],
                        label: `${closestFabrica.id}_to_${c.id}`
                    };
                });
                const vehicles = camionesSinRuta.map(t => ({
                    startLocation: { latitude: t.ultimaUbicacion.latitud, longitude: t.ultimaUbicacion.longitud },
                    endLocation: { latitude: t.puntoOrigen.latitud, longitude: t.puntoOrigen.longitud }
                }));
                const requestBody = {
                    model: {
                        shipments,
                        vehicles,
                    },
                    solvingMode: 'DEFAULT_SOLVE'
                };
                const url = `https://routeoptimization.googleapis.com/v1/projects/${projectId}:optimizeTours?key=${apiKey}`;
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });
                if (!response.ok) {
                    const errText = await response.text();
                    throw new Error(`Google API returned status ${response.status}: ${errText}`);
                }
                const data = await response.json();
                if (data.routes && data.routes.length > 0) {
                    for (const route of data.routes) {
                        const vehicleIdx = route.vehicleIndex || 0;
                        const camion = camionesSinRuta[vehicleIdx];
                        if (!camion)
                            continue;
                        const puntos = [];
                        puntos.push({
                            orden: 0,
                            tipoPunto: 'ORIGEN',
                            latitud: camion.ultimaUbicacion.latitud,
                            longitud: camion.ultimaUbicacion.longitud,
                            descripcion: 'Ubicación actual del camión'
                        });
                        if (route.visits) {
                            route.visits.forEach((visit) => {
                                const shipmentIdx = visit.shipmentIndex || 0;
                                const shipment = shipments[shipmentIdx];
                                if (!shipment)
                                    return;
                                const isPickup = visit.isPickup;
                                const labelParts = shipment.label.split('_to_');
                                const fabricaId = Number(labelParts[0]);
                                const clienteId = Number(labelParts[1]);
                                if (isPickup) {
                                    const fabrica = fabricasActivas.find(f => f.id === fabricaId);
                                    puntos.push({
                                        orden: puntos.length,
                                        tipoPunto: 'FABRICA',
                                        latitud: shipment.pickups[0].arrivalLocation.latitude,
                                        longitud: shipment.pickups[0].arrivalLocation.longitude,
                                        descripcion: fabrica ? fabrica.nombre : 'Planta de carga'
                                    });
                                }
                                else {
                                    const cliente = clientesActivos.find(c => c.id === clienteId);
                                    puntos.push({
                                        orden: puntos.length,
                                        tipoPunto: 'CLIENTE',
                                        latitud: shipment.deliveries[0].arrivalLocation.latitude,
                                        longitud: shipment.deliveries[0].arrivalLocation.longitude,
                                        descripcion: cliente ? cliente.nombre : 'Ubicación del cliente'
                                    });
                                }
                            });
                        }
                        const nuevaRuta = await this.repository.guardar(camion.id, puntos);
                        rutasGeneradas.push(nuevaRuta);
                    }
                    googleMapsFailed = false;
                }
            }
            catch (err) {
                console.warn('Google Route Optimization API failed, falling back to local heuristic. Error:', err.message);
                googleMapsFailed = true;
            }
        }
        if (googleMapsFailed) {
            const truckClients = Array.from({ length: camionesSinRuta.length }, () => []);
            clientesActivos.forEach((cliente, idx) => {
                const truckIdx = idx % camionesSinRuta.length;
                truckClients[truckIdx].push(cliente);
            });
            for (let i = 0; i < camionesSinRuta.length; i++) {
                const camion = camionesSinRuta[i];
                const clientsForTruck = truckClients[i];
                if (clientsForTruck.length === 0)
                    continue;
                const puntos = [];
                puntos.push({
                    orden: 0,
                    tipoPunto: 'ORIGEN',
                    latitud: camion.ultimaUbicacion.latitud,
                    longitud: camion.ultimaUbicacion.longitud,
                    descripcion: 'Ubicación actual del camión'
                });
                let closestFabrica = fabricasActivas[0];
                let minDistFabrica = this.calcularDistancia(camion.ultimaUbicacion.latitud, camion.ultimaUbicacion.longitud, closestFabrica.latitud, closestFabrica.longitud);
                for (const f of fabricasActivas) {
                    const d = this.calcularDistancia(camion.ultimaUbicacion.latitud, camion.ultimaUbicacion.longitud, f.latitud, f.longitud);
                    if (d < minDistFabrica) {
                        minDistFabrica = d;
                        closestFabrica = f;
                    }
                }
                puntos.push({
                    orden: 1,
                    tipoPunto: 'FABRICA',
                    latitud: closestFabrica.latitud,
                    longitud: closestFabrica.longitud,
                    descripcion: closestFabrica.nombre
                });
                let currentLat = closestFabrica.latitud;
                let currentLng = closestFabrica.longitud;
                const unvisitedClients = [...clientsForTruck];
                while (unvisitedClients.length > 0) {
                    let closestClientIdx = 0;
                    let minDistClient = this.calcularDistancia(currentLat, currentLng, unvisitedClients[0].latitud, unvisitedClients[0].longitud);
                    for (let k = 1; k < unvisitedClients.length; k++) {
                        const d = this.calcularDistancia(currentLat, currentLng, unvisitedClients[k].latitud, unvisitedClients[k].longitud);
                        if (d < minDistClient) {
                            minDistClient = d;
                            closestClientIdx = k;
                        }
                    }
                    const nextClient = unvisitedClients.splice(closestClientIdx, 1)[0];
                    puntos.push({
                        orden: puntos.length,
                        tipoPunto: 'CLIENTE',
                        latitud: nextClient.latitud,
                        longitud: nextClient.longitud,
                        descripcion: nextClient.nombre
                    });
                    currentLat = nextClient.latitud;
                    currentLng = nextClient.longitud;
                }
                const nuevaRuta = await this.repository.guardar(camion.id, puntos);
                rutasGeneradas.push(nuevaRuta);
            }
        }
        return rutasGeneradas;
    }
    calcularDistancia(lat1, lng1, lat2, lng2) {
        return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lng1 - lng2, 2));
    }
};
exports.GenerarRutasUseCase = GenerarRutasUseCase;
exports.GenerarRutasUseCase = GenerarRutasUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(ruta_repository_1.RUTA_CAMION_REPOSITORY)),
    __metadata("design:paramtypes", [Object, listar_camiones_use_case_1.ListarCamionesUseCase,
        listar_clientes_use_case_1.ListarClientesUseCase,
        listar_fabricas_use_case_1.ListarFabricasUseCase])
], GenerarRutasUseCase);
//# sourceMappingURL=generar-rutas.use-case.js.map