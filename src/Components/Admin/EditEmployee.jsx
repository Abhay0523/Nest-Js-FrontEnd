import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
  const { emp_code } = useParams(); 
  const navigate = useNavigate();
  
  const [employee, setEmployee] = useState({
    emp_code, 
    name: '',
    DOB: '', 
    email: '',
    mobile: '',
    date_of_joining: '',
    created_date: '',
    date_of_leaving: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:3000/employees/${emp_code}`);
        
        if (!response.ok) {
          throw new Error(`Not Found with status code ${response.status}`);
        }

        const data = await response.json();
        setEmployee({
          emp_code: data.emp_code,
          name: data.name,
          DOB: new Date(data.DOB).toISOString().substr(0, 10),
          email: data.email,
          mobile: data.mobile,
          date_of_joining: new Date(data.date_of_joining).toISOString().substr(0, 10),
          created_date: new Date(data.created_date).toISOString().substr(0, 10),
          date_of_leaving: data.date_of_leaving ? new Date(data.date_of_leaving).toISOString().substr(0, 10) : ''
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch employee:", error);
      }
    };

    fetchEmployee();
  }, [emp_code]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const updatedEmployee = {
        ...employee,
        date_of_leaving: employee.date_of_leaving ? employee.date_of_leaving : null 
      };

      const response = await fetch(`http://localhost:3000/employees/${emp_code}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployee), 
      });

      if (response.ok) {
        alert('Employee updated successfully!');
        navigate('/employees-data');
      } else {
        console.error("Error updating employee");
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="form-container">
      <h1 className="form-title">Update Employee</h1>
      <form className="animated-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee Code:</label>
          <input
            type="text"
            name="emp_code"
            value={employee.emp_code}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="DOB" 
            value={employee.DOB}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Mobile Number:</label>
          <input
            type="text"
            name="mobile"
            value={employee.mobile}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Joining Date:</label>
          <input
            type="date"
            name="date_of_joining" 
            value={employee.date_of_joining}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Created Date:</label>
          <input
            type="date"
            name="created_date" 
            value={employee.created_date}
            onChange={handleChange}
           
          />
        </div>

        <div className="form-group">
          <label>Leaving Date:</label>
          <input
            type="date"
            name="date_of_leaving" 
            value={employee.date_of_leaving}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>

      <button className="back-button" onClick={() => navigate('/admin-dashboard')}>
        Back
      </button>
    </div>
  );
};

export default EditEmployee;
