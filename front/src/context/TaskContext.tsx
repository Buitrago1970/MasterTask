import { createContext, useContext, useEffect, useState } from 'react';
import type { Task } from '../types/Task';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  clearError: () => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const clearError = () => setError(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3001/api/tasks');
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.message || 'Error fetching tasks');
        }
        const data = await response.json();
        setTasks(data);
      } catch (error: any) {
        setTasks([]);
        setError(error.message || 'Error al obtener las tareas');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (task: Task) => {
    try {
      const response = await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Error creating task');
      }
      const newTask = await response.json();
      setTasks(prev => [newTask, ...prev]);
    } catch (error: any) {
      setError(error.message || 'Error al crear la tarea');
    }
  };
  const updateTask = async (task: Task) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Error updating task');
      }
      const updatedTask = await response.json();
      setTasks(prev => prev.map(t => (t.id === task.id ? updatedTask : t)));
    } catch (error: any) {
      setError(error.message || 'Error al actualizar la tarea');
    }
  };
  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Error deleting task');
      }
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (error: any) {
      setError(error.message || 'Error al eliminar la tarea');
    }
  };
  const toggleTask = async (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    try {
      const taskToUpdate = tasks.find(t => t.id === id);
      if (!taskToUpdate) return;
      const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
      const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Error updating task');
      }
    } catch (error: any) {
      setError(error.message || 'Error al actualizar la tarea');
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, error, clearError, addTask, updateTask, deleteTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within a TaskProvider');
  return context;
};