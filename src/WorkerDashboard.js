import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const WorkerDashboard = ({ worker_email, setWorkerEmail }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkerDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/maintenance-worker/${encodeURIComponent(worker_email)}`);
        if (response.ok) {
          const data = await response.json();
          setWorker(data);
        } else {
          console.error("Failed to fetch worker details");
        }
      } catch (error) {
        console.error("Failed to fetch worker:", error);
      } finally {
        setLoading(false);
      }
    };

    if (worker_email) {
      fetchWorkerDetails();
    }
  }, [worker_email]);

  useEffect(() => {
    const now = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    setCurrentDate(now.toLocaleDateString("en-US", options));
  }, []);

  const user = {
    initials: worker ? worker.name.split(' ').map(n => n[0]).join('').toUpperCase() : "W",
    name: worker ? worker.name : "Worker",
    firstName: worker ? worker.name.split(' ')[0] : "Worker",
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Clear worker email
      setWorkerEmail("");
      // Clear any localStorage data if needed
      localStorage.removeItem("worker_email");
      // Optionally clear any other worker-related data
      setWorker(null);
      navigate("/Worker_login"); // Redirect to Worker Login page
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Inline styles and FontAwesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" />
      <style>{`
         *{
        font-family: 'Poppins', sans-serif;
        }
        .dashboard {
          padding: 30px 0;
        }
        .welcome-card {
          background-color: var(--worker-color, #059669);
          color: var(--white, #fff);
          padding: 40px;
          border-radius: 0;
          margin-bottom: 40px;
        }
        .welcome-card h1 {
          margin-bottom: 15px;
          font-size: 2.2rem;
        }
        .date-display {
          font-weight: 500;
          margin-bottom: 15px;
          font-size: 1.1rem;
        }
        .quick-stats {
          display: flex;
          gap: 20px;
          margin-top: 30px;
        }
        .stat {
          background: rgba(255, 255, 255, 0.2);
          padding: 15px;
          flex: 1;
          border-radius: 0;
        }
        .stat h3 {
          font-size: 1rem;
          margin-bottom: 5px;
        }
        .stat p {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
        }
        .feature-cards {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
        }
        .feature-card {
          flex: 1;
          min-width: 300px;
          background-color: var(--white, #fff);
          padding: 30px;
          border-radius: 0;
          box-shadow: var(--shadow, 0 4px 6px -1px rgba(0,0,0,0.1));
          transition: var(--transition, all 0.3s ease);
          position: relative;
          overflow: hidden;
          border: 1px solid var(--gray-100, #f1f0ea);
        }
        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0,0,0,0.1));
          border-color: var(--worker-light, #10b981);
        }
        .feature-icon {
          font-size: 2.5rem;
          color: var(--worker-color, #059669);
          margin-bottom: 20px;
        }
        .feature-card h2 {
          font-size: 1.5rem;
          margin-bottom: 15px;
        }
        .feature-card p {
          color: var(--text-light, #6b6b6b);
          margin-bottom: 25px;
        }
        .feature-btn {
          display: inline-flex;
          align-items: center;
          padding: 10px 20px;
          background-color: var(--worker-color, #059669);
          color: var(--white, #fff);
          border-radius: 0;
          font-weight: 500;
          transition: var(--transition, all 0.3s ease);
          text-decoration: none;
        }
        .feature-btn i {
          margin-left: 8px;
          transition: var(--transition, all 0.3s ease);
        }
        .feature-btn:hover {
          background-color: var(--worker-light, #10b981);
          color: var(--white, #fff);
        }
        .feature-btn:hover i {
          transform: translateX(5px);
        }
        .dashboard-navbar {
          background-color: var(--white, #fff);
          padding: 15px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: var(--shadow, 0 4px 6px -1px rgba(0,0,0,0.1));
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .logo {
          display: flex;
          align-items: center;
          font-weight: 700;
          font-size: 1.3rem;
          color: var(--worker-color, #059669);
        }
        .logo i {
          margin-right: 10px;
          font-size: 1.5rem;
        }
        .nav-links {
          display: flex;
          align-items: center;
        }
        .nav-links a {
          margin-left: 25px;
          color: var(--text-dark, #252525);
          font-weight: 500;
          transition: var(--transition, all 0.3s ease);
          text-decoration: none;
        }
        .nav-links a:hover {
          color: var(--worker-color, #059669);
        }
        .user-menu {
          display: flex;
          align-items: center;
          cursor: pointer;
          position: relative;
        }
        .user-avatar {
          width: 40px;
          height: 40px;
          background-color: var(--gray-100, #f1f0ea);
          border-radius: 0;
          margin-right: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }
        .user-name {
          font-weight: 500;
          margin-right: 15px;
        }
        .logout-btn {
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .logout-btn:hover {
          background-color: #c82333;
          transform: translateY(-1px);
        }
        .logout-btn i {
          font-size: 0.85rem;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .worker-info {
          background: linear-gradient(135deg, #059669 0%, #10b981 100%);
          color: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .worker-info h3 {
          margin-bottom: 10px;
        }
        .worker-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-top: 15px;
        }
        .worker-detail {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .worker-detail i {
          width: 20px;
        }
        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: capitalize;
        }
        .status-available {
          background-color: rgba(34, 197, 94, 0.1);
          color: #16a34a;
        }
        .status-busy {
          background-color: rgba(251, 146, 60, 0.1);
          color: #ea580c;
        }
        .status-offline {
          background-color: rgba(107, 114, 128, 0.1);
          color: #6b7280;
        }
        @media (max-width: 900px) {
          .feature-cards {
            flex-direction: column;
            gap: 20px;
          }
        }
        @media (max-width: 600px) {
          .welcome-card {
            padding: 20px;
          }
          .feature-card {
            padding: 18px;
            min-width: unset;
          }
          .dashboard-navbar {
            flex-direction: column;
            gap: 10px;
            padding: 10px 10px;
          }
          .nav-links {
            order: 1;
          }
          .user-menu {
            order: 2;
          }
          .container {
            padding: 0 5px;
          }
          .worker-details {
            grid-template-columns: 1fr;
          }
          .user-menu {
            flex-direction: column;
            gap: 10px;
          }
          .logout-btn {
            font-size: 0.8rem;
            padding: 6px 12px;
          }
        }
      `}</style>

      {/* Navbar */}
      <nav className="dashboard-navbar">
        <div className="logo">
          <i className="fas fa-tools"></i>
          WorkerPortal
        </div>
        <div className="nav-links">
          <Link to="/WorkerDashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
          <Link to="/worker-notifications"><i className="fas fa-bell"></i> Notifications</Link>
          <Link to="/chat" className="chat-link"><i className="fas fa-comments"></i> Chat</Link>
          
        </div>
        <div className="user-menu">
          <div className="user-avatar">{user.initials}</div>
          <div className="user-name">{user.name}</div>
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container">
        <section className="dashboard">
          {/* Worker Info Card */}
          {worker && (
            <div className="worker-info">
              <h3><i className="fas fa-user-circle"></i> Worker Profile</h3>
              <div className="worker-details">
                <div className="worker-detail">
                  <i className="fas fa-envelope"></i>
                  <span>{worker.email}</span>
                </div>
                <div className="worker-detail">
                  <i className="fas fa-phone"></i>
                  <span>{worker.phone}</span>
                </div>
                <div className="worker-detail">
                  <i className="fas fa-tools"></i>
                  <span style={{ textTransform: 'capitalize' }}>{worker.skill}</span>
                </div>
                <div className="worker-detail">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{worker.address}</span>
                </div>
                <div className="worker-detail">
                  <i className="fas fa-signal"></i>
                  <span className={`status-badge status-${worker.status?.toLowerCase() || 'available'}`}>
                    {worker.status || 'Available'}
                  </span>
                </div>
                <div className="worker-detail">
                  <i className="fas fa-star"></i>
                  <span>{worker.rating ? `${worker.rating}/5.0` : 'No rating yet'}</span>
                </div>
              </div>
            </div>
          )}

          <div className="welcome-card">
            <h1>Welcome back, {user.firstName}</h1>
            <div className="date-display">
              <i className="far fa-calendar-alt"></i>
              <span style={{ marginLeft: 8 }}>{currentDate}</span>
            </div>
            <p>Here's your work dashboard for today.</p>
            <div className="quick-stats">
              <div className="stat">
                <h3>Available Jobs</h3>
                <p>8</p>
              </div>
              <div className="stat">
                <h3>Current Jobs</h3>
                <p>2</p>
              </div>
              <div className="stat">
                <h3>Completed Today</h3>
                <p>1</p>
              </div>
              <div className="stat">
                <h3>Rating</h3>
                <p>{worker?.rating || '4.8'}</p>
              </div>
            </div>
          </div>
          
          <div className="feature-cards">
            {/* Show Available Jobs Card */}
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-search"></i>
              </div>
              <h2>Available Jobs</h2>
              <p>Browse and apply for maintenance jobs in your area that match your skills.</p>
              <Link to="/show-jobs" className="feature-btn">
                View Jobs <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

            {/* Current Jobs Card */}
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-clipboard-list"></i>
              </div>
              <h2>Current Jobs</h2>
              <p>Manage your ongoing projects, update progress, and communicate with homeowners.</p>
              <Link to="/current-jobs" className="feature-btn">
                Manage Jobs <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

            {/* Job History Card */}
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-history"></i>
              </div>
              <h2>Job History</h2>
              <p>Review your completed jobs, ratings, and earnings history.</p>
              <Link to="/job-history" className="feature-btn">
                View History <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

WorkerDashboard.propTypes = {
  worker_email: PropTypes.string.isRequired,
  setWorkerEmail: PropTypes.func.isRequired,
};

export default WorkerDashboard;