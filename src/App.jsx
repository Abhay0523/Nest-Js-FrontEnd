import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/Admin/LoginPage';
import AdminDashboard from './Components/Admin/AdminDashBoard';
import UserCreation from './Components/Admin/UserCreation';
import AttendanceCheck from './Components/Admin/AttendanceCheck';
import EmployeesData from './Components/Admin/EmployeeData';
// import EditEmployee from './Components/Admin/EditEmployee';
import UserCreationJSX from './Components/UserCreationEmp';
import EmployeeLoginPage from './Components/EmployeeLoginPage'; 
import MainLogin from './Components/MainLogin';
import EmployeeDashboard from './Components/EmployeeDashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLogin />} />
        <Route path="/admin-login" element={<LoginPage />} />
        <Route path="/employee-login" element={<EmployeeLoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-creation" element={<UserCreation />} />
        <Route path="/user-creation-EMP" element={<UserCreationJSX />} />

        <Route path="/attendance" element={<AttendanceCheck />} />
        <Route path="/employees-data" element={<EmployeesData />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        {/* <Route path="/edit-employee/:id" element={<EditEmployee />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
