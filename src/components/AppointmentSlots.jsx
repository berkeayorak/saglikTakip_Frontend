import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaClock } from 'react-icons/fa';

const AppointmentSlots = ({ doctorId, date, onSlotSelect }) => {
    const [appointments, setAppointments] = useState([]);
    const [slots, setSlots] = useState([]);
    const [expandedHour, setExpandedHour] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5162/api/appointments?doctorId=${doctorId}&date=${date}`)
            .then(response => {
                setAppointments(response.data);
                generateSlots(response.data);
            })
            .catch(error => {
                console.error('Randevular alınırken bir hata oluştu!', error);
            });
    }, [doctorId, date]);

    const generateSlots = (appointments) => {
        const hours = [];
        const startHour = 8;
        const endHour = 18;

        for (let hour = startHour; hour < endHour; hour++) {
            const slots = [];
            for (let minutes = 0; minutes < 60; minutes += 10) {
                const slotTime = moment(`${date} ${hour}:${minutes}`, 'YYYY-MM-DD HH:mm');
                const appointment = appointments.find(appointment => 
                    moment(appointment.appointmentDate).isSame(slotTime, 'minute')
                );
                const isBooked = appointment && appointment.status !== 'Cancelled';
                slots.push({ time: slotTime.format('HH:mm'), isBooked, dateTime: slotTime });
            }
            hours.push({ hour, slots });
        }
        setSlots(hours);
    };

    const handleHourClick = (hour) => {
        setExpandedHour(expandedHour === hour ? null : hour);
    };

    const handleSlotClick = (slot) => {
        if (!slot.isBooked) {
            onSlotSelect(slot.dateTime.format('HH:mm'));
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mt-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Randevu Saatleri</h2>
            <div className="grid grid-cols-5 gap-4">
                {slots.map(({ hour, slots }) => (
                    <div key={hour} className="w-full">
                        <div
                            className="p-4 rounded-lg bg-blue-500 text-white text-center cursor-pointer transition duration-200 hover:opacity-75"
                            onClick={() => handleHourClick(hour)}
                        >
                            <FaClock className="inline mr-2" /> {hour}:00
                        </div>
                        {expandedHour === hour && (
                            <div className="grid grid-cols-1 gap-2 mt-2">
                                {slots.map((slot, index) => (
                                    <div
                                        key={index}
                                        className={`p-2 rounded-lg text-white text-center cursor-pointer transition duration-200 ${slot.isBooked ? 'bg-red-500' : 'bg-green-500'} hover:opacity-75`}
                                        onClick={() => handleSlotClick(slot)}
                                    >
                                        {slot.time}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppointmentSlots;
