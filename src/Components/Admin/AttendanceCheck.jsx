import React, { useState, useEffect } from 'react';
import './AttendanceCheck.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

function AttendanceCheck() {
  const [punches, setPunches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateTerm, setDateTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPunches = async () => {
      const response = await fetch('http://localhost:3000/punch');
      const data = await response.json();
      setPunches(data);
    };
    fetchPunches();
  }, []);

  const formatTime = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const extractDate = (dateStr) => {
    return dateStr ? dateStr.substring(0, 10) : 'N/A';
  };

  const filteredPunches = punches.filter(punch => {
    const empCodeMatch = punch.emp.emp_code.toLowerCase().includes(searchTerm.toLowerCase());
    const dateMatch = extractDate(punch.punch_in_time) === dateTerm;
    return empCodeMatch && (!dateTerm || dateMatch);
  });

  return (
    <>
      <div className="attendance-container">
        <div className="filter-container">
          <label htmlFor="Search">Employee Code:
            <input type="text" value={searchTerm} className="search-input" placeholder='emp-code' onChange={(e) => { setSearchTerm(e.target.value) }} />
          </label>
          <label htmlFor="Date">Search by Date:
            <input type="date" value={dateTerm} className="date-input" onChange={(e) => { setDateTerm(e.target.value) }} />
          </label>
        </div>
        <h1 className="attendance-title">Attendance Check</h1>

        <table className="attendance-table">
          <thead>
            <tr>
              <th>Employee Code</th>
              <th>Date</th>
              <th>In Time</th>
              <th>Out Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredPunches.map((punch) => (
              <tr key={punch.id}>
                <td>{punch.emp.emp_code}</td>
                <td>{extractDate(punch.punch_in_time)}</td>
                <td>{formatTime(punch.punch_in_time)}</td>
                <td>{formatTime(punch.punch_out_time)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="back-button" onClick={() => navigate('/admin-dashboard')}>
        Back
      </button>
    </>
  );
}

export default AttendanceCheck;
