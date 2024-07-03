import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaHome, FaUserMd, FaUsers, FaCalendarAlt, FaTasks, FaList } from 'react-icons/fa';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import ManageAppointments from './pages/ManageAppointments';
import DoctorListPage from './pages/DoctorListPage'; // Yeni bileşeni import ediyoruz

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 shadow-lg">
                    <div className="container mx-auto flex items-center justify-between">
                        <div className="text-white text-lg font-semibold flex space-x-4">
                            <Link to="/" className="flex items-center px-3 py-2 hover:bg-indigo-700 rounded-md">
                                <FaHome className="mr-2" /> Anasayfa
                            </Link>
                            <Link to="/doctors" className="flex items-center px-3 py-2 hover:bg-indigo-700 rounded-md">
                                <FaUserMd className="mr-2" /> Doktorlar
                            </Link>
                            <Link to="/patients" className="flex items-center px-3 py-2 hover:bg-indigo-700 rounded-md">
                                <FaUsers className="mr-2" /> Hastalar
                            </Link>
                            <Link to="/appointments" className="flex items-center px-3 py-2 hover:bg-indigo-700 rounded-md">
                                <FaCalendarAlt className="mr-2" /> Randevular
                            </Link>
                            <Link to="/manage-appointments" className="flex items-center px-3 py-2 hover:bg-indigo-700 rounded-md">
                                <FaTasks className="mr-2" /> Randevuları Yönet
                            </Link>
                            <Link to="/doctor-list" className="flex items-center px-3 py-2 hover:bg-indigo-700 rounded-md">
                                <FaList className="mr-2" /> Doktor Listesi
                            </Link> {/* Yeni link */}
                        </div>
                    </div>
                </nav>
                <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/doctors" element={<Doctors />} />
                        <Route path="/patients" element={<Patients />} />
                        <Route path="/appointments" element={<Appointments />} />
                        <Route path="/manage-appointments" element={<ManageAppointments />} />
                        <Route path="/doctor-list" element={<DoctorListPage />} /> {/* Yeni rota */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
