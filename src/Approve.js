import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Approve = ({ email, setEmail }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [homeowner, setHomeowner] = useState(null);
  const [jobAssignments, setJobAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch homeowner details
  useEffect(() => {
    const fetchHomeownerDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/homeowner/${email}`);
        if (response.ok) {
          const data = await response.json();
          setHomeowner(data);
        } else {
          console.error("Failed to fetch homeowner details");
        }
      } catch (error) {
        console.error("Failed to fetch homeowner:", error);
      }
    };

    if (email) {
      fetchHomeownerDetails();
    }
  }, [email]);

  // Fetch job assignments for this homeowner
  useEffect(() => {
    const fetchJobAssignments = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/job-applications/homeowner/${email}`);
        
        if (response.ok) {
          const data = await response.json();
          
          setJobAssignments(data);
        } else {
          const errorText = await response.text();
          setError(`Failed to fetch job assignments: ${response.status} ${errorText}`);
        }
      } catch (error) {
        console.error("Error fetching job assignments:", error);
        setError(`Network error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchJobAssignments();
    }
  }, [email]);

  useEffect(() => {
    const now = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    setCurrentDate(now.toLocaleDateString("en-US", options));
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setEmail("");
      localStorage.removeItem("email");
      setHomeowner(null);
      navigate("/login");
    }
  };

 const handleApproveApplication = async (jobAssignment) => {
  if (window.confirm("Are you sure you want to approve this application?")) {
    try {
      const requestData = {
        issueTitle: jobAssignment.job.issueTitle,
        homeownerEmail: jobAssignment.homeowner.email,
        workerEmail: jobAssignment.worker.email,
        status: "approved"
      };

      const response = await fetch(`http://localhost:8080/api/job-applications/update-status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      

     

      if (response.ok) {
        alert("Application approved successfully!");
        // Refresh the assignments list
        const updatedAssignments = jobAssignments.map(app => 
          app.job.issueTitle === jobAssignment.job.issueTitle && 
          app.homeowner.email === jobAssignment.homeowner.email && 
          app.worker.email === jobAssignment.worker.email
            ? { ...app, applicationStatus: "approved" }
            : app
        );
        setJobAssignments(updatedAssignments);
      } else {
        alert("Failed to approve application");
      }
    } catch (error) {
      console.log("Job assignments data:", jobAssignments);
      console.error("Error approving application:", error);
      alert("Error approving application");
    }
  }
};

const handleRejectApplication = async (jobAssignment) => {
  if (window.confirm("Are you sure you want to reject this application?")) {
    try {
      const requestData = {
        issueTitle: jobAssignment.job.issueTitle,
        homeownerEmail: jobAssignment.homeowner.email,
        workerEmail: jobAssignment.worker.email,
        status: "rejected"
      };

      const response = await fetch(`http://localhost:8080/api/job-applications/update-status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert("Application rejected!");
        // Refresh the assignments list
        const updatedAssignments = jobAssignments.map(app => 
          app.job.issueTitle === jobAssignment.job.issueTitle && 
          app.homeowner.email === jobAssignment.homeowner.email && 
          app.worker.email === jobAssignment.worker.email
            ? { ...app, applicationStatus: "rejected" }
            : app
        );
        setJobAssignments(updatedAssignments);
      } else {
        alert("Failed to reject application");
      }
    } catch (error) {
      console.error("Error rejecting application:", error);
      alert("Error rejecting application");
    }
  }
};

  const user = {
    initials: homeowner ? homeowner.name.split(' ').map(n => n[0]).join('').toUpperCase() : "U",
    name: homeowner ? homeowner.name : "User",
    firstName: homeowner ? homeowner.name.split(' ')[0] : "User",
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return "#ffc107";
      case "approved": return "#28a745";
      case "rejected": return "#dc3545";
      default: return "#6c757d";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return "Invalid Date";
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading job applications...</div>
      </div>
    );
  }

  return (
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" />
      
      <style>{`
        * {
          font-family: 'Poppins', sans-serif;
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
          color: var(--primary-color, #41644a);
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
          color: var(--primary-color, #41644a);
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
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .dashboard {
          padding: 30px 0;
        }
        
        .welcome-card {
          background-color: var(--primary-color, #41644a);
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
        
        .applications-section {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        
        .section-header {
          background: #f8f9fa;
          padding: 20px;
          border-bottom: 1px solid #dee2e6;
        }
        
        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
          margin: 0;
        }
        
        .applications-grid {
          padding: 20px;
          display: grid;
          gap: 20px;
        }
        
        .application-card {
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 20px;
          transition: all 0.3s ease;
        }
        
        .application-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }
        
        .application-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 15px;
        }
        
        .job-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 5px;
        }
        
        .job-meta {
          display: flex;
          gap: 15px;
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 15px;
        }
        
        .meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .worker-info {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 6px;
          margin-bottom: 15px;
        }
        
        .worker-name {
          font-weight: 600;
          color: #333;
          margin-bottom: 5px;
        }
        
        .worker-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          font-size: 0.9rem;
          color: #666;
        }
        
        .worker-detail {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }
        
        .approve-btn {
          background: #28a745;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .approve-btn:hover {
          background: #218838;
          transform: translateY(-1px);
        }
        
        .reject-btn {
          background: #dc3545;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .reject-btn:hover {
          background: #c82333;
          transform: translateY(-1px);
        }
        
        .no-applications {
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }
        
        .no-applications i {
          font-size: 4rem;
          color: #ddd;
          margin-bottom: 20px;
        }
        
        .error-message {
          background: #f8d7da;
          color: #721c24;
          padding: 15px;
          border-radius: 6px;
          margin-bottom: 20px;
          border: 1px solid #f5c6cb;
        }
        
        @media (max-width: 768px) {
          .worker-details {
            grid-template-columns: 1fr;
          }
          
          .application-header {
            flex-direction: column;
            gap: 10px;
          }
          
          .actions {
            justify-content: stretch;
          }
          
          .approve-btn, .reject-btn {
            flex: 1;
          }
          
          .dashboard-navbar {
            flex-direction: column;
            gap: 15px;
            padding: 15px;
          }
        }
      `}</style>

      {/* Navbar */}
      <nav className="dashboard-navbar">
        <div className="logo">
          <i className="fas fa-home-user"></i>
          HomeManager
        </div>
        <div className="nav-links">
          <Link to="/main"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
          <Link to="/Req_main"><i className="fas fa-tools"></i> Request Maintenance</Link>
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

      <div className="container">
        <section className="dashboard">
          {/* Welcome Card */}
          <div className="welcome-card">
            <h1>Maintenance Applications, {user.firstName}</h1>
            <div className="date-display">
              <i className="far fa-calendar-alt"></i>
              <span style={{ marginLeft: 8 }}>{currentDate}</span>
            </div>
            <p>Review and approve maintenance worker applications for your property.</p>
            <div className="quick-stats">
              <div className="stat">
                <h3>Total Applications</h3>
                <p>{jobAssignments.length}</p>
              </div>
              <div className="stat">
                <h3>Pending</h3>
                <p>{jobAssignments.filter(app => app.applicationStatus === "pending").length}</p>
              </div>
              <div className="stat">
                <h3>Approved</h3>
                <p>{jobAssignments.filter(app => app.applicationStatus === "approved").length}</p>
              </div>
              <div className="stat">
                <h3>Rejected</h3>
                <p>{jobAssignments.filter(app => app.applicationStatus === "rejected").length}</p>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Applications Section */}
          <div className="applications-section">
            <div className="section-header">
              <h2 className="section-title">
                <i className="fas fa-clipboard-list"></i> Worker Applications
              </h2>
            </div>
            
            <div className="applications-grid">
              {jobAssignments.length > 0 ? (
                jobAssignments.map((assignment) => (
                  <div key={assignment.id} className="application-card">
                    <div className="application-header">
                      <div>
                        <h3 className="job-title">{assignment.job?.issueTitle || 'No Title'}</h3>
                        <div className="job-meta">
                          <div className="meta-item">
                            <i className="fas fa-tools"></i>
                            <span style={{ textTransform: 'capitalize' }}>{assignment.job?.serviceType || 'Unknown'}</span>
                          </div>
                          <div className="meta-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <span style={{ textTransform: 'capitalize' }}>{assignment.job?.roomLocation || 'Unknown'}</span>
                          </div>
                          <div className="meta-item">
                            <i className="fas fa-calendar"></i>
                            <span>{formatDate(assignment.job?.preferredDate)}</span>
                          </div>
                        </div>
                      </div>
                      <span 
                        className="status-badge"
                        style={{ 
                          backgroundColor: getStatusColor(assignment.applicationStatus) + '20',
                          color: getStatusColor(assignment.applicationStatus),
                          border: `1px solid ${getStatusColor(assignment.applicationStatus)}40`
                        }}
                      >
                        {assignment.applicationStatus || 'Unknown'}
                      </span>
                    </div>

                    {/* Worker Information */}
                    <div className="worker-info">
                      <div className="worker-name">
                        <i className="fas fa-user"></i> {assignment.worker?.name || 'Unknown Worker'}
                      </div>
                      <div className="worker-details">
                        <div className="worker-detail">
                          <i className="fas fa-envelope"></i>
                          <span>{assignment.worker?.email || 'No email'}</span>
                        </div>
                        <div className="worker-detail">
                          <i className="fas fa-phone"></i>
                          <span>{assignment.worker?.phone || 'No phone'}</span>
                        </div>
                        <div className="worker-detail">
                          <i className="fas fa-tools"></i>
                          <span style={{ textTransform: 'capitalize' }}>{assignment.worker?.skill || 'Unknown skill'}</span>
                        </div>
                        <div className="worker-detail">
                          <i className="fas fa-star"></i>
                          <span>{assignment.worker?.rating ? `${assignment.worker.rating}/5.0` : 'No rating'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Job Description */}
                    <p style={{ color: '#555', marginBottom: '15px' }}>
                      {assignment.job?.issueDescription || 'No description available'}
                    </p>

                    {/* Action Buttons */}
                    {assignment.applicationStatus === "pending" && (
                      <div className="actions">
                        <button 
                          className="approve-btn"
                          onClick={() => handleApproveApplication(assignment)}
                        >
                          <i className="fas fa-check"></i>
                          Approve
                        </button>
                        <button 
                          className="reject-btn"
                          onClick={() => handleRejectApplication(assignment)}
                        >
                          <i className="fas fa-times"></i>
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="no-applications">
                  <i className="fas fa-clipboard"></i>
                  <h3>No Applications Found</h3>
                  <p>You don't have any worker applications yet.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

Approve.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
};

export default Approve;