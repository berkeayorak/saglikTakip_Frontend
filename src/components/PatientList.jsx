import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5162/api/patients')
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error('Hastalar alınırken bir hata oluştu!', error);
      });
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hasta Listesi</h2>
      <ul className="divide-y divide-gray-200">
        {patients.map(patient => (
          <li key={patient.id} className="py-4 flex flex-wrap md:flex-nowrap items-center justify-between">
            <div className="flex items-center w-full md:w-1/3 min-w-0 mb-2 md:mb-0">
              <FaUser className="mr-2 text-blue-500" />
              <span className="font-medium text-gray-900 truncate">{patient.name}</span>
            </div>
            <div className="flex items-center w-full md:w-1/3 min-w-0 mb-2 md:mb-0">
              <FaEnvelope className="mr-2 text-red-500" />
              <span className="text-gray-700 truncate">{patient.email}</span>
            </div>
            <div className="flex items-center w-full md:w-1/3 min-w-0">
              <FaPhone className="mr-2 text-yellow-500" />
              <span className="text-gray-700 truncate">{patient.phoneNumber}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
