# Arquitectura Global

## Front

Deberas crear un directorio /front para el proyecto

La web debe ser derrollada en Nextjs y usando las siguientes tecnologias

    - React.
    - Shadcn: para los componentes reutilizables.
    - Tailwind: Para los estilos.
    - Google maps: Para los mapas.
    - React Hook Form: Para los formularios.
    - Zod: Para la validacion de formularios.
    - Tanstack Table: Para las tablas.

## Back

Deberas crear un directorio /back para el proyecto

El back sera un api desarrollado con nestjs y usando las siguientes tecnologias.

    - Zod: Para validaciones de modelos.
    - Prisma: Para base de datos postgres.
    - Swagger: Para documentar API.

## Base de datos

La base de datos sera Postgres

# Despliegue

Deberas generar los archivos de docker necesarios para el despligue.

El sistema sera desplegado en docker de la siguiente forma

### Front

    - Nombre de Imagen: OptimizadorRutasWeb.
    - Puerto a exponer: 9901.

### Back

    - Nombre de Imagen: OptimizadorRutasApi.
    - Puerto a exponer: 9902.

### Base de datos

    - Nombre de Imagen: OptimizadorRutasBd.
    - Puerto a exponer: 9903.
