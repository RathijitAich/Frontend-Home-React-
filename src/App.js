
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

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
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login email={email} setEmail={setEmail}/>} />
        <Route path="/register" element={<Registration />} />

        <Route path="/main" element={<MainPage email={email} setEmail={setEmail} />} />
        <Route path="/Req_main" element={<RequestMain email={email} setEmail={setEmail} />} />

        <Route path="/worker_regi" element={<Worker_regi/>} />
        <Route path="/Worker_login" element={<WorkerLogin  worker_email={worker_email} setWorkerEmail={setWorkerEmail} />} />
        <Route path="/worker-dashboard" element={<WorkerDashboard worker_email={worker_email} setWorkerEmail={setWorkerEmail} />} />
        <Route path="/show-jobs" element={<ViewJobs worker_email={worker_email} setWorkerEmail={setWorkerEmail} />} />
        <Route path="/current-jobs" element={<CurrentJob worker_email={worker_email} setWorkerEmail={setWorkerEmail} />} />

        <Route path="/Approve" element={<Approve email={email} setEmail={setEmail} />} />

                
        



      </Routes>
    </Router>
  );
}

export default App;