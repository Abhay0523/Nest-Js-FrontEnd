import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserCreationEmp.css';

function UserCreationJSX() {
  const [employeeCode, setEmployeeCode] = useState(''); 
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dateofJoining, setdateofJoining] = useState('');

  const [created_by] = useState(0);
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

    if (!formValid) {
      setErrors(newErrors);
      return;
    }

    const response = await fetch('http://localhost:3000/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        emp_code: employeeCode, 
        name, 
        DOB: dob, 
        email, 
        mobile, 
        created_by: 0, 
        date_of_joining: dateofJoining 
      })
    });

    const result = await response.json();

    if (!response.ok) {
      alert("Error occurred while creating in DB");
    } else {
      alert('User Created Successfully');
      navigate("/employee-login");
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Create User</h1>
      <form className="animated-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee Code:</label>
          <input
            type="text"
            placeholder="Employee Code"
            value={employeeCode}
            onChange={(e) => setEmployeeCode(e.target.value)}
          />
          {errors.employeeCode && <span className='error'>{errors.employeeCode}</span>}
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
            placeholder="Enter the Date Of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          {errors.dob && <span className="error">{errors.dob}</span>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter Email with @gmail.com prefix"
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
            placeholder="Joining Date"
            value={dateofJoining}
            onChange={(e) => setdateofJoining(e.target.value)}
          />
          {errors.dateofJoining && <span className="error">{errors.dateofJoining}</span>}
        </div>
        
        <button type="submit" className="submit-btn">Create User</button>
      </form>
    </div>
  );
}

export default UserCreationJSX;
