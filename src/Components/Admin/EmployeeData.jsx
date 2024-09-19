
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

const EmployeesData = () => {
  const [employees, setEmployees] = useState([]);

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

  return (
    <div>
      <h1>Employees Data</h1>
      <table>
        <thead>
          <tr>
            <th>Emp_ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Date Of Birth</th>
            <th>Date of Joining</th>
            <th>Date of Leaving</th>
            <th>Created Date</th>
            <th>Created by</th>

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
              {/* <td>
                <Link to={`/edit-employee/${employee.id}`}>
                  <button>Edit</button>
                </Link>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesData;
