# Time Tracker API

API REST para gestionar tareas con TypeScript, Express y MongoDB Atlas.

## Tecnologías

- TypeScript
- Express
- MongoDB Atlas
- Mongoose

## Instalación

```bash
npm install
```

## Desarrollo

Para ejecutar en modo desarrollo:

```bash
npm run dev
```

## Compilación

Para compilar el proyecto:

```bash
npm run build
```

## Producción

Para ejecutar en producción:

```bash
npm start
```

## Endpoints

### GET /tasks
Obtiene todas las tareas

### POST /tasks
Crea una nueva tarea
```json
{
  "title": "Nueva tarea",
  "description": "Descripción de la tarea",
  "startTime": "2025-06-01T10:00:00Z",
  "endTime": "2025-06-01T11:00:00Z"
}
```

### PUT /tasks/:id
Actualiza una tarea existente

### DELETE /tasks/:id
Elimina una tarea
