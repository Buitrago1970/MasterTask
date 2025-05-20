import React from 'react';

interface TaskFilterProps {
  priorityFilter: 'All' | 'High' | 'Medium' | 'Low';
  setPriorityFilter: (value: 'All' | 'High' | 'Medium' | 'Low') => void;
  statusFilter: 'All' | 'Completed' | 'Incomplete';
  setStatusFilter: (value: 'All' | 'Completed' | 'Incomplete') => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <span className="text-xl text-gray-700 font-medium">Filter by:</span>

        {/* Status Filter Dropdown */}
        <div className="relative flex-1">
          <select
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-600"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as 'All' | 'Completed' | 'Incomplete')}
          >
            <option value="All">Status: All</option>
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </div>

        {/* Priority Filter Dropdown */}
        <div className="relative flex-1">
          <select
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-600"
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value as 'All' | 'High' | 'Medium' | 'Low')}
          >
            <option value="All">Priority: All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter; 