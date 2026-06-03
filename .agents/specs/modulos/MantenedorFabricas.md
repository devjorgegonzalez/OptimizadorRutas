## Nombre del modulo

Gestion de fabricas

## Proposito

Permitir registrar y consultar las fabricas de carga para que puedan ser usadas en la optimizacion de rutas.

## Alcance

- Incluye el registro, edicion, consulta y eliminacion de fabricas.
- Para consultar debe haber un filtro por nombre de fabrica.
- Incluye la ubicacion geografica de cada fabrica.
- No calcula rutas optimas.
- Se relaciona con los modulos de camiones, clientes y optimizacion de rutas.

## Estructura sugerida

Lo recomendado por Domain Driven Design en Front y Back

## Ruta Front

/Mantenedores/Fabricas

## Componentes del Front

    - Filtros: Se encarga de filtrar los datos de la tabla con los siguientes campos:
        - id Fabrica
    - Tabla: Muestra las fabricas, y debe tener las columnas:
        - id Fabrica.
        - Nombre Fabrica.
        - Latitud.
        - Longitud.
        - Acciones: Botones de editar o eliminar.
    - Modal de ingreso o edicion: Este se abre para ingresar o editar fabricas, tambien debe tener google maps para registrar y visualizar la ubicacion de la fabrica.

## Entidades del dominio

- Fabrica
- UbicacionFabrica

## Casos de uso

- Crear fabrica.
- Actualizar fabrica.
- Obtener fabrica por id.
- Listar fabricas.
- Filtrar fabricas.
- Eliminar fabrica.

## Reglas de negocio

- El nombre de la fabrica debe ser unico o al menos no duplicado dentro del mismo contexto de negocio, segun la necesidad del cliente.
- Una fabrica debe tener una ubicacion registrada.
- La ubicacion debe incluir coordenadas validas.
- La fabrica debe estar activa para poder ser considerada en la optimizacion de rutas.

## Contratos de entrada y salida

### Entrada

- nombre: string
- descripcion: string
- ubicacion: objeto con latitud y longitud
- direccion: string opcional
- activo: boolean

### Salida

- fabrica creada correctamente
- fabrica actualizada correctamente
- error de validacion
- error por fabrica duplicada

## Persistencia

- Base de datos: Postgres.
- Acceso a datos: Prisma.

## API o interfaz

- `POST /fabricas`
- `GET /fabricas`
- `GET /fabricas/:id`
- `PUT /fabricas/:id`
- `DELETE /fabricas/:id`

## Criterios de aceptacion

- Se puede crear una fabrica con ubicacion valida.
- Se puede consultar la lista de fabricas.
- El filtro por nombre funciona correctamente.
- Las validaciones se ejecutan antes de guardar.
- El modulo respeta la estructura definida.
