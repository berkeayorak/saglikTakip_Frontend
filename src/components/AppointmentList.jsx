import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser, FaUserMd, FaCalendarAlt } from 'react-icons/fa';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5162/api/appointments')
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('Randevular alınırken bir hata oluştu!', error);
      });
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Randevu Listesi</h2>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id} className="border-b py-4 flex items-center">
            <FaUser className="mr-2 text-blue-500" /> {appointment.patientName}
            <span className="mx-2 text-gray-600">ile</span>
            <FaUserMd className="mr-2 text-green-500" /> {appointment.doctorName}
            <span className="mx-2 text-gray-600">tarihinde</span>
            <FaCalendarAlt className="mr-2 text-red-500" /> {new Date(appointment.appointmentDate).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
