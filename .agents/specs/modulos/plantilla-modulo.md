# Plantilla de modulo

## Proposito
Describe el objetivo del modulo y el problema de negocio que resuelve dentro de OptimizadorRutas.

## Alcance
- Que incluye este modulo.
- Que no incluye este modulo.
- Con que otros modulos se relaciona.

## Regla de uso
- Los nombres de clases, metodos, rutas, DTOs y componentes deben estar en castellano.
- El modulo debe seguir DDD.
- Todo debe estar documentado.
- Debe definirse antes de implementar codigo.

## Estructura sugerida
```text
modulos/
  nombre-del-modulo/
    dominio/
    aplicacion/
    infraestructura/
    interfaz/
    pruebas/
```

## Secciones que debe tener el modulo
### Contexto de negocio
Explica la necesidad real del modulo.

### Entidades del dominio
Lista las entidades principales y sus valores relevantes.

### Casos de uso
Lista las acciones que el modulo soporta.

### Reglas de negocio
Enumera las restricciones y validaciones importantes.

### Contratos de entrada y salida
Define los datos que recibe y produce el modulo.

### Persistencia
Indica como se guardan los datos y que tecnologia se usa.

### API o interfaz
Define endpoints, vistas o eventos expuestos.

### Criterios de aceptacion
Define como se valida que el modulo esta completo.

---

# Ejemplo de modulo

## Nombre del modulo
Gestion de camiones

## Proposito
Permitir registrar y consultar los camiones de la flota para que luego puedan ser usados en la optimizacion de rutas.

## Alcance
- Incluye el registro, edicion, consulta y eliminacion de camiones.
- Incluye la ultima ubicacion conocida de cada camion.
- No calcula rutas optimas.
- Se relaciona con los modulos de fabricas, clientes y optimizacion de rutas.

## Estructura sugerida
```text
modulos/
  gestion-de-camiones/
    dominio/
      camion.ts
      ubicacion-camion.ts
    aplicacion/
      crear-camion.use-case.ts
      actualizar-camion.use-case.ts
      listar-camiones.use-case.ts
    infraestructura/
      camion.repository.ts
      prisma-camion.repository.ts
    interfaz/
      camion.controller.ts
      camion.dto.ts
    pruebas/
      camion.spec.ts
```

## Entidades del dominio
- Camion
- UbicacionCamion

## Casos de uso
- Crear camion.
- Actualizar camion.
- Obtener camion por id.
- Listar camiones.
- Eliminar camion.

## Reglas de negocio
- La placa debe ser unica.
- Un camion debe tener una ultima ubicacion registrada.
- La capacidad debe ser mayor que cero.

## Contratos de entrada y salida
### Entrada
- placa: string
- capacidad: number
- ultimaUbicacion: objeto con latitud y longitud

### Salida
- camion creado correctamente
- camion actualizado correctamente
- error de validacion
- error por placa duplicada

## Persistencia
- Base de datos: Postgres.
- Acceso a datos: Prisma.

## API o interfaz
- `POST /camiones`
- `GET /camiones`
- `GET /camiones/:id`
- `PUT /camiones/:id`
- `DELETE /camiones/:id`

## Criterios de aceptacion
- Se puede crear un camion con placa unica.
- Se puede consultar la lista de camiones.
- Las validaciones se ejecutan antes de guardar.
- El modulo respeta la estructura definida.
