// src/pages/Electricity.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/electricity.css';

const Electricity = () => {
  const [rooms, setRooms] = useState([]);
  const [unitCost, setUnitCost] = useState(5.0);
  const [period, setPeriod] = useState('daily');
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

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

  return (
    <div className="electricity-page">
      <header className="electricity-header">
        <h1 className="title">Electricity Expense</h1>
        <p className="subtitle">Track your electricity consumption and estimate costs</p>
        <button onClick={() => navigate('/')} className="btn back-btn">← Back to Home</button>
      </header>

      <main className="container">
        <div className="calculator-container">
          <h2 className="section-title">Add Rooms and Devices</h2>

          {rooms.map((room, roomIndex) => (
            <div className="room-container" key={room.id}>
              <div className="room-header">
                <input
                  type="text"
                  placeholder="Room Name"
                  value={room.name}
                  onChange={(e) => updateRoom(roomIndex, 'name', e.target.value)}
                />
                <button className="btn btn-danger btn-small" onClick={() => removeRoom(roomIndex)}>Remove Room</button>
              </div>

              {room.devices.map((device, deviceIndex) => (
                <div className="device-item" key={device.id}>
                  <input
                    type="text"
                    placeholder="Device Name"
                    value={device.name}
                    onChange={(e) => updateDevice(roomIndex, deviceIndex, 'name', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Watts"
                    value={device.watts}
                    onChange={(e) => updateDevice(roomIndex, deviceIndex, 'watts', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Hours"
                    value={device.hours}
                    onChange={(e) => updateDevice(roomIndex, deviceIndex, 'hours', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={device.quantity}
                    onChange={(e) => updateDevice(roomIndex, deviceIndex, 'quantity', e.target.value)}
                  />
                  <button className="btn btn-danger btn-small" onClick={() => removeDevice(roomIndex, deviceIndex)}>✕</button>
                </div>
              ))}

              <button className="btn btn-small" onClick={() => addDevice(roomIndex)}>Add Device</button>
            </div>
          ))}

          <button className="btn" onClick={addRoom}>Add New Room</button>

          <div className="input-group">
            <label>Unit Cost (Taka)</label>
            <input
              type="number"
              step="0.01"
              value={unitCost}
              onChange={(e) => setUnitCost(e.target.value)}
            />
          </div>

          <div className="time-period">
            {['daily', 'monthly', 'yearly'].map(t => (
              <label key={t}>
                <input
                  type="radio"
                  name="time-period"
                  checked={period === t}
                  onChange={() => setPeriod(t)}
                /> {t.charAt(0).toUpperCase() + t.slice(1)}
              </label>
            ))}
          </div>

          <div className="actions">
            <button className="btn" onClick={calculate}>Calculate Expense</button>
            <button className="btn btn-danger" onClick={reset}>Reset</button>
          </div>

          {result && (
            <div className="result-container">
              <h3>Estimated Electricity Expense</h3>
              <div className="result-value">{result.cost} Taka</div>
              <p>per {result.period}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Electricity;
