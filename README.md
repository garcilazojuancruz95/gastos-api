  # Gastos API

  API REST para registrar y administrar movimientos de dinero, separando ingresos y gastos.

  ## Descripción

  Este proyecto permite crear, consultar, editar y eliminar movimientos económicos. Cada movimiento puede ser de tipo `ingreso` o `gasto`, y la API permite calcular el balance total a partir de los registros
  guardados en una base de datos SQLite.

  ## Tecnologías

  - Node.js
  - Express
  - SQLite

  ## Funcionalidades

  - Crear movimientos
  - Listar movimientos
  - Buscar movimiento por ID
  - Filtrar movimientos por tipo
  - Editar movimientos
  - Eliminar movimientos
  - Consultar balance total

  ## Estructura básica

  ```text
  gastos-app/
  ├── db/
  │   ├── database.js
  │   └── gastos.db
  ├── routes/
  │   └── movimientos.js
  ├── server.js

  ## Instalación

  npm install

  ## Ejecutar el proyecto

  npm run dev

  El servidor se ejecuta en:

  http://localhost:3000

  ## Endpoints principales

  GET    /movimientos
  GET    /movimientos/:id
  GET    /movimientos/tipo/:tipo
  GET    /movimientos/balance/total
  POST   /movimientos
  PUT    /movimientos/:id
  DELETE /movimientos/:id

  ## Ejemplo de movimiento

  {
    "nombre": "Sueldo",
    "monto": 500000,
    "tipo": "ingreso"
  }

  ## Estado del proyecto

  Proyecto en desarrollo. Actualmente cuenta con una API básica para gestionar ingresos y gastos.