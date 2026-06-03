## Nombre del modulo

Gestion de camiones

## Proposito

Permitir consultar, crear, actualizar, eliminar los camiones de la flota para que luego puedan ser usados en la optimizacion de rutas. Al registrar o editar un camion, el usuario debe poder seleccionar su ultima ubicacion en un modal con Google Maps para dejarla guardada como punto de origen. Al eliminar un camion todas las rutas tambien se eliminaran.

## Alcance

- Incluye el registro, edicion, consulta y eliminacion de camiones.
- Para consultar debe haber un filtro por placa de camion.
- Incluye la ultima ubicacion conocida de cada camion seleccionada desde un modal con Google Maps.
- La ubicacion seleccionada se guarda como punto de origen del camion.
- No calcula rutas optimas.
- Se relaciona con los modulos de fabricas, clientes y optimizacion de rutas.

## Estructura sugerida

Lo recomendado por Domain Driven Design en Front y Back

## Ruta Front

/Mantenedores/Camiones

## Componentes del Front

    - Filtros: Se encarga de filtrar los datos de la tabla con los siguientes campos:
        - placa
    - Tabla: Muestra los camiones, y debe tener las columnas:
        - Placa.
        - Latitud.
        - Longitud.
        - Acciones: Botones de editar o eliminar.
    - Modal de ingreso o edicion: Este se abre para ingresar o editar camiones, tambien debe tener google maps para registrar y visualizar la ubicacion del camion.

## Modal de ubicacion

Al crear o editar un camion debe abrirse un modal con Google Maps para seleccionar visualmente la ultima ubicacion del camion. Esa ubicacion se debe registrar como su punto de origen y debe quedar almacenada junto con los datos del camion.

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
- Seleccionar ubicacion del camion en un modal.

## Reglas de negocio

- La placa debe ser unica.
- Un camion debe tener una ultima ubicacion registrada.
- La ultima ubicacion debe seleccionarse desde el modal de Google Maps.
- La ubicacion guardada debe corresponder al punto de origen del camion.
- La capacidad debe ser mayor que cero.

## Contratos de entrada y salida

### Entrada

- placa: string
- capacidad: number
- ultimaUbicacion: objeto con latitud y longitud
- puntoOrigen: objeto con latitud y longitud seleccionada en el modal

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
- Se puede seleccionar la ultima ubicacion del camion en un modal con Google Maps.
- Se puede consultar la lista de camiones.
- Las validaciones se ejecutan antes de guardar.
- El modulo respeta la estructura definida.
