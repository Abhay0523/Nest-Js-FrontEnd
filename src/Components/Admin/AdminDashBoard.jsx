import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Import the new CSS file 

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
        </div>
        <div className="dashboard-body">
          <nav>
            <ul className="dashboard-list">
              <li className="dashboard-list-item">
                <button 
                  className="dashboard-button-but" 
                  onClick={() => handleNavigation('/user-creation')}
                >
                  User Creation
                </button>
              </li>
              <li className="dashboard-list-item">
                <button 
                  className="dashboard-button-but" 
                  onClick={() => handleNavigation('/attendance')}
                >
                  Attendance Check
                </button>
              </li>
              <li className="dashboard-list-item">
                <button 
                  className="dashboard-button-but" 
                  onClick={() => handleNavigation('/employees-data')}
                >
                  Employees Data
                </button>
              </li>
              <li className="dashboard-list-item">
                <button 
                  className="dashboard-button-but  logout-button" 
                  onClick={() => handleNavigation('/')}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      
    </div>
  );
};

export default AdminDashboard;
