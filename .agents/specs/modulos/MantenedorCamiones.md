## Nombre del modulo

Gestion de camiones

## Proposito

Permitir registrar y consultar los camiones de la flota para que luego puedan ser usados en la optimizacion de rutas.

## Alcance

- Incluye el registro, edicion, consulta y eliminacion de camiones.
- Para consultar debe haber un filtro por placa de camion.
- Incluye la ultima ubicacion conocida de cada camion.
- No calcula rutas optimas.
- Se relaciona con los modulos de fabricas, clientes y optimizacion de rutas.

## Estructura sugerida

Lo recomendado por Domain Driven Design en Front y Back

## Entidades del dominio

- Camion
- UbicacionCamion

## Casos de uso

- Crear camion.
- Actualizar camion.
- Obtener camion por id.
- Listar camiones.
- Filtrar camiones.
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
