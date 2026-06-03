import { Inject, Injectable } from '@nestjs/common';
import { RUTA_CAMION_REPOSITORY } from '../dominio/ruta.repository';
import type { RutaCamionRepository } from '../dominio/ruta.repository';
import { ListarCamionesUseCase } from '../../camiones/aplicacion/listar-camiones.use-case';
import { ListarClientesUseCase } from '../../clientes/aplicacion/listar-clientes.use-case';
import { ListarFabricasUseCase } from '../../fabricas/aplicacion/listar-fabricas.use-case';
import { RutaCamion, PuntoRuta } from '../dominio/ruta';

@Injectable()
export class GenerarRutasUseCase {
  constructor(
    @Inject(RUTA_CAMION_REPOSITORY)
    private readonly repository: RutaCamionRepository,
    private readonly listarCamionesUseCase: ListarCamionesUseCase,
    private readonly listarClientesUseCase: ListarClientesUseCase,
    private readonly listarFabricasUseCase: ListarFabricasUseCase,
  ) {}

  async ejecutar(): Promise<RutaCamion[]> {
    // 1. Obtener todas las rutas existentes para saber qué camiones ya tienen ruta
    const rutasExistentes = await this.repository.listarTodas();
    const camionesConRutaIds = new Set(rutasExistentes.map(r => r.camionId));

    // 2. Obtener todos los camiones, clientes y fábricas
    const camiones = await this.listarCamionesUseCase.ejecutar();
    const clientes = await this.listarClientesUseCase.ejecutar();
    const fabricas = await this.listarFabricasUseCase.ejecutar();

    // 3. Filtrar camiones sin ruta, clientes activos y fábricas activas
    const camionesSinRuta = camiones.filter(c => !camionesConRutaIds.has(c.id));
    const clientesActivos = clientes.filter(c => c.activo);
    const fabricasActivas = fabricas.filter(f => f.activo);

    if (camionesSinRuta.length === 0 || clientesActivos.length === 0 || fabricasActivas.length === 0) {
      return [];
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const projectId = process.env.GOOGLE_PROJECT_ID || 'optimizador-rutas';

    let rutasGeneradas: RutaCamion[] = [];
    let googleMapsFailed = true;

    if (apiKey && apiKey !== 'undefined') {
      try {
        // Intentar usar Google Routes Optimization API
        // Mapear fábricas más cercanas a cada cliente para definir envíos (shipments)
        const shipments = clientesActivos.map(c => {
          // Buscar fábrica activa más cercana a este cliente
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
          // Parsear y guardar las rutas devueltas por Google
          for (const route of data.routes) {
            const vehicleIdx = route.vehicleIndex || 0;
            const camion = camionesSinRuta[vehicleIdx];
            if (!camion) continue;

            const puntos: any[] = [];
            
            // Punto 0: Origen
            puntos.push({
              orden: 0,
              tipoPunto: 'ORIGEN',
              latitud: camion.ultimaUbicacion.latitud,
              longitud: camion.ultimaUbicacion.longitud,
              descripcion: 'Ubicación actual del camión'
            });

            // Visitas del camión
            if (route.visits) {
              route.visits.forEach((visit: any) => {
                const shipmentIdx = visit.shipmentIndex || 0;
                const shipment = shipments[shipmentIdx];
                if (!shipment) return;

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
                } else {
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
      } catch (err: any) {
        console.warn('Google Route Optimization API failed, falling back to local heuristic. Error:', err.message);
        googleMapsFailed = true;
      }
    }

    if (googleMapsFailed) {
      // Fallback local: Heurística del Vecino Más Cercano (Nearest Neighbor)
      // Distribuir de forma balanceada los clientes entre los camiones sin ruta
      const truckClients: typeof clientesActivos[] = Array.from({ length: camionesSinRuta.length }, () => []);
      
      clientesActivos.forEach((cliente, idx) => {
        const truckIdx = idx % camionesSinRuta.length;
        truckClients[truckIdx].push(cliente);
      });

      for (let i = 0; i < camionesSinRuta.length; i++) {
        const camion = camionesSinRuta[i];
        const clientsForTruck = truckClients[i];
        if (clientsForTruck.length === 0) continue;

        const puntos: any[] = [];

        // 1. Origen
        puntos.push({
          orden: 0,
          tipoPunto: 'ORIGEN',
          latitud: camion.ultimaUbicacion.latitud,
          longitud: camion.ultimaUbicacion.longitud,
          descripcion: 'Ubicación actual del camión'
        });

        // 2. Buscar la fábrica activa más cercana a la ubicación actual del camión
        let closestFabrica = fabricasActivas[0];
        let minDistFabrica = this.calcularDistancia(
          camion.ultimaUbicacion.latitud,
          camion.ultimaUbicacion.longitud,
          closestFabrica.latitud,
          closestFabrica.longitud
        );

        for (const f of fabricasActivas) {
          const d = this.calcularDistancia(
            camion.ultimaUbicacion.latitud,
            camion.ultimaUbicacion.longitud,
            f.latitud,
            f.longitud
          );
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

        // 3. Ordenar clientes asignados por cercanía geográfica usando Vecino Más Cercano
        let currentLat = closestFabrica.latitud;
        let currentLng = closestFabrica.longitud;
        const unvisitedClients = [...clientsForTruck];

        while (unvisitedClients.length > 0) {
          let closestClientIdx = 0;
          let minDistClient = this.calcularDistancia(
            currentLat,
            currentLng,
            unvisitedClients[0].latitud,
            unvisitedClients[0].longitud
          );

          for (let k = 1; k < unvisitedClients.length; k++) {
            const d = this.calcularDistancia(
              currentLat,
              currentLng,
              unvisitedClients[k].latitud,
              unvisitedClients[k].longitud
            );
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

        // Guardar la ruta en la base de datos
        const nuevaRuta = await this.repository.guardar(camion.id, puntos);
        rutasGeneradas.push(nuevaRuta);
      }
    }

    return rutasGeneradas;
  }

  private calcularDistancia(lat1: number, lng1: number, lat2: number, lng2: number): number {
    return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lng1 - lng2, 2));
  }
}
