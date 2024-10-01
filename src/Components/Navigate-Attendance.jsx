import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavigateAttendance = () => {
    const [employee, setEmployee] = useState(null);
    const [attendanceData, setAttendanceData] = useState([]);
    const navigate=useNavigate();

    useEffect(() => {
        const token=localStorage.getItem('token');
        const storedEmployee = JSON.parse(localStorage.getItem('employee'));
        if (storedEmployee) {
            setEmployee(storedEmployee);
        }
    }, []); 

    useEffect(() => {
        if (employee) {
            const fetchData = async () => { 
                const response = await fetch(`http://localhost:3000/punch/emp/${employee.emp_code}`
                );
                const data = await response.json();
                setAttendanceData(data);
            };

            fetchData();
        }
    }, [employee]); 

        const formatTime = (dateStr) => {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
      };
    
      const extractDate = (dateStr) => {
        return dateStr ? dateStr.substring(0, 10) : 'N/A';
      };

      if (!employee) {
        return <div>Loading...</div>;
        }

        // const {emp_code}=employee;
        // console.log("employee code is", emp_code);
    return (
        <>
            <div className="attendance-container">
                <table className="attendance-table">
                    <thead>
                        <tr>
                            <th>Employee Code</th>
                            <th>Date</th>
                            <th>In Time</th>
                            <th>Out Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.map((punch) => (
                            <tr key={punch.id}>
                                <td>{punch.emp.emp_code}</td>
                                <td>{extractDate(punch.punch_in_time)}</td>
                                <td>{formatTime(punch.punch_in_time)}</td>
                                <td>{formatTime(punch.punch_out_time)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="back-button" onClick={() =>navigate('/employee-dashboard') }>
                Back
            </button>
        </>
    );
};

export default NavigateAttendance;
