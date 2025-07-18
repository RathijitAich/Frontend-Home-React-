import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const tools = [
    {
      icon: '🏠',
      title: 'Room Setup',
      description: 'Configure your rooms and electrical devices for accurate expense tracking and management.',
      path: '/room-setup'
    },
    {
      icon: '⚡',
      title: 'Electricity Bill Calculator',
      description: 'Calculate your electricity expenses based on your configured rooms and devices.',
      path: '/electricity'
    },
    {
      icon: '🛒',
      title: 'Groceries Expense Tracker',
      description: 'Keep track of your grocery expenses and monitor your spending habits over time.',
      path: '/groceries'
    }
  ];

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          color: #333;
          line-height: 1.6;
        }

        .home-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .back-button {
          position: absolute;
          top: 2rem;
          left: 2rem;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          z-index: 2;
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .home-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
          animation: float 20s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .hero-section {
          text-align: center;
          margin-bottom: 4rem;
          z-index: 1;
          position: relative;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          color: white;
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          margin-bottom: 1rem;
          animation: slideInUp 1s ease-out;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 300;
          max-width: 600px;
          margin: 0 auto;
          animation: slideInUp 1s ease-out 0.2s both;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          width: 100%;
          margin-bottom: 4rem;
          z-index: 1;
          position: relative;
        }

        .tool-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2.5rem;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid rgba(255, 255, 255, 0.3);
          position: relative;
          overflow: hidden;
          animation: slideInUp 1s ease-out 0.4s both;
        }

        .tool-card:nth-child(2) {
          animation-delay: 0.6s;
        }

        .tool-card:nth-child(3) {
          animation-delay: 0.8s;
        }

        .tool-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .tool-card:hover::before {
          left: 100%;
        }

        .tool-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
        }

        .tool-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          display: block;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        .tool-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .tool-description {
          color: #666;
          font-size: 1rem;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .tool-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          position: relative;
          overflow: hidden;
        }

        .tool-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .tool-button:hover::before {
          left: 100%;
        }

        .tool-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        .tool-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 10px rgba(102, 126, 234, 0.4);
        }

        .footer {
          text-align: center;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          margin-top: auto;
          padding: 2rem 0;
          z-index: 1;
          position: relative;
        }

        @media (max-width: 768px) {
          .home-container {
            padding: 1rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .tools-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .tool-card {
            padding: 2rem;
          }

          .tool-icon {
            font-size: 3rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }

          .tool-card {
            padding: 1.5rem;
          }

          .tool-title {
            font-size: 1.25rem;
          }

          .tool-description {
            font-size: 0.9rem;
          }
        }
      `}</style>
      
      <div className="home-container">
        <button 
          className="back-button"
          onClick={() => navigate('/main')}
        >
          ← Back to Main
        </button>
        
        <div className="hero-section">
          <h1 className="hero-title">Expense Tracker</h1>
          <p className="hero-subtitle">Track and manage your daily expenses efficiently</p>
        </div>
        
        <div className="tools-grid">
          {tools.map((tool, index) => (
            <div key={index} className="tool-card">
              <span className="tool-icon">{tool.icon}</span>
              <h2 className="tool-title">{tool.title}</h2>
              <p className="tool-description">{tool.description}</p>
              <button 
                className="tool-button"
                onClick={() => navigate(tool.path)}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
        
        <div className="footer">
          <p>© 2025 Expense Tracker | All Rights Reserved</p>
        </div>
      </div>
    </>
  );
};

export default Home;