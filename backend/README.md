# TaskMaster Backend API

TaskMaster Backend is the API that manages tasks for the TaskMaster application. It allows you to create, read, update, and delete tasks (CRUD) using REST endpoints. Tasks are stored in memory (no database is used).

## Technologies and Dependencies

- **Node.js**: JavaScript runtime environment for the backend.
- **Express**: Framework to create the REST API.
- **CORS**: Middleware to enable requests from other origins (useful for the frontend).
- **UUID**: To generate unique identifiers for each task.
- **Nodemon** (development only): Automatically restarts the server when file changes are detected.

## Installation and Running

1. Make sure you have **Node.js** installed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. For development (with auto-reload):
   ```bash
   npm run dev
   ```
   For production:
   ```bash
   npm start
   ```

## Running Port

The backend runs by default on port **3001** (`http://localhost:3001`). You can change it using the `PORT` environment variable.

## Base URL

```
http://localhost:3001/api/tasks
```

## Endpoints

### Get all tasks
**GET** `/api/tasks`

**Response:**
```
Status: 200 OK
[
  {
    "id": "string",
    "title": "string",
    "priority": "Low|Medium|High",
    "dueDate": "YYYY-MM-DD",
    "completed": false
  }
]
```

---

### Get a task by ID
**GET** `/api/tasks/:id`

**Response:**
```
Status: 200 OK
{
  "id": "string",
  "title": "string",
  "priority": "Low|Medium|High",
  "dueDate": "YYYY-MM-DD",
  "completed": false
}
```

**If not found:**
```
Status: 404 Not Found
{ "error": "Task not found" }
```

---

### Create a new task
**POST** `/api/tasks`

**Request body:**
```
{
  "title": "string",
  "priority": "Low|Medium|High",
  "dueDate": "YYYY-MM-DD"
}
```

**Response:**
```
Status: 201 Created
{
  "id": "string",
  "title": "string",
  "priority": "Low|Medium|High",
  "dueDate": "YYYY-MM-DD",
  "completed": false
}
```

**If validation fails:**
```
Status: 400 Bad Request
{ "error": "..." }
```

---

### Update a task
**PUT** `/api/tasks/:id`

**Request body:**
```
{
  "title": "string",
  "priority": "Low|Medium|High",
  "dueDate": "YYYY-MM-DD",
  "completed": true
}
```

**Response:**
```
Status: 200 OK
{
  "id": "string",
  "title": "string",
  "priority": "Low|Medium|High",
  "dueDate": "YYYY-MM-DD",
  "completed": true
}
```

**If not found or validation fails:**
```
Status: 404 Not Found or 400 Bad Request
{ "error": "..." }
```

---

### Delete a task
**DELETE** `/api/tasks/:id`

**Response:**
```
Status: 204 No Content
```

**If not found:**
```
Status: 404 Not Found
{ "error": "Task not found" }
``` 