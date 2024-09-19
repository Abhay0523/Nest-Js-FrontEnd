import React, { useState } from 'react';

function UserCreation() {
  const [employeeCode, setEmployeeCode] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dateofJoining, setdateofJoining] = useState('');
  //   const [dateofLeaving, setdateofLeaving]= useState('');
  const [created_date, SetCreatedDate] = useState('');
  const [created_by] = useState(1);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emp_code: employeeCode, name, DOB: dob, email, mobile, created_by: 1, date_of_joining: dateofJoining, created_date: created_date })
    });
    const result = await response.json();
    alert('User created successfully');
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <label >Employee Code:</label>
        <input
          type="text"
          placeholder="Employee Code"
          value={employeeCode}
          onChange={(e) => setEmployeeCode(e.target.value)}
        />
        <br />
        <label >Name:</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <label >Date Of Birth</label>
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <br />

        <label >Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <label >Mobile Number</label>
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <br />
        <label >Joining Date</label>
        <input
          type="date"
          placeholder="Joining Date"
          value={dateofJoining}
          onChange={(e) => setdateofJoining(e.target.value)}
        />
        <br />

        <label >Created Date</label>
        <input
          type="date"
          placeholder="Created Date"
          value={created_date}
          onChange={(e) => SetCreatedDate(e.target.value)}
        />

        <br />
        <label >Created By</label>
        <input
          type="text"
          placeholder="Created By"
          value={created_by}
          disabled
        />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default UserCreation;
