import { useEffect, useState } from 'react';
import API from '../api/axios';
import './TaskList.css'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [meta, setMeta] = useState({ count: 0 });
  const [filters, setFilters] = useState({ status: '', priority: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  const fetchTasks = async (page = 1) => {
    const query = new URLSearchParams({ ...filters, page }).toString();
    const res = await API.get(`tasks/?${query}`);
    setTasks(res.data.results);
    setMeta({
      count: res.data.count,
      next: res.data.next,
      previous: res.data.previous
    });
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchTasks(1); // Reset to page 1 when filters change
  }, [filters]);



  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/tasks/");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Task updated via WebSocket:", data);

      // Show toast
      toast.info(`Task updated: ${data.title} → ${data.status}`);

      // Refresh the list
      fetchTasks();
    };

    return () => socket.close();
  }, []);


  const totalPages = Math.ceil(meta.count / PAGE_SIZE);

  return (
    <div>
      <h2 style={{ marginLeft: '25rem' }}>Task List</h2>

      <select style={{ marginLeft: '11rem' }} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <table className="task-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.task_id}>
              <td>{index + 1}</td>
              <td>{task.title}</td>
              <td>{task.status}</td>
              <td>{task.priority}</td>
              <td>{task.due_date}</td>
              <td>{task.assigned_to}</td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Page number buttons */}
      <div style={{ marginTop: '1rem', marginLeft: '10rem' }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => fetchTasks(page)}
            style={{
              margin: '0 4px',
              backgroundColor: page === currentPage ? '#444' : '#eee',
              color: page === currentPage ? 'white' : 'black',
              padding: '6px 12px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
