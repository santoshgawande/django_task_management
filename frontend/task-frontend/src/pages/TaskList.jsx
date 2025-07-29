// src/pages/TaskList.jsx
import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import './TaskList.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [meta, setMeta] = useState({ count: 0 });
  const [filters, setFilters] = useState({ status: '', priority: '' });
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 10;

  // Fetch tasks from the server with pagination & filters
  const fetchTasks = async (page = 1, { status, priority }) => {
    try {
      const params = { page, page_size: PAGE_SIZE };
      if (status) params.status = status;
      if (priority) params.priority = priority;
      const res = await API.get('tasks/', { params });
      setTasks(res.data.results);
      setMeta({ count: res.data.count });
    } catch (err) {
      console.error(err);
      toast.error('Failed to load tasks.');
    }
  };

  // Initial load & whenever page or filters change
  useEffect(() => {
    fetchTasks(currentPage, filters);
  }, [currentPage, filters]);

  // Handle filter dropdown changes
  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  // Toggle completed status via PATCH, then refetch
  const handleStatusToggle = async task => {
    try {
          // Call the new status endpoint
       await API.patch(`tasks/${task.id}/status/`, {
        completed: !task.completed
      });
      setTasks(old =>
      old.map(t => (t.id === task.id ? task : t))
    );
      toast.success('Task status updated.');
      fetchTasks(currentPage, filters);
    } catch (err) {
      console.error(err);
      toast.error('Could not update status.');
    }
  };

  const totalPages = Math.ceil(meta.count / PAGE_SIZE);

  return (
    <div className="task-list-container">
      <div className="filters mb-4 flex space-x-4">
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="border rounded p-2"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <select
          name="priority"
          value={filters.priority}
          onChange={handleFilterChange}
          className="border rounded p-2"
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Priority</th>
            <th className="p-2 text-left">Due Date</th>
            <th className="p-2 text-left">Assigned To</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="7" className="p-4 text-center">
                No tasks found.
              </td>
            </tr>
          ) : (
            tasks.map((task, idx) => (
              <tr key={task.id} className="border-t">
                <td className="p-2">{idx + 1 + (currentPage - 1) * PAGE_SIZE}</td>
                <td className="p-2">{task.title}</td>
                <td className="p-2">
                  {task.completed ? 'Completed' : 'Pending'}
                </td>
                <td className="p-2">{task.priority}</td>
                <td className="p-2">{task.due_date}</td>
                <td className="p-2">{task.assigned_to}</td>
                <td className="p-2">
                
              <button
                onClick={() => handleStatusToggle(task)}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Update
              </button>

                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-black'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
