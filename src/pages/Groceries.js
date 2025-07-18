import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const Groceries = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', quantity: '', unit: 'kg', price: '' });
  const navigate = useNavigate();

  // Color constants
  const colors = {
    primary: '#8ecae6',
    secondary: 'SkyBlue',
    accent: 'White',
    lightBg: '#f8f9fa',
    white: '#ffffff',
    danger: '#e63946',
    gray: '#6c757d',
    borderGray: '#ddd',
    blue: '#8ecae6'
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    const { name, quantity, unit, price } = form;
    if (!name || quantity <= 0 || price <= 0) return;

    const newItem = {
      name,
      quantity: parseFloat(quantity),
      unit,
      price: parseFloat(price)
    };
    setItems([...items, newItem]);
    setForm({ name: '', quantity: '', unit: 'kg', price: '' });
  };

  const handleDelete = (index) => {
    const newList = [...items];
    newList.splice(index, 1);
    setItems(newList);
  };

  const clearAll = () => {
    if (window.confirm('Clear all items?')) setItems([]);
  };

  const downloadPDF = () => {
    if (items.length === 0) {
      alert('No items to download!');
      return;
    }

    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();

    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('Groceries Expense Report', 20, 20);

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${currentDate}`, 20, 30);

    const headers = ['Item', 'Quantity', 'Unit', 'Price (Taka)', 'Total (Taka)'];
    const headerY = 50;
    const colWidths = [40, 25, 25, 30, 30];
    let xPos = 20;

    doc.setFont(undefined, 'bold');
    headers.forEach((header, index) => {
      doc.text(header, xPos, headerY);
      xPos += colWidths[index];
    });

    doc.setLineWidth(0.5);
    doc.line(20, headerY + 2, 170, headerY + 2);

    doc.setFont(undefined, 'normal');
    let yPos = headerY + 10;

    items.forEach((item) => {
      const rowData = [
        item.name,
        item.quantity.toString(),
        item.unit,
        item.price.toFixed(2),
        (item.quantity * item.price).toFixed(2)
      ];

      xPos = 20;
      rowData.forEach((data, i) => {
        doc.text(data, xPos, yPos);
        xPos += colWidths[i];
      });

      yPos += 8;
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
    });

    yPos += 5;
    doc.line(20, yPos, 170, yPos);
    yPos += 10;

    const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(14);
    doc.text(`Total Amount: ${total.toFixed(2)} Taka`, 20, yPos);

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(150, 150, 150);
    doc.text('Generated by Groceries Expense Tracker', 20, 290);

    doc.save(`groceries-report-${currentDate.replace(/\//g, '-')}.pdf`);
  };

  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  // Styles
  const containerStyle = {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    margin: 0,
    padding: 0,
    minHeight: '100vh'
  };

  const headerStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    color: '#ffffff',
    padding: '3rem 2rem',
    textAlign: 'center',
    position: 'relative',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    margin: 0,
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    color: '#ffffff'
  };

  const subtitleStyle = {
    fontSize: '1.2rem',
    opacity: 0.9,
    marginTop: '0.5rem',
    fontWeight: '400',
    color: '#ffffff'
  };

  const mainContainerStyle = {
    maxWidth: '1000px',
    margin: '2rem auto',
    padding: '1rem'
  };

  const backBtnStyle = {
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '500',
    marginBottom: '1.5rem'
  };

  const formSectionStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '2rem',
    background: '#ffffff',
    padding: '2.5rem',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0'
  };

  const inputStyle = {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    flex: 1,
    minWidth: '120px',
    transition: 'all 0.3s ease',
    background: '#ffffff'
  };

  const addBtnStyle = {
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#ffffff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '500',
    fontSize: '0.9rem'
  };

  const tableSectionStyle = {
    background: '#ffffff',
    padding: '2.5rem',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    color: '#1e293b'
  };

  const thStyle = {
    padding: '0.75rem',
    border: '1px solid #e2e8f0',
    textAlign: 'center',
    backgroundColor: '#f8fafc',
    fontWeight: 'bold',
    color: '#1e293b'
  };

  const tdStyle = {
    padding: '0.75rem',
    border: '1px solid #e2e8f0',
    textAlign: 'center',
    color: '#1e293b'
  };

  const tfootStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f1f3f4',
    color: '#1e293b'
  };

  const deleteBtnStyle = {
    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    color: '#ffffff',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  };

  const clearBtnStyle = {
    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    color: '#ffffff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '500',
    marginTop: '1rem',
    transition: 'all 0.3s ease'
  };

  const downloadBtnStyle = {
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#ffffff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '500',
    marginBottom: '1rem',
    transition: 'all 0.3s ease'
  };

  const emptyMsgStyle = {
    fontStyle: 'italic',
    color: '#64748b',
    textAlign: 'center',
    padding: '2rem'
  };

  const footerStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    color: '#ffffff',
    textAlign: 'center',
    padding: '1.5rem 0',
    marginTop: '3rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Groceries Expense Tracker</h1>
        <p style={subtitleStyle}>Monitor your grocery costs and stay within budget</p>
      </header>

      <main style={mainContainerStyle}>
        <button 
          onClick={() => navigate('/home')}
          style={backBtnStyle}
          onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
        >
          ← Back to Home
        </button>

        <div style={formSectionStyle}>
          <h2 style={{ marginBottom: '1rem', color: '#1e293b', width: '100%' }}>Add New Item</h2>
          <input 
            name="name" 
            placeholder="Item Name" 
            value={form.name} 
            onChange={handleChange} 
            style={inputStyle} 
          />
          <input 
            name="quantity" 
            type="number" 
            min="0.1" 
            step="0.1" 
            placeholder="Quantity" 
            value={form.quantity} 
            onChange={handleChange} 
            style={inputStyle} 
          />
          <select 
            name="unit" 
            value={form.unit} 
            onChange={handleChange} 
            style={inputStyle}
          >
            <option value="kg">kg</option>
            <option value="liter">liter</option>
            <option value="piece">piece</option>
            <option value="packet">packet</option>
          </select>
          <input 
            name="price" 
            type="number" 
            min="0.1" 
            step="0.01" 
            placeholder="Price (Taka)" 
            value={form.price} 
            onChange={handleChange} 
            style={inputStyle} 
          />
          <button 
            onClick={handleAdd} 
            style={addBtnStyle}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Add Item
          </button>
        </div>

        <div style={tableSectionStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ color: '#1e293b', margin: 0 }}>Items List</h2>
            {items.length > 0 && (
              <button 
                onClick={downloadPDF} 
                style={downloadBtnStyle}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                📄 Download PDF
              </button>
            )}
          </div>

          {items.length > 0 ? (
            <>
              <div style={{ overflowX: 'auto' }}>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Item</th>
                      <th style={thStyle}>Quantity</th>
                      <th style={thStyle}>Unit</th>
                      <th style={thStyle}>Price (Taka)</th>
                      <th style={thStyle}>Total (Taka)</th>
                      <th style={thStyle}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ ...tdStyle, fontWeight: 'bold' }}>{item.name}</td>
                        <td style={tdStyle}>{item.quantity}</td>
                        <td style={tdStyle}>{item.unit}</td>
                        <td style={tdStyle}>{item.price.toFixed(2)}</td>
                        <td style={{ ...tdStyle, fontWeight: 'bold' }}>{(item.quantity * item.price).toFixed(2)}</td>
                        <td style={tdStyle}>
                          <button 
                            onClick={() => handleDelete(idx)} 
                            style={deleteBtnStyle}
                            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={tfootStyle}>
                      <td colSpan="4" style={tdStyle}>Total Amount:</td>
                      <td style={{ ...tdStyle, color: colors.primary, fontWeight: 'bold' }}>{total.toFixed(2)} Taka</td>
                      <td style={tdStyle}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button 
                  onClick={clearAll} 
                  style={clearBtnStyle}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  Clear All Items
                </button>
              </div>
            </>
          ) : (
            <div style={emptyMsgStyle}>
              <p>No items added yet. Start by adding your first grocery item!</p>
            </div>
          )}
        </div>
      </main>

      <footer style={footerStyle}>
        <p style={{ margin: 0 }}>© 2025 Expense Tracker | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Groceries;