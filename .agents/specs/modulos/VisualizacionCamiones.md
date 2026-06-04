## Nombre del modulo

Visualizacion de camiones en Google Maps

## Proposito

Permitir visualizar todos los camiones de la flota en Google Maps, al seleccionar uno de ellos mostrar solamente ese camion en el mapa y, si el camion tiene una ruta asignada, mostrar los puntos de esa ruta. Tambien debe existir un boton para generar rutas con Google Routes Optimization API para todos los camiones que no tengan una ruta asignada.

Esas rutas deben seguir el siguiente orden

    1. Origen: Punto actual del camion.
    2. Fabrica: Punto de carga, solo debe ser uno.
    3. Clientes: Puntos de descarga, pueden ser varios.

Si un camion tiene una ruta asignada esta debe poder ser eliminada

## Alcance

- Incluye la visualizacion de todos los camiones en el mapa.
- Permite seleccionar un camion para centrar la vista solo en ese camion.
- Si el camion tiene ruta asignada, muestra los puntos de la ruta en el mapa.
- Si el camion tiene ruta asignada, debe mostrar la opcion de eliminar.
- Incluye un boton para generar rutas para los camiones sin ruta asignada.
- Incluye una leyenda flotante explicativa de todos los marcadores del mapa (Camiones con/sin ruta, Fábricas y Clientes).
- No crea ni modifica camiones.
- No calcula rutas optimas de forma local.
- Se relaciona con los modulos de camiones, fabricas, clientes y optimizacion de rutas.

## Estructura sugerida

Lo recomendado por Domain Driven Design en Front y Back

## Ruta Front

/Visor

## Entidades del dominio

- Camion
- RutaCamion
- PuntoRuta
- UbicacionCamion

## Casos de uso

- Visualizar todos los camiones.
- Seleccionar un camion.
- Visualizar solo el camion seleccionado.
- Mostrar la ruta asignada al camion.
- Ocultar la ruta del camion cuando no exista una asignacion.
- Generar rutas para camiones sin ruta asignada.
- Persistir la ruta generada para cada camion.
- Volver a la vista general.

## Reglas de negocio

- La vista general debe mostrar todos los camiones disponibles.
- Al seleccionar un camion, solo debe resaltarse ese camion.
- Si el camion tiene ruta asignada, deben mostrarse todos los puntos de la ruta.
- Si el camion no tiene ruta asignada, solo debe mostrarse su ubicacion.
- El boton de generar rutas solo debe ejecutar la optimizacion para camiones sin ruta asignada.
- Cada ruta generada debe quedar asociada a un solo camion.
- La ruta generada debe persistirse para futuras consultas.
- El mapa debe usar coordenadas validas para dibujar los marcadores.
- El modulo debe refrescar la informacion cuando cambie la ubicacion o la ruta del camion.

## Contratos de entrada y salida

### Entrada

- listaCamiones: array de camiones con ubicacion.
- camionSeleccionadoId: identificador del camion.
- rutaAsignada: objeto con los puntos de ruta, si existe.
- camionesSinRuta: lista de camiones que deben ser enviados a optimizacion.
- respuestaOptimizacion: resultado devuelto por Google Routes Optimization API.

### Salida

- mapa con todos los camiones.
- mapa con un solo camion seleccionado.
- ruta dibujada sobre el mapa cuando exista.
- rutas generadas y guardadas para los camiones sin ruta.
- mensaje de error si no se puede cargar la informacion.

## Persistencia

- No persiste informacion propia.
- Consume datos desde el backend mediante consultas a los modulos de camiones y rutas.
- Consume la API de Google Routes Optimization para generar rutas.
- Acceso a datos: API REST.

## API o interfaz

- `GET /camiones`
- `GET /camiones/:id`
- `GET /rutas/camion/:camionId`
- `POST /rutas/generar`
- Vista en Front con Google Maps.

## Criterios de aceptacion

- Se muestran todos los camiones en el mapa.
- Al seleccionar un camion, se ocultan los demas y se resalta el seleccionado.
- Si existe una ruta asignada, se muestran sus puntos en el mapa.
- Si no existe ruta asignada, el mapa solo muestra el camion.
- Al presionar el boton de generar rutas, se optimizan y guardan las rutas de los camiones sin ruta.
- La visualizacion responde correctamente al cambio de seleccion.
- Se muestra una leyenda flotante en el mapa que detalla el significado visual de los marcadores para Camión con Ruta, Camión sin Ruta, Fábrica y Cliente, con soporte coherente para Google Maps y el mapa simulado (SVG).
- La interfaz es totalmente responsiva: en pantallas de escritorio, la barra lateral y el mapa se dividen horizontalmente (izquierda/derecha). En dispositivos móviles, el contenedor se divide verticalmente (50% / 50%), posicionando el mapa en la mitad superior y la barra de control en la mitad inferior para evitar que el mapa se oculte.
