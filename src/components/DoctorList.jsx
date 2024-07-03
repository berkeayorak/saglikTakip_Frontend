import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserMd, FaEnvelope, FaPhone, FaClinicMedical, FaSearch } from 'react-icons/fa';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [policlinics, setPoliclinics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsResponse = await axios.get('http://localhost:5162/api/doctors');
        setDoctors(doctorsResponse.data);
      } catch (error) {
        console.error('Doktorlar alınırken bir hata oluştu!', error);
      }
    };

    const fetchPoliclinics = async () => {
      try {
        const policlinicsResponse = await axios.get('http://localhost:5162/api/policlinics');
        setPoliclinics(policlinicsResponse.data);
      } catch (error) {
        console.error('Poliklinikler alınırken bir hata oluştu!', error);
      }
    };

    fetchDoctors();
    fetchPoliclinics();
  }, []);

  const getPoliclinicName = (policlinicId) => {
    const policlinic = policlinics.find(p => p.id === policlinicId);
    return policlinic ? policlinic.name : 'Bilinmiyor';
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getPoliclinicName(doctor.policlinicId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Doktor Listesi</h2>
      <div className="mb-6 flex items-center">
        <FaSearch className="text-gray-500 mr-3" />
        <input
          type="text"
          placeholder="Ad veya poliklinik ile ara"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <ul className="divide-y divide-gray-200">
        {filteredDoctors.map(doctor => (
          <li key={doctor.id} className="py-4 flex flex-wrap md:flex-nowrap items-center justify-between">
            <div className="flex items-center w-full md:w-1/4 min-w-0 mb-4 md:mb-0">
              <FaUserMd className="mr-3 text-blue-500" />
              <span className="font-medium text-gray-900 truncate">{doctor.name}</span>
            </div>
            <div className="flex items-center w-full md:w-1/4 min-w-0 mb-4 md:mb-0">
              <FaClinicMedical className="mr-3 text-green-500" />
              <span className="text-gray-700 truncate">{getPoliclinicName(doctor.policlinicId)}</span>
            </div>
            <div className="flex items-center w-full md:w-1/4 min-w-0 mb-4 md:mb-0">
              <FaEnvelope className="mr-3 text-red-500" />
              <span className="text-gray-700 truncate">{doctor.email}</span>
            </div>
            <div className="flex items-center w-full md:w-1/4 min-w-0">
              <FaPhone className="mr-3 text-yellow-500" />
              <span className="text-gray-700 truncate">{doctor.phoneNumber}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
