# OptimizadorRutas

## Castellano

OptimizadorRutas es un proyecto de ejemplo creado para demostrar el uso de **spec driven design** en un flujo de trabajo colaborativo.

La idea del proyecto es definir primero el contexto, la arquitectura y las reglas en archivos Markdown dentro de la carpeta `.agents`, y luego usar esas especificaciones como base para implementar el sistema de forma consistente entre varias personas o agentes.

### Proposito del ejemplo

- Mostrar como una especificacion clara reduce ambiguedad.
- Facilitar el trabajo colaborativo entre personas y agentes de IA.
- Mantener alineados el negocio, la arquitectura y los modulos.
- Servir como base para generar una aplicacion web con front, back y persistencia bien definidos.

### Estructura de la especificacion

- `.agents/specs/00-CONTEXTO.md`: describe el problema de negocio.
- `.agents/specs/01-ARQUITECTURA.md`: define el stack y la estructura tecnica.
- `.agents/specs/02-REGLAS.md`: concentra las reglas de implementacion.
- `.agents/specs/modulos/`: contiene la definicion de cada modulo funcional.

### Flujo de trabajo

1. Se define el contexto funcional.
2. Se fija la arquitectura general.
3. Se detallan las reglas de desarrollo.
4. Se crea una spec por modulo.
5. Se implementa el codigo siguiendo las especificaciones.

Este repositorio no pretende ser solo una aplicacion, sino un ejemplo de como documentar y construir software de manera ordenada, trazable y colaborativa.

## English

OptimizadorRutas is an example project built to demonstrate **spec driven design** in a collaborative workflow.

The goal of the project is to define the business context, architecture, and rules first using Markdown files inside the `.agents` folder, and then use those specifications as the source of truth to implement the system consistently across people or AI agents.

### Purpose of the example

- Show how a clear specification reduces ambiguity.
- Support collaboration between humans and AI agents.
- Keep business, architecture, and modules aligned.
- Provide a foundation for generating a web application with clearly defined front end, back end, and persistence layers.

### Specification structure

- `.agents/specs/00-CONTEXTO.md`: describes the business problem.
- `.agents/specs/01-ARQUITECTURA.md`: defines the stack and technical structure.
- `.agents/specs/02-REGLAS.md`: contains implementation rules.
- `.agents/specs/modulos/`: contains each functional module definition.

### Workflow

1. Define the functional context.
2. Set the global architecture.
3. Detail the development rules.
4. Create a spec for each module.
5. Implement the code according to the specifications.

This repository is intended not only as an application, but as a practical example of how to document and build software in a structured, traceable, and collaborative way.