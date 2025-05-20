# TaskMaster Backend API

This is the backend API for the TaskMaster application. It provides endpoints to manage tasks in memory.

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