
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li>
            <button onClick={() => handleNavigation('/user-creation')}>User Creation</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('/attendance')}>Attendance Check</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('/employees-data')}>Employees Data</button>
          </li>
<li>
  <button onClick={()=>{handleNavigation('/admin-login')}}>LogOut</button>
</li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;
