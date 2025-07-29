
import { BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import TaskList from './pages/TaskList.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // required for toast styling



function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="p-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}


// function App() {
//   return (
//     <Router>
//         <Navbar />
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/tasks" element={<TaskList />} />

//       </Routes>
//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </Router>
//   )
// }


// return (
//     <Router>
//       <div className="min-h-screen bg-gray-100">
//         <Navbar />
//         <main className="p-6">
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/tasks" element={<Tasks />} />
//             <Route path="/" element={<Navigate to="/login" replace />} />
//             <Route path="*" element={<Navigate to="/login" replace />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

export default App
