import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserMd, FaEnvelope, FaPhone, FaClinicMedical } from 'react-icons/fa';

const DoctorForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [policlinics, setPoliclinics] = useState([]);
  const [policlinicId, setPoliclinicId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5162/api/policlinics')
      .then(response => {
        setPoliclinics(response.data);
      })
      .catch(error => {
        console.error('Poliklinikler alınırken bir hata oluştu!', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = `${firstName} ${lastName}`;
    const newDoctor = { name, email, phoneNumber, policlinicId };

    axios.post('http://localhost:5162/api/doctors', newDoctor)
      .then(response => {
        setMessage('Doktor başarıyla eklendi!');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setPoliclinicId('');
      })
      .catch(error => {
        setMessage('Doktor eklenirken bir hata oluştu.');
        console.error('Doktor eklenirken bir hata oluştu!', error.response.data);
      });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 mb-6 max-w-lg mx-auto">
      {message && (
        <div className={`mb-4 p-3 rounded ${message.includes('başarıyla') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            <FaUserMd className="inline mr-2" /> İsim
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            <FaUserMd className="inline mr-2" /> Soyisim
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            <FaEnvelope className="inline mr-2" /> E-posta
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            <FaPhone className="inline mr-2" /> Telefon Numarası
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            <FaClinicMedical className="inline mr-2" /> Poliklinik
          </label>
          <select
            value={policlinicId}
            onChange={(e) => setPoliclinicId(e.target.value)}
            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Poliklinik Seçin</option>
            {policlinics.map(policlinic => (
              <option key={policlinic.id} value={policlinic.id}>{policlinic.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 w-full">
          Doktor Ekle
        </button>
      </form>
    </div>
  );
};

export default DoctorForm;
