## Nombre del modulo

Gestion de clientes

## Proposito

Permitir registrar y consultar los clientes de descarga para que puedan ser usados en la optimizacion de rutas.

## Alcance

- Incluye el registro, edicion, consulta y eliminacion de clientes.
- Para consultar debe haber un filtro por nombre de cliente.
- Incluye la ubicacion geografica de cada cliente.
- No calcula rutas optimas.
- Se relaciona con los modulos de camiones, fabricas y optimizacion de rutas.

## Estructura sugerida

Lo recomendado por Domain Driven Design en Front y Back

## Entidades del dominio

- Cliente
- UbicacionCliente

## Casos de uso

- Crear cliente.
- Actualizar cliente.
- Obtener cliente por id.
- Listar clientes.
- Filtrar clientes.
- Eliminar cliente.

## Reglas de negocio

- El nombre del cliente debe ser unico o al menos no duplicado dentro del mismo contexto de negocio, segun la necesidad del cliente.
- Un cliente debe tener una ubicacion registrada.
- La ubicacion debe incluir coordenadas validas.
- El cliente debe estar activo para poder ser considerado en la optimizacion de rutas.

## Contratos de entrada y salida

### Entrada

- nombre: string
- descripcion: string
- ubicacion: objeto con latitud y longitud
- direccion: string opcional
- activo: boolean

### Salida

- cliente creado correctamente
- cliente actualizado correctamente
- error de validacion
- error por cliente duplicado

## Persistencia

- Base de datos: Postgres.
- Acceso a datos: Prisma.

## API o interfaz

- `POST /clientes`
- `GET /clientes`
- `GET /clientes/:id`
- `PUT /clientes/:id`
- `DELETE /clientes/:id`

## Criterios de aceptacion

- Se puede crear un cliente con ubicacion valida.
- Se puede consultar la lista de clientes.
- El filtro por nombre funciona correctamente.
- Las validaciones se ejecutan antes de guardar.
- El modulo respeta la estructura definida.
