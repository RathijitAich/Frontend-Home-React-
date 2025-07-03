import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./Navbar";
import Login from "./Login";
import LandingPage from "./LandingPage";
import Registration from "./Registration";
import MainPage from "./MainPage";
import RequestMain from "./RequestMain";

import Worker_regi from "./Worker_regi";
import WorkerLogin from './Worker_login';
import WorkerDashboard from './WorkerDashboard';
import ViewJobs from './ViewJobs';
import CurrentJob from './CurrentJob';

import Approve from './Approve';

import Chat from './Chat_experiment';

// Component to conditionally render Navbar
const ConditionalNavbar = ({ email, setEmail, worker_email, setWorkerEmail }) => {
  const location = useLocation();
  
  // Pages where navbar SHOULD be shown
  const navbarPaths = [
    '/main',
    '/Req_main', 
    '/worker-dashboard',
    '/show-jobs',
    '/current-jobs',
    '/Approve',
    '/chat'
  ];
  
  const shouldShowNavbar = navbarPaths.includes(location.pathname);
  
  return shouldShowNavbar ? (
    <Navbar 
      email={email} 
      setEmail={setEmail} 
      worker_email={worker_email} 
      setWorkerEmail={setWorkerEmail} 
    />
  ) : null;
};

function App() {
  // Email
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");
  useEffect(() => {
    localStorage.setItem("email", email);
  }, [email]);

  const [worker_email, setWorkerEmail] = useState(() => localStorage.getItem("worker_email") || "");
  useEffect(() => {
    localStorage.setItem("worker_email", worker_email);
  }, [worker_email]);

  return (
    <Router>
      <div className="app-container">
        {/* Conditional Navbar */}
        <ConditionalNavbar 
          email={email} 
          setEmail={setEmail} 
          worker_email={worker_email} 
          setWorkerEmail={setWorkerEmail} 
        />
        
        {/* Main Content */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login email={email} setEmail={setEmail}/>} />
            <Route path="/register" element={<Registration />} />

            <Route path="/main" element={<MainPage email={email} setEmail={setEmail} worker_email={worker_email} />} />
            <Route path="/Req_main" element={<RequestMain email={email} setEmail={setEmail} />} />

            <Route path="/worker_regi" element={<Worker_regi/>} />
            <Route path="/Worker_login" element={<WorkerLogin  worker_email={worker_email} setWorkerEmail={setWorkerEmail} />} />
            <Route path="/worker-dashboard" element={<WorkerDashboard worker_email={worker_email} setWorkerEmail={setWorkerEmail} />} />
            <Route path="/show-jobs" element={<ViewJobs worker_email={worker_email} setWorkerEmail={setWorkerEmail} />} />
            <Route path="/current-jobs" element={<CurrentJob worker_email={worker_email} setWorkerEmail={setWorkerEmail} />} />

            <Route path="/Approve" element={<Approve email={email} setEmail={setEmail} />} />
            <Route path ="/chat" element={<Chat email={email} worker_email={worker_email} />} />
          </Routes>
        </div>
      </div>
      
      <style>{`
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .main-content {
          flex: 1;
        }
        
        /* Ensure navbar stays on top */
        .dashboard-navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        
        /* Full height for landing page */
        .landing-page {
          min-height: 100vh;
        }
      `}</style>
    </Router>
  );
}

export default App;