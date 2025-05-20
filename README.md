# TaskMaster

TaskMaster is a task management application that allows users to create, view, edit, delete, and filter tasks with an intuitive and responsive interface. It consists of a **frontend** built with React and a **backend** API built with Node.js and Express.

---

## Table of Contents

- [Features](#features)
- [Technologies and Dependencies](#technologies-and-dependencies)
- [Project Structure](#project-structure)
- [Installation & Running](#installation--running)
- [Port Configuration](#port-configuration)
- [API Endpoints](#api-endpoints)
- [Technical Decisions & Trade-offs](#technical-decisions--trade-offs)
- [Future Improvements](#future-improvements)

---

## Features

- **Task display**: shows title, priority (Low, Medium, High), due date, and completion status.
- **Full task management**: create, edit, delete, and mark tasks as complete/incomplete.
- **Filtering**: by status (completed/incomplete) and priority.
- **Modern, responsive UI**: adapts to mobile, tablet, and desktop.
- **Form validation** and visual feedback for actions and loading states.
- **Visual indicators**: color-coded priorities and clear completion status.
- **RESTful API consumption**: integrates with a Node.js/Express backend.

---

## Technologies and Dependencies

### Backend

- **Node.js**: JavaScript runtime environment for the backend.
- **Express**: Framework to create the REST API.
- **CORS**: Middleware to enable requests from other origins.
- **UUID**: To generate unique identifiers for each task.
- **Nodemon** (development only): Automatically restarts the server when file changes are detected.

### Frontend

- **React + Vite + TypeScript**: for fast development, strict typing, and a modern stack.
- **TailwindCSS**: for rapid, responsive, and consistent styling.
- **Context API**: global state management for tasks.
- **Fetch API**: for RESTful API communication.

---

## Project Structure

```
taskmaster2/
├── backend/             # Backend API
│   ├── src/             # Source code for the backend
│   └── package.json     # Backend dependencies and scripts
├── front/               # Frontend application
│   ├── src/             # Source code for the frontend
│   └── package.json     # Frontend dependencies and scripts
└── README.md            # Unified documentation
```

### Frontend Structure

```
front/
├── src/
│   ├── components/      # UI components: TaskList, TaskForm, TaskFilter, ConfirmDeleteModal
│   ├── context/         # Global state management (TaskContext)
│   ├── hooks/           # Custom hooks (e.g., media query usage)
│   ├── types/           # TypeScript types for tasks
│   ├── assets/          # Static assets
│   ├── App.tsx          # Root component
│   └── main.tsx         # Entry point
├── public/              # Public static files
├── tailwind.config.js   # TailwindCSS configuration
└── ...
```

---

## Installation & Running

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the server:
   - Development mode (with auto-reload):
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```

The backend runs by default on port **3001** (`http://localhost:3001`).

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd front
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app:
   - Development mode:
     ```bash
     npm run dev
     ```
   - Production build:
     ```bash
     npm run build
     ```
   - Preview production build:
     ```bash
     npm run preview
     ```

The frontend runs by default on port **5173** (`http://localhost:5173`).

---

## Port Configuration

- **Backend**: Default port is **3001**. You can change it using the `PORT` environment variable.
- **Frontend**: Default port is **5173**. The frontend expects the backend API at `http://localhost:3001/api/tasks`. You can update this URL in `src/context/TaskContext.tsx`.

---

## API Endpoints

### Base URL

```
http://localhost:3001/api/tasks
```

### Endpoints

#### Get all tasks
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

#### Get a task by ID
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

#### Create a new task
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

#### Update a task
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

#### Delete a task
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

---

## Technical Decisions & Trade-offs

- **React + Vite + TypeScript**: for fast development, strict typing, and a modern stack.
- **TailwindCSS**: for rapid, responsive, and consistent styling.
- **Context API**: global state management for tasks, ideal for this app size.
- **Simple validation**: basic form validation, sufficient for the challenge.
- **No routing**: single-page app, as complexity does not require multiple routes.
- **Direct fetch usage**: fetch is used for API calls, though axios is included for possible future improvements.

---

## Future Improvements

- **Add unit and integration tests** (e.g., with React Testing Library).
- **Internationalization (i18n)**.
- **Better error handling and user feedback**.
- **Pagination or search for large task lists**.
- **Offline persistence/localStorage**.
- **Accessibility (a11y) improvements**.
- **More advanced animations and microinteractions**.
- **Multi-user/authentication support**.

---
