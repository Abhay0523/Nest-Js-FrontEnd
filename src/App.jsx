import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/Admin/LoginPage';
import AdminDashboard from './Components/Admin/AdminDashBoard';
import UserCreation from './Components/Admin/UserCreation';
import AttendanceCheck from './Components/Admin/AttendanceCheck';
import EmployeesData from './Components/Admin/EmployeeData';
import EmployeeDashboard from './Components/EmployeeDashboard';
import UserCreationJSX from './Components/UserCreationEmp';
import EmployeeLoginPage from './Components/EmployeeLoginPage'; 
import MainLogin from './Components/MainLogin';
import EditEmployee from './Components/Admin/EditEmployee';
import NavigateAttendance from './Components/Navigate-Attendance';

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
        <Route path="/edit-employee/:emp_code" element={<EditEmployee />} /> 
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/attendance" element={<AttendanceCheck />} />
        <Route path="/employees-data" element={<EmployeesData />} />
        <Route path="navigate-attendance" element={<NavigateAttendance/>}/>
      </Routes>
    </Router>
  );
}

export default App;
