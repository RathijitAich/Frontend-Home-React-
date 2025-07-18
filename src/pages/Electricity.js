import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Electricity = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [unitCost, setUnitCost] = useState(5.0);
  const [period, setPeriod] = useState('daily');
  const [result, setResult] = useState(null);

  // Load rooms from localStorage on component mount
  useEffect(() => {
    const savedRooms = localStorage.getItem('homeRooms');
    if (savedRooms) {
      setRooms(JSON.parse(savedRooms));
    }
  }, []);

  const calculate = () => {
    let totalKWh = 0;
    rooms.forEach(room => {
      room.devices.forEach(device => {
        const watts = parseFloat(device.watts) || 0;
        const hours = parseFloat(device.hours) || 0;
        const quantity = parseInt(device.quantity) || 1;
        totalKWh += (watts * hours * quantity) / 1000;
      });
    });

    const multiplier = period === 'monthly' ? 30 : period === 'yearly' ? 365 : 1;
    const total = totalKWh * unitCost * multiplier;
    setResult({
      cost: total.toFixed(2),
      period,
      totalKWh: totalKWh.toFixed(2)
    });
  };

  const reset = () => {
    setUnitCost(5.0);
    setPeriod('daily');
    setResult(null);
  };

  // Inline styles to avoid affecting other pages
  const styles = {
    electricityPage: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      margin: 0,
      padding: 0,
    },
    electricityHeader: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      color: '#ffffff',
      padding: '3rem 2rem',
      textAlign: 'center',
      position: 'relative',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      margin: 0,
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    subtitle: {
      fontSize: '1.2rem',
      margin: '0.5rem 0 0 0',
      opacity: 0.9,
      fontWeight: '400',
    },
    backBtn: {
      position: 'absolute',
      top: '2rem',
      left: '2rem',
      background: 'rgba(255, 255, 255, 0.2)',
      color: '#ffffff',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    setupBtn: {
      position: 'absolute',
      top: '2rem',
      right: '2rem',
      background: 'rgba(34, 197, 94, 0.9)',
      color: '#ffffff',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
    },
    calculatorContainer: {
      background: '#ffffff',
      borderRadius: '20px',
      padding: '2.5rem',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0',
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '2rem',
      color: '#1e293b',
    },
    summaryContainer: {
      marginBottom: '2rem',
      padding: '1.5rem',
      background: '#f8fafc',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
    },
    summaryTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '1rem',
    },
    roomSummary: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
      marginBottom: '1rem',
    },
    roomSummaryItem: {
      padding: '1rem',
      background: '#ffffff',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
    },
    roomName: {
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '0.5rem',
    },
    deviceCount: {
      fontSize: '0.9rem',
      color: '#64748b',
    },
    noDataMessage: {
      textAlign: 'center',
      color: '#64748b',
      fontSize: '1.1rem',
      margin: '2rem 0',
      padding: '2rem',
      background: '#f8fafc',
      borderRadius: '12px',
      border: '2px dashed #e2e8f0',
    },
    setupPrompt: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      color: '#ffffff',
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: 'none',
      marginTop: '1rem',
    },
    inputGroup: {
      marginTop: '2rem',
    },
    inputGroupLabel: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '500',
      color: '#1e293b',
    },
    inputGroupInput: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
    },
    timePeriod: {
      marginTop: '2rem',
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
    },
    timePeriodLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
      padding: '0.75rem 1rem',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      background: '#ffffff',
    },
    timePeriodRadio: {
      margin: 0,
      width: '1.2rem',
      height: '1.2rem',
    },
    actions: {
      marginTop: '2rem',
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
    },
    actionBtn: {
      flex: 1,
      minWidth: '150px',
      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      color: '#ffffff',
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
    },
    actionBtnDanger: {
      flex: 1,
      minWidth: '150px',
      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
      color: '#ffffff',
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
    },
    resultContainer: {
      marginTop: '2rem',
      padding: '2rem',
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
      border: '2px solid #6366f1',
      borderRadius: '16px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    resultTitle: {
      marginTop: 0,
      color: '#1e293b',
      fontSize: '1.2rem',
      fontWeight: '600',
    },
    resultValue: {
      fontSize: '2.5rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      margin: '1rem 0',
    },
    resultPeriod: {
      color: '#64748b',
      fontSize: '1.1rem',
      marginBottom: 0,
    },
    resultDetails: {
      marginTop: '1rem',
      padding: '1rem',
      background: 'rgba(255, 255, 255, 0.5)',
      borderRadius: '8px',
      fontSize: '0.9rem',
      color: '#64748b',
    },
  };

  return (
    <div style={styles.electricityPage}>
      <header style={styles.electricityHeader}>
        <h1 style={styles.title}>Electricity Bill Calculator</h1>
        <p style={styles.subtitle}>Calculate your electricity expenses based on your room setup</p>
        <button 
          onClick={() => navigate('/home')} 
          style={styles.backBtn}
          onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
        >
          ← Back to Home
        </button>
        <button 
          onClick={() => navigate('/room-setup')} 
          style={styles.setupBtn}
          onMouseOver={(e) => e.target.style.background = 'rgba(34, 197, 94, 1)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(34, 197, 94, 0.9)'}
        >
          Setup Rooms →
        </button>
      </header>

      <main style={styles.container}>
        <div style={styles.calculatorContainer}>
          <h2 style={styles.sectionTitle}>Room & Device Summary</h2>

          {rooms.length > 0 ? (
            <div style={styles.summaryContainer}>
              <h3 style={styles.summaryTitle}>Your Current Setup</h3>
              <div style={styles.roomSummary}>
                {rooms.map((room, index) => (
                  <div key={room.id} style={styles.roomSummaryItem}>
                    <div style={styles.roomName}>{room.name || `Room ${index + 1}`}</div>
                    <div style={styles.deviceCount}>{room.devices.length} device(s)</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={styles.noDataMessage}>
              <div>No rooms configured yet!</div>
              <div>Set up your rooms and devices first to calculate electricity bills.</div>
              <button 
                onClick={() => navigate('/room-setup')}
                style={styles.setupPrompt}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                🏠 Setup Rooms & Devices
              </button>
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.inputGroupLabel}>Unit Cost (Taka per kWh)</label>
            <input
              type="number"
              step="0.01"
              value={unitCost}
              onChange={(e) => setUnitCost(e.target.value)}
              style={styles.inputGroupInput}
              onFocus={(e) => e.target.style.borderColor = '#6366f1'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <div style={styles.timePeriod}>
            {['daily', 'monthly', 'yearly'].map(t => (
              <label 
                key={t} 
                style={{
                  ...styles.timePeriodLabel,
                  ...(period === t ? { borderColor: '#6366f1', background: 'rgba(99, 102, 241, 0.05)' } : {})
                }}
              >
                <input
                  type="radio"
                  name="time-period"
                  checked={period === t}
                  onChange={() => setPeriod(t)}
                  style={styles.timePeriodRadio}
                />
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </label>
            ))}
          </div>

          <div style={styles.actions}>
            <button 
              style={{...styles.actionBtn, ...(rooms.length === 0 ? {opacity: 0.5, cursor: 'not-allowed'} : {})}} 
              onClick={calculate}
              disabled={rooms.length === 0}
              onMouseOver={(e) => rooms.length > 0 && (e.target.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => rooms.length > 0 && (e.target.style.transform = 'translateY(0)')}
            >
              Calculate Bill
            </button>
            <button 
              style={styles.actionBtnDanger} 
              onClick={reset}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Reset Calculation
            </button>
          </div>

          {result && (
            <div style={styles.resultContainer}>
              <h3 style={styles.resultTitle}>Estimated Electricity Bill</h3>
              <div style={styles.resultValue}>{result.cost} Taka</div>
              <p style={styles.resultPeriod}>per {result.period}</p>
              <div style={styles.resultDetails}>
                Total Energy Consumption: {result.totalKWh} kWh per {result.period === 'daily' ? 'day' : result.period === 'monthly' ? 'month' : 'year'}
                <br />
                Unit Rate: {unitCost} Taka per kWh
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Electricity;