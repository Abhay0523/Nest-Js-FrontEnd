// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const EditEmployee = () => {
//   const { emp_code } = useParams(); // Use the emp_code from route parameters
//   const navigate = useNavigate();
//   const [employee, setEmployee] = useState({
//     emp_code: '',
//     name: '',
//     email: '',
//     mobile: '',
//     DOB: '',
//     date_of_joining: '',
//     date_of_leaving: '',
//     created_date: '',
//     created_by: false
//   });

//   useEffect(() => {
//     const fetchEmployee = async () => {
//       if (!emp_code) {
//         console.error('Employee code is missing');
//         return;
//       }

//       try {
//         const response = await fetch(`http://localhost:3000/employees/${emp_code}`);

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json(); // Ensure the response is parsed as JSON

//         if (!data) {
//           throw new Error('No data returned from server.');
//         }

//         console.log('Fetched employee data:', data); // Debugging line

//         setEmployee(data);
//       } catch (error) {
//         console.error('Error fetching employee data:', error.message);
//       }
//     };

//     fetchEmployee();
//   }, [emp_code]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmployee((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:3000/employees/${employee.emp_code}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(employee)
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       navigate('/employees-data');
//     } catch (error) {
//       console.error('Error updating employee:', error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Edit Employee</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Employee Code:
//           <input
//             type="text"
//             name="emp_code"
//             value={employee.emp_code}
//             onChange={handleChange}
//             disabled
//           />
//         </label>
//         <label>
//           Name:
//           <input
//             type="text"
//             name="name"
//             value={employee.name}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={employee.email}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Mobile:
//           <input
//             type="text"
//             name="mobile"
//             value={employee.mobile}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Date of Birth:
//           <input
//             type="date"
//             name="DOB"
//             value={employee.DOB}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Date of Joining:
//           <input
//             type="date"
//             name="date_of_joining"
//             value={employee.date_of_joining}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Date of Leaving:
//           <input
//             type="date"
//             name="date_of_leaving"
//             value={employee.date_of_leaving}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Created Date:
//           <input
//             type="date"
//             name="created_date"
//             value={employee.created_date}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Created By:
//           <select
//             name="created_by"
//             value={employee.created_by ? 'true' : 'false'}
//             onChange={(e) => setEmployee((prev) => ({
//               ...prev,
//               created_by: e.target.value === 'true'
//             }))}
//           >
//             <option value="true">Admin</option>
//             <option value="false">Employee</option>
//           </select>
//         </label>
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// };

// export default EditEmployee;
