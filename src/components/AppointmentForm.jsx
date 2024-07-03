import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaClinicMedical, FaUserMd, FaUser, FaEnvelope, FaPhone, FaCalendar, FaClock, FaInfoCircle } from 'react-icons/fa';
import AppointmentSlots from './AppointmentSlots';

const AppointmentForm = () => {
  const [policlinics, setPoliclinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedPoliclinicId, setSelectedPoliclinicId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhoneNumber, setPatientPhoneNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [status, setStatus] = useState('Beklemede');
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

  useEffect(() => {
    if (selectedPoliclinicId) {
      axios.get(`http://localhost:5162/api/doctors/bypoliclinic/${selectedPoliclinicId}`)
        .then(response => {
          setDoctors(response.data);
        })
        .catch(error => {
          console.error('Doktorlar alınırken bir hata oluştu!', error);
        });
    } else {
      setDoctors([]);
    }
  }, [selectedPoliclinicId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointmentDateTime = moment(`${appointmentDate}T${appointmentTime}`).format();
    const newAppointment = {
      doctorId,
      patientName,
      patientEmail,
      patientPhoneNumber,
      appointmentDate: appointmentDateTime,
      status
    };

    axios.post('http://localhost:5162/api/appointments', newAppointment)
      .then(response => {
        setMessage('Randevu başarıyla eklendi!');
        setDoctorId('');
        setPatientName('');
        setPatientEmail('');
        setPatientPhoneNumber('');
        setAppointmentDate('');
        setAppointmentTime('');
        setStatus('Beklemede');
      })
      .catch(error => {
        setMessage('Randevu eklenirken bir hata oluştu.');
        console.error('Randevu eklenirken bir hata oluştu!', error);
      });
  };

  const handleSlotSelect = (time) => {
    setAppointmentTime(time);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 mb-6 max-w-3xl mx-auto">
      {message && (
        <div className={`mb-4 p-3 rounded ${message.includes('başarıyla') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            <FaClinicMedical className="inline mr-2" /> Poliklinik
          </label>
          <select
            value={selectedPoliclinicId}
            onChange={(e) => setSelectedPoliclinicId(e.target.value)}
            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Poliklinik Seçin</option>
            {policlinics.map(policlinic => (
              <option key={policlinic.id} value={policlinic.id}>{policlinic.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            <FaUserMd className="inline mr-2" /> Doktor
          </label>
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={!selectedPoliclinicId}
          >
            <option value="">Doktor Seçin</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            <FaUser className="inline mr-2" /> Hasta Adı
          </label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            <FaEnvelope className="inline mr-2" /> Hasta E-posta
          </label>
          <input
            type="email"
            value={patientEmail}
            onChange={(e) => setPatientEmail(e.target.value)}
            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            <FaPhone className="inline mr-2" /> Hasta Telefon Numarası
          </label>
          <input
            type="text"
            value={patientPhoneNumber}
            onChange={(e) => setPatientPhoneNumber(e.target.value)}
            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">
              <FaCalendar className="inline mr-2" /> Randevu Tarihi
            </label>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              <FaClock className="inline mr-2" /> Randevu Saati
            </label>
            <input
              type="time"
              value={appointmentTime}
              readOnly
              className="border rounded w-full py-2 px-3 bg-gray-200 cursor-not-allowed"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            <FaInfoCircle className="inline mr-2" /> Durum
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pending">Beklemede</option>
            <option value="Confirmed">Onaylandı</option>
            <option value="Cancelled">İptal Edildi</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 w-full">
          Randevu Ekle
        </button>
      </form>

      {doctorId && appointmentDate && (
        <AppointmentSlots doctorId={doctorId} date={appointmentDate} onSlotSelect={handleSlotSelect} />
      )}
    </div>
  );
};

export default AppointmentForm;
