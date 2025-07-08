import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Electricity = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [unitCost, setUnitCost] = useState(5.0);
  const [period, setPeriod] = useState('daily');
  const [result, setResult] = useState(null);

  const addRoom = () => {
    setRooms([...rooms, {
      id: Date.now(),
      name: '',
      devices: [{ id: Date.now() + 1, name: '', watts: '', hours: '', quantity: 1 }]
    }]);
  };

  const updateRoom = (index, field, value) => {
    const updated = [...rooms];
    updated[index][field] = value;
    setRooms(updated);
  };

  const addDevice = (roomIndex) => {
    const updated = [...rooms];
    updated[roomIndex].devices.push({
      id: Date.now(),
      name: '',
      watts: '',
      hours: '',
      quantity: 1
    });
    setRooms(updated);
  };

  const updateDevice = (roomIndex, deviceIndex, field, value) => {
    const updated = [...rooms];
    updated[roomIndex].devices[deviceIndex][field] = value;
    setRooms(updated);
  };

  const removeDevice = (roomIndex, deviceIndex) => {
    const updated = [...rooms];
    updated[roomIndex].devices.splice(deviceIndex, 1);
    setRooms(updated);
  };

  const removeRoom = (index) => {
    const updated = [...rooms];
    updated.splice(index, 1);
    setRooms(updated);
  };

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
      period
    });
  };

  const reset = () => {
    setRooms([]);
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
    roomContainer: {
      marginBottom: '2rem',
      border: '1px solid #e2e8f0',
      padding: '1.5rem',
      borderRadius: '16px',
      background: '#f8fafc',
      transition: 'all 0.3s ease',
    },
    roomHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      gap: '1rem',
    },
    roomHeaderInput: {
      flex: 1,
      fontSize: '1.1rem',
      fontWeight: '500',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '0.75rem',
      transition: 'all 0.3s ease',
      background: '#ffffff',
    },
    deviceItem: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
      gap: '1rem',
      marginBottom: '1rem',
      padding: '1rem',
      background: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      transition: 'all 0.3s ease',
    },
    deviceInput: {
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '0.75rem',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      background: '#ffffff',
    },
    btn: {
      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      color: '#ffffff',
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
    },
    btnDanger: {
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
    btnSmall: {
      fontSize: '0.85rem',
      padding: '0.5rem 1rem',
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
  };

  return (
    <div style={styles.electricityPage}>
      <header style={styles.electricityHeader}>
        <h1 style={styles.title}>Electricity Expense</h1>
        <p style={styles.subtitle}>Track your electricity consumption and estimate costs</p>
        <button 
          onClick={() => navigate('/home')} 
          style={styles.backBtn}
          onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
        >
          ← Back to Home
        </button>
      </header>

      <main style={styles.container}>
        <div style={styles.calculatorContainer}>
          <h2 style={styles.sectionTitle}>Add Rooms and Devices</h2>

          {rooms.map((room, roomIndex) => (
            <div style={styles.roomContainer} key={room.id}>
              <div style={styles.roomHeader}>
                <input
                  type="text"
                  placeholder="Room Name"
                  value={room.name}
                  onChange={(e) => updateRoom(roomIndex, 'name', e.target.value)}
                  style={styles.roomHeaderInput}
                  onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
                <button 
                  style={{...styles.btnDanger, ...styles.btnSmall}} 
                  onClick={() => removeRoom(roomIndex)}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  Remove Room
                </button>
              </div>

              {room.devices.map((device, deviceIndex) => (
                <div style={styles.deviceItem} key={device.id}>
                  <input
                    type="text"
                    placeholder="Device Name"
                    value={device.name}
                    onChange={(e) => updateDevice(roomIndex, deviceIndex, 'name', e.target.value)}
                    style={styles.deviceInput}
                    onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <input
                    type="number"
                    placeholder="Watts"
                    value={device.watts}
                    onChange={(e) => updateDevice(roomIndex, deviceIndex, 'watts', e.target.value)}
                    style={styles.deviceInput}
                    onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <input
                    type="number"
                    placeholder="Hours"
                    value={device.hours}
                    onChange={(e) => updateDevice(roomIndex, deviceIndex, 'hours', e.target.value)}
                    style={styles.deviceInput}
                    onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={device.quantity}
                    onChange={(e) => updateDevice(roomIndex, deviceIndex, 'quantity', e.target.value)}
                    style={styles.deviceInput}
                    onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <button 
                    style={{...styles.btnDanger, ...styles.btnSmall}} 
                    onClick={() => removeDevice(roomIndex, deviceIndex)}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button 
                style={{...styles.btn, ...styles.btnSmall}} 
                onClick={() => addDevice(roomIndex)}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Add Device
              </button>
            </div>
          ))}

          <button 
            style={styles.btn} 
            onClick={addRoom}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Add New Room
          </button>

          <div style={styles.inputGroup}>
            <label style={styles.inputGroupLabel}>Unit Cost (Taka)</label>
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
              style={styles.actionBtn} 
              onClick={calculate}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Calculate Expense
            </button>
            <button 
              style={styles.actionBtnDanger} 
              onClick={reset}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Reset
            </button>
          </div>

          {result && (
            <div style={styles.resultContainer}>
              <h3 style={styles.resultTitle}>Estimated Electricity Expense</h3>
              <div style={styles.resultValue}>{result.cost} Taka</div>
              <p style={styles.resultPeriod}>per {result.period}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Electricity;