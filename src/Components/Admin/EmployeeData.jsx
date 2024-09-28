import React, { useState, useEffect } from 'react';
import './EmployeeData.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const EmployeesData = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3000/employees');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEditClick = (emp_code) => {
    // console.log("is id" , id);
    console.log('sending data from employeedata component',emp_code);
    navigate(`/edit-employee/${emp_code}`);
  };

  return ( 
    <>
    <div className="employees-data-container">
      <h1 className="employees-data-title">Employees Data</h1>
      <table className="employees-data-table">
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Date of Birth</th>
            <th>Date of Joining</th>
            <th>Date of Leaving</th>
            <th>Created Date</th>
            <th>Created By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.emp_code}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.DOB}</td>
              <td>{employee.date_of_joining}</td>
              <td>{employee.date_of_leaving}</td>
              <td>{employee.created_date}</td>
              <td>{employee.created_by ? 'Admin' : 'Employee'}</td>
              <td>
                <button className="edit-button" onClick={() => handleEditClick(employee.emp_code)}>Edit</button>
              </td>
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

};

export default EmployeesData;
