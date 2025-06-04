import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import DoctorRegistration from "./pages/Admin/DoctorRegistration";
import DoctorsList from "./pages/Admin/DoctorsList";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard.jsx";
import { DoctorContext } from "./context/DoctorContext.jsx";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

const App = () => {
  const { adminToken, adminInfo } = useContext(AdminContext);
  const { doctorToken, doctorInfo } = useContext(DoctorContext);  // 
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
  
    const getTitle = () => {
      if (adminToken) {
        switch (pathname) {
          case "/admin-dashboard":
            return adminInfo?.name
              ? `Dashboard - ${adminInfo.name} | Unix-doctors`
              : "Admin Dashboard";
          case "/all-appointments":
            return "Appointments";
          case "/doctor-registration":
            return "Doctor Registration";
          case "/list-all-doctors":
            return "Doctors List";
          default:
            return "Unix-doctors Admin";
        }
      }
  
      if (doctorToken) {
        switch (pathname) {
          case "/doctor-dashboard":
            return doctorInfo?.name
              ? `Dr. ${doctorInfo.name}'s Dashboard | Unix-doctors`
              : "Doctor Dashboard";
          default:
            return "Unix-doctors Doctor";
        }
      }
  
      return "Admin Login";
    };
  
    document.title = getTitle();
  }, [location, adminToken, adminInfo, doctorToken, doctorInfo]);
  

  return doctorToken || adminToken ? (
    <div className="bg-background">
      <ToastContainer />
      <Navbar />
      <div className="flex flex-row-reverse min-h-screen">
        <Sidebar />
        <div className="flex-1 p-2">
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/doctor-registration" element={<DoctorRegistration />} />
            <Route path="/list-all-doctors" element={<DoctorsList />} />
            {/*doctor path*/}

            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
