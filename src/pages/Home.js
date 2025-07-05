import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  const navigate = useNavigate();

  const tools = [
    {
      icon: '⚡',
      title: 'Electricity Expense Calculator',
      description: 'Track your electricity usage by room and device to estimate and manage your electricity expenses.',
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
      <header className="main-header">
        <h1 className="title">Expense Tracker</h1>
        <p className="subtitle">Track and manage your daily expenses efficiently</p>
      </header>

      <main className="container">
        <div className="cards-container">
          {tools.map((tool, index) => (
            <div className="card" key={index}>
              <div className="card-icon">{tool.icon}</div>
              <h2 className="card-title">{tool.title}</h2>
              <p className="card-description">{tool.description}</p>
              <button className="btn" onClick={() => navigate(tool.path)}>Get Started</button>
            </div>
          ))}
        </div>
      </main>

      <footer>
        <p>© 2025 Expense Tracker | All Rights Reserved</p>
      </footer>
    </>
  );
};

export default Home;
