import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserMd, FaUser, FaCalendarAlt } from 'react-icons/fa';

const ManageAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5162/api/appointments/all')
            .then(response => {
                setAppointments(response.data);
            })
            .catch(error => {
                console.error('Randevular alınırken bir hata oluştu!', error);
            });
    }, []);

    const handleStatusChange = (id, newStatus) => {
        axios.put(`http://localhost:5162/api/appointments/${id}`, { status: newStatus })
            .then(response => {
                setAppointments(appointments.map(appointment => 
                    appointment.id === id ? { ...appointment, status: newStatus } : appointment
                ));
                setErrorMessage(''); // Hata mesajını temizle
            })
            .catch(error => {
                if (error.response && error.response.status === 409) {
                    setErrorMessage(error.response.data.message);
                } else {
                    console.error('Randevu durumu güncellenirken bir hata oluştu!', error);
                }
            });
    };

    const getStatusClass = (status) => {
        switch(status) {
            case 'Cancelled':
                return 'bg-red-100';
            case 'Confirmed':
                return 'bg-green-100';
            case 'Pending':
            default:
                return '';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 flex items-center justify-center p-6">
            <div className="max-w-6xl w-full bg-white shadow-2xl rounded-3xl p-8 transform transition-all duration-300 hover:scale-105">
                <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-400">Randevuları Yönet</h2>
                {errorMessage && (
                    <div className="mb-4 text-red-500 text-center">
                        {errorMessage}
                    </div>
                )}
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Doktor</th>
                            <th className="border px-4 py-2">Hasta</th>
                            <th className="border px-4 py-2">Tarih</th>
                            <th className="border px-4 py-2">Durum</th>
                            <th className="border px-4 py-2">Durumu Değiştir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(appointment => (
                            <tr key={appointment.id} className={getStatusClass(appointment.status)}>
                                <td className="border px-4 py-2">
                                    <div className="flex items-center">
                                        <FaUserMd className="mr-2 text-blue-500" /> {appointment.doctor.name}
                                    </div>
                                </td>
                                <td className="border px-4 py-2">
                                    <div className="flex items-center">
                                        <FaUser className="mr-2 text-green-500" /> {appointment.patient.name}
                                    </div>
                                </td>
                                <td className="border px-4 py-2">
                                    <div className="flex items-center">
                                        <FaCalendarAlt className="mr-2 text-red-500" /> {new Date(appointment.appointmentDate).toLocaleString()}
                                    </div>
                                </td>
                                <td className="border px-4 py-2">{appointment.status}</td>
                                <td className="border px-4 py-2">
                                    <select 
                                        value={appointment.status} 
                                        onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                                        className="border rounded px-2 py-1"
                                    >
                                        <option value="Pending">Beklemede</option>
                                        <option value="Confirmed">Onaylandı</option>
                                        <option value="Cancelled">İptal Edildi</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageAppointments;
