import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md rounded-b-2xl">
      <div className="container mx-auto px-6 py-4 flex justify-between">
        <h1 className="text-2xl font-bold">TaskManager</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/login" className="text-base font-medium text-blue-600 hover:text-blue-800">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="text-base font-medium text-blue-600 hover:text-blue-800">
              Register
            </Link>
          </li>
          <li>
            <Link to="/tasks" className="text-base font-medium text-blue-600 hover:text-blue-800">
              Tasks
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}