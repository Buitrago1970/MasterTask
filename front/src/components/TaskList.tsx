import { useTasks } from '../context/TaskContext';
import { useState } from 'react';
import TaskFilter from './TaskFilter';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import TaskForm from './TaskForm';
import type { Task } from '../types/Task';

function TaskList() {
  const { tasks, toggleTask, loading, deleteTask } = useTasks();

  const [priorityFilter, setPriorityFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Completed' | 'Incomplete'>('All');
  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const priorityStyles = {
    High: {
      bar: 'bg-red-500',
      text: 'text-red-500',
      badge: 'text-red-500',
    },
    Medium: {
      bar: 'bg-orange-400',
      text: 'text-orange-400',
      badge: 'text-orange-400',
    },
    Low: {
      bar: 'bg-green-500',
      text: 'text-green-500',
      badge: 'text-green-500',
    },
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-16">
      <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
      <span className="text-lg text-gray-700 font-medium">Loading tasks...</span>
    </div>
  );

  return (
    <div className="">
      {/* Filter Bar */}
      <TaskFilter
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      {/* Task List */}
      <div className="space-y-4">
        {tasks
          .filter(task => {
            if (priorityFilter !== 'All' && task.priority !== priorityFilter) return false;
            if (statusFilter === 'Completed' && !task.completed) return false;
            if (statusFilter === 'Incomplete' && task.completed) return false;
            return true;
          })
          .map(task => {
            const styles = priorityStyles[task.priority];
            return (
              <div key={task.id} className="border border-gray-200 rounded-lg overflow-hidden flex">
                <div className={`w-2 ${styles.bar}`}></div>
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer ${task.completed ? styles.bar + ' bg-opacity-80' : ''}`}
                        onClick={() => toggleTask(task.id)}
                      >
                        {task.completed ? (
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : null}
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <h3 className={`text-xl font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'} text-justify truncate`}>{task.title}</h3>
                        <p className={`${task.completed ? 'text-gray-400' : 'text-gray-600'} text-justify truncate`}>Due: {task.dueDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <span className={`${styles.badge} font-bold text-sm `}>{task.priority.toUpperCase()}</span>
                      <button
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                        title="Edit task"
                        onClick={() => setEditingTask(task)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182L7.5 19.213l-4 1 1-4 12.362-12.726z"
                          />
                        </svg>
                      </button>
                      <button
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete task"
                        onClick={() => {
                          setTaskToDelete(task.id);
                          setShowConfirm(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {/* Confirm Delete Popup */}
      <ConfirmDeleteModal
        show={showConfirm}
        onCancel={() => {
          setShowConfirm(false);
          setTaskToDelete(null);
          setDeleteError(null);
        }}
        onConfirm={async () => {
          setDeleteError(null);
          setIsDeleting(true);
          try {
            if (taskToDelete) await deleteTask(taskToDelete);
            setShowConfirm(false);
            setTaskToDelete(null);
          } catch (err) {
            setDeleteError('An error occurred while deleting the task. Please try again.');
          } finally {
            setIsDeleting(false);
          }
        }}
      />
      {deleteError && (
        <div className="text-red-500 text-sm mb-2 text-center">{deleteError}</div>
      )}
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <TaskForm
              taskToEdit={editingTask}
              onClose={() => setEditingTask(null)}
            />
            <button
              className="mt-4 text-gray-500 hover:text-gray-800"
              onClick={() => setEditingTask(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskList