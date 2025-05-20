const { v4: uuidv4 } = require('uuid');

// In-memory storage with three example tasks
let tasks = [
  {
    id: uuidv4(),
    title: 'Buy groceries',
    priority: 'Medium',
    dueDate: '2024-07-01',
    completed: false
  },
  {
    id: uuidv4(),
    title: 'Call mom',
    priority: 'High',
    dueDate: '2024-07-05',
    completed: false
  },
  {
    id: uuidv4(),
    title: 'Read a book',
    priority: 'Low',
    dueDate: '2024-07-10',
    completed: false
  }
];

// Helper: validate ISO date
function isISODate(str) {
  return /^\d{4}-\d{2}-\d{2}/.test(str);
}

// Get all tasks
function getAllTasks(req, res) {
  res.json(tasks);
}

// Get a task by ID
function getTaskById(req, res) {
  const { id } = req.params;
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
}

// Create a new task
function createTask(req, res) {
  const { title, priority, dueDate } = req.body;
  const validPriorities = ['Low', 'Medium', 'High'];
  if (!title || !priority || !dueDate) {
    return res.status(400).json({ error: 'Title, priority, and dueDate are required' });
  }
  if (!validPriorities.includes(priority)) {
    return res.status(400).json({ error: 'Priority must be Low, Medium, or High' });
  }
  if (!isISODate(dueDate)) {
    return res.status(400).json({ error: 'dueDate must be a valid ISO date (YYYY-MM-DD)' });
  }
  const newTask = {
    id: uuidv4(),
    title,
    priority,
    dueDate,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
}

// Update a task
function updateTask(req, res) {
  const { id } = req.params;
  const { title, priority, dueDate, completed } = req.body;
  const validPriorities = ['Low', 'Medium', 'High'];
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  if (priority !== undefined && !validPriorities.includes(priority)) {
    return res.status(400).json({ error: 'Priority must be Low, Medium, or High' });
  }
  if (dueDate !== undefined && !isISODate(dueDate)) {
    return res.status(400).json({ error: 'dueDate must be a valid ISO date (YYYY-MM-DD)' });
  }
  if (title !== undefined) task.title = title;
  if (priority !== undefined) task.priority = priority;
  if (dueDate !== undefined) task.dueDate = dueDate;
  if (completed !== undefined) task.completed = completed;
  res.json(task);
}

// Delete a task
function deleteTask(req, res) {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks.splice(index, 1);
  res.status(204).send();
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
