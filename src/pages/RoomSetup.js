import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomSetup = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  // Load rooms from localStorage and backend on component mount
  useEffect(() => {
    const loadRoomSetup = async () => {
      // First try to load from localStorage
      const savedRooms = localStorage.getItem('homeRooms');
      if (savedRooms) {
        setRooms(JSON.parse(savedRooms));
      }

      // Then try to load from backend
      const userEmail = localStorage.getItem('userEmail') || localStorage.getItem('email');
      if (userEmail) {
        try {
          const response = await fetch(`http://localhost:5000/api/room-setup/${encodeURIComponent(userEmail)}`);
          if (response.ok) {
            const data = await response.json();
            if (data.rooms && data.rooms.length > 0) {
              // Convert backend data format to frontend format
              const loadedRooms = data.rooms.map((room, index) => ({
                id: Date.now() + index,
                name: room.name,
                devices: room.devices.map((device, deviceIndex) => ({
                  id: Date.now() + index * 1000 + deviceIndex,
                  name: device.name,
                  watts: device.watts.toString(),
                  hours: device.hours.toString(),
                  quantity: device.quantity
                }))
              }));
              setRooms(loadedRooms);
            }
          }
        } catch (error) {
          console.error('Error loading room setup from backend:', error);
          // Continue with localStorage data if backend fails
        }
      }
    };

    loadRoomSetup();
  }, []);

  // Save rooms to localStorage whenever rooms state changes
  useEffect(() => {
    localStorage.setItem('homeRooms', JSON.stringify(rooms));
  }, [rooms]);

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

  const reset = () => {
    setRooms([]);
    localStorage.removeItem('homeRooms');
  };

  const saveSetup = async () => {
    try {
      // Get the logged-in user's email from localStorage or props
      const userEmail = localStorage.getItem('userEmail') || localStorage.getItem('email');
      
      if (!userEmail) {
        alert('Please log in to save your room setup.');
        return;
      }

      if (rooms.length === 0) {
        alert('Please add at least one room before saving.');
        return;
      }

      // Validate that all rooms have names and at least one device
      const invalidRooms = rooms.filter(room => 
        !room.name.trim() || 
        room.devices.length === 0 || 
        room.devices.some(device => !device.name.trim() || !device.watts || !device.hours)
      );

      if (invalidRooms.length > 0) {
        alert('Please ensure all rooms have names and all devices have complete information (name, watts, and hours).');
        return;
      }

      const setupData = {
        userEmail: userEmail,
        rooms: rooms.map(room => ({
          name: room.name,
          devices: room.devices.map(device => ({
            name: device.name,
            watts: parseFloat(device.watts),
            hours: parseFloat(device.hours),
            quantity: parseInt(device.quantity) || 1
          }))
        }))
      };

      const response = await fetch('http://localhost:5000/api/room-setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setupData)
      });

      if (response.ok) {
        const result = await response.json();
        alert('Room setup saved successfully!');
      } else {
        const error = await response.json();
        alert(`Failed to save setup: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving room setup:', error);
      alert('Failed to save room setup. Please check your connection and try again.');
    }
  };

  const loadFromDatabase = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail') || localStorage.getItem('email');
      
      if (!userEmail) {
        alert('Please log in to load your room setup.');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/room-setup/${encodeURIComponent(userEmail)}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.rooms && data.rooms.length > 0) {
          // Convert backend data format to frontend format
          const loadedRooms = data.rooms.map((room, index) => ({
            id: Date.now() + index,
            name: room.name,
            devices: room.devices.map((device, deviceIndex) => ({
              id: Date.now() + index * 1000 + deviceIndex,
              name: device.name,
              watts: device.watts.toString(),
              hours: device.hours.toString(),
              quantity: device.quantity
            }))
          }));
          setRooms(loadedRooms);
          alert('Room setup loaded successfully from database!');
        } else {
          alert('No saved room setup found in database.');
        }
      } else {
        const error = await response.json();
        alert(`Failed to load setup: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error loading room setup:', error);
      alert('Failed to load room setup. Please check your connection and try again.');
    }
  };

  // Inline styles
  const styles = {
    roomSetupPage: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      margin: 0,
      padding: 0,
    },
    roomSetupHeader: {
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
    calculateBtn: {
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
    setupContainer: {
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
    summaryContainer: {
      marginTop: '2rem',
      padding: '1.5rem',
      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))',
      border: '2px solid #22c55e',
      borderRadius: '16px',
    },
    summaryTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '1rem',
    },
    summaryStats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem',
    },
    statItem: {
      textAlign: 'center',
      padding: '1rem',
      background: '#ffffff',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
    },
    statValue: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#22c55e',
      margin: '0.5rem 0',
    },
    statLabel: {
      fontSize: '0.9rem',
      color: '#64748b',
    },
  };

  const getTotalDevices = () => {
    return rooms.reduce((total, room) => total + room.devices.length, 0);
  };

  const getTotalPower = () => {
    return rooms.reduce((total, room) => {
      return total + room.devices.reduce((roomTotal, device) => {
        const watts = parseFloat(device.watts) || 0;
        const quantity = parseInt(device.quantity) || 1;
        return roomTotal + (watts * quantity);
      }, 0);
    }, 0);
  };

  return (
    <div style={styles.roomSetupPage}>
      <header style={styles.roomSetupHeader}>
        <h1 style={styles.title}>Room & Device Setup</h1>
        <p style={styles.subtitle}>Configure your rooms and electrical devices for accurate cost calculations</p>
        <button 
          onClick={() => navigate('/home')} 
          style={styles.backBtn}
          onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
        >
          ← Back to Home
        </button>
        <button 
          onClick={() => navigate('/electricity')} 
          style={styles.calculateBtn}
          onMouseOver={(e) => e.target.style.background = 'rgba(34, 197, 94, 1)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(34, 197, 94, 0.9)'}
        >
          Calculate Bills →
        </button>
      </header>

      <main style={styles.container}>
        <div style={styles.setupContainer}>
          <h2 style={styles.sectionTitle}>Add Rooms and Devices</h2>

          {rooms.map((room, roomIndex) => (
            <div style={styles.roomContainer} key={room.id}>
              <div style={styles.roomHeader}>
                <input
                  type="text"
                  placeholder="Room Name (e.g., Living Room, Kitchen)"
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
                    placeholder="Device Name (e.g., LED Bulb, AC, Fan)"
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
                    placeholder="Hours/Day"
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

          <div style={styles.actions}>
            <button 
              style={styles.actionBtn} 
              onClick={saveSetup}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Save Setup to Database
            </button>
            <button 
              style={{...styles.actionBtn, background: 'linear-gradient(135deg, #22c55e, #16a34a)'}} 
              onClick={loadFromDatabase}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Load from Database
            </button>
            <button 
              style={styles.actionBtnDanger} 
              onClick={reset}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Reset All Data
            </button>
          </div>

          {rooms.length > 0 && (
            <div style={styles.summaryContainer}>
              <h3 style={styles.summaryTitle}>Setup Summary</h3>
              <div style={styles.summaryStats}>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>{rooms.length}</div>
                  <div style={styles.statLabel}>Total Rooms</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>{getTotalDevices()}</div>
                  <div style={styles.statLabel}>Total Devices</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>{getTotalPower().toFixed(0)}W</div>
                  <div style={styles.statLabel}>Total Power</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RoomSetup;
