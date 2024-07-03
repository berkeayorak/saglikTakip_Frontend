import React from 'react';
import DoctorForm from '../components/DoctorForm';

const Doctors = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white shadow-2xl rounded-3xl p-8 transform transition-all duration-300 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-400">
          Doktorlar
        </h1>
        <div className="mb-8">
          <DoctorForm />
        </div>
      </div>
    </div>
  );
};

export default Doctors;
