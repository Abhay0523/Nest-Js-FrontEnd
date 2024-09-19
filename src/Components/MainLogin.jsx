import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainLogin = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Select Login Role</h1>
      <button onClick={() => navigate('/admin-login')}>Log in as Admin</button>
      <button onClick={() => navigate('employee-login')}>Log in as Employee</button>
    </div>
  );
};

export default MainLogin;
