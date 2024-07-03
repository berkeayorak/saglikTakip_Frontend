import React from 'react';
import DoctorList from '../components/DoctorList';

const DoctorListPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white shadow-2xl rounded-3xl p-8 transform transition-all duration-300 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-400">
          Doktor Listesi
        </h1>
        <div>
          <DoctorList />
        </div>
      </div>
    </div>
  );
};

export default DoctorListPage;
