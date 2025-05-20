import { useTasks } from '../context/TaskContext'
import { v4 as uuidv4 } from 'uuid'
import { useState, type FC } from 'react'

interface TaskFormProps {
  onClose?: () => void
  taskToEdit?: {
    id: string;
    title: string;
    priority: 'Low' | 'Medium' | 'High';
    dueDate: string;
    completed: boolean;
  }
}

const TaskForm: FC<TaskFormProps> = ({ onClose, taskToEdit }) => {
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : '')
  const [priority, setPriority] = useState(taskToEdit ? taskToEdit.priority : '')
  const [dueDate, setDueDate] = useState(taskToEdit ? taskToEdit.dueDate : '')
  const [errors, setErrors] = useState<{ title?: string; priority?: string; dueDate?: string }>({})
  const { addTask, updateTask } = useTasks()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validate = () => {
    const newErrors: { title?: string; priority?: string; dueDate?: string } = {}
    if (!title.trim()) newErrors.title = 'Title is required.'
    if (!['high', 'medium', 'low'].includes(priority.toLowerCase())) newErrors.priority = 'Priority must be High, Medium, or Low.'
    if (!dueDate) newErrors.dueDate = 'Due date is required.'
    // Simple date format check (YYYY-MM-DD)
    if (dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) newErrors.dueDate = 'Date must be in YYYY-MM-DD format.'
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return
    setIsSubmitting(true)
    try {
      const newTask = {
        id: taskToEdit ? taskToEdit.id : uuidv4(),
        title: title.trim(),
        priority: (priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase()) as 'Low' | 'Medium' | 'High',
        dueDate,
        completed: taskToEdit ? taskToEdit.completed : false,
      }
      if (taskToEdit) {
        await updateTask(newTask)
        if (onClose) onClose()
      } else {
        await addTask(newTask)
        setTitle('')
        setPriority('')
        setDueDate('')
        setErrors({})
      }
    } catch (err) {
      setSubmitError('An error occurred while saving the task. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 relative"
    >
      <h2 className="text-2xl font-bold mb-4 text-black text-justify">Add New Task</h2>
      <label className="text-[#333] font-normal text-base mb-1 text-left">Title</label>
      <input
        type="text"
        placeholder="Title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-[#e3e8ee] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 text-base mb-1 w-full"
        style={{ minHeight: 44 }}
      />
      {errors.title && <span className="text-red-500 text-sm mb-2">{errors.title}</span>}

      <label className="text-[#333] font-normal text-base mb-1 text-left">Priority</label>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border border-[#e3e8ee] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 text-base appearance-none mb-1 w-full"
        style={{ minHeight: 44 }}
        required
      >
        <option value="" disabled hidden>Select priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      {errors.priority && <span className="text-red-500 text-sm mb-2">{errors.priority}</span>}

      <label className="text-[#333] font-normal text-base mb-1 text-left">Due Date</label>
      <input
        type="date"
        placeholder="YYYY-MM-DD"
        required
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border border-[#e3e8ee] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 text-base mb-1 w-full"
        style={{ minHeight: 44 }}
      />
      {errors.dueDate && <span className="text-red-500 text-sm mb-2">{errors.dueDate}</span>}

      {submitError && <div className="text-red-500 text-sm mb-2">{submitError}</div>}

      <button
        type="submit"
        className="py-3 mt-8 bg-[#556ee6] text-white rounded-md font-bold text-lg hover:bg-[#4156b6] transition-colors shadow-sm w-full"
        style={{ minHeight: 48 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            Saving...
          </span>
        ) : (
          taskToEdit ? 'Edit Task' : 'Save Task'
        )}
      </button>
    </form>
  )
}

export default TaskForm