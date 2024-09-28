import React, { useState } from 'react';
import './UserCreation.css'; 
import { useNavigate } from 'react-router-dom';

function UserCreation() {
  const [employeeCode, setEmployeeCode] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dateofJoining, setdateofJoining] = useState('');
  const [created_date, SetCreatedDate] = useState('');
  const [created_by] = useState(1);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

 

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    let formValid = true;
    const newErrors = {};

    if (!employeeCode) {
      newErrors.employeeCode = 'Employee code is required';
      formValid = false;
    }
    if (!name) {
      newErrors.name = 'Name is required';
      formValid = false;
    }
    if (!dob) {
      newErrors.dob = 'Date of Birth is required';
      formValid = false;
    }
    if (!email) {
      newErrors.email = 'Email is required';
      formValid = false;
    } else if (!email.endsWith('@gmail.com')) {
      newErrors.email = 'Email must contain @gmail.com';
      formValid = false;
    }
    if (!mobile) {
      newErrors.mobile = 'Mobile number is required';
      formValid = false;
    } else {
      const mobileRegex = /^[6-9]\d{9}$/;
      if (!mobileRegex.test(mobile)) {
        newErrors.mobile = 'Mobile number must be 10 digits and start with 6-9';
        formValid = false;
      }
    }
    if (!dateofJoining) {
      newErrors.dateofJoining = 'Joining date is required';
      formValid = false;
    }
    if(!created_date){
      newErrors.created_date='Created Date is required here'
    }

    if (!formValid) {
      setErrors(newErrors);
      return;
    }
    

  
    try {
      const response = await fetch('http://localhost:3000/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emp_code: employeeCode,
          name,
          DOB: dob,
          email,
          mobile,
          created_by: 1,
          date_of_joining: dateofJoining,
          created_date: created_date,
        }),
      });

      if (!response.ok) {
      
        const errorResult = await response.json();
        alert(errorResult.message || 'An error occurred'); 
        return;
      }

      const result = await response.json();
      alert('User created successfully');
      navigate('/admin-dashboard');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the user');
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Create User</h1>
      <form onSubmit={handleSubmit} className="animated-form">
        <div className="form-group">
          <label>Employee Code:</label>
          <input
            type="text"
            placeholder="Employee Code"
            value={employeeCode}
            onChange={(e) => setEmployeeCode(e.target.value)}
          />
          {errors.employeeCode && <span className="error">{errors.employeeCode}</span>}
        </div>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Date Of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          {errors.dob && <span className="error">{errors.dob}</span>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Mobile Number:</label>
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>

        <div className="form-group">
          <label>Joining Date:</label>
          <input
            type="date"
            value={dateofJoining}
            onChange={(e) => setdateofJoining(e.target.value)}
          />
          {errors.dateofJoining && <span className="error">{errors.dateofJoining}</span>}
        </div>

        <div className="form-group">
          <label>Created Date:</label>
          <input
            type="date"
            value={created_date}
            onChange={(e) => SetCreatedDate(e.target.value)}
          />
          {errors.created_date && <span className="error">{errors.created_date}</span>}
        </div>

        <button type="submit" className="submit-btn">
          Create User
        </button>
      </form>

      <button className="back-button" onClick={() => navigate('/admin-dashboard')}>
        Back
      </button>
    </div>
  );
}

export default UserCreation;
