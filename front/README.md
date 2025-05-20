# TaskMaster Front-End

TaskMaster is a task management application that allows users to create, view, edit, delete, and filter tasks with an intuitive and responsive interface.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation & Getting Started](#installation--getting-started)
- [Port Configuration](#port-configuration)
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
- **RESTful API consumption**: integrates with a Node.js/Express backend (default: `http://localhost:3001`).

---

## Project Structure

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
├── package.json         # Dependencies and scripts
└── ...
```

### Main Components

- **TaskList**: lists and filters tasks, allows editing and deleting.
- **TaskForm**: form for creating/editing tasks, with validation.
- **TaskFilter**: filter bar by priority and status.
- **ConfirmDeleteModal**: confirmation dialog for deleting tasks.
- **TaskContext**: manages global state and API communication.

---

## Installation & Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x

### Steps

1. **Install dependencies**

   ```bash
   cd front
   npm install
   ```

2. **Run in development mode**

   ```bash
   npm run dev
   ```

   By default, the app runs at [http://localhost:5173](http://localhost:5173).

3. **Production build**

   ```bash
   npm run build
   ```

4. **Preview production build**

   ```bash
   npm run preview
   ```

---

## Port Configuration

- **Front-end**: Vite runs by default on port **5173**.
- **Back-end**: The front-end expects the API to be available at `http://localhost:3001/api/tasks`.
  - You can change the backend URL in `src/context/TaskContext.tsx` if needed.

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
