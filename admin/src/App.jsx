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

const App = () => {
  const { adminToken, adminInfo } = useContext(AdminContext); // 
  const location = useLocation();

  useEffect(() => {
    const getTitle = (pathname) => {
      if (!adminToken) return "Admin Login";

      if (pathname === "/admin-dashboard")
        return adminInfo?.name
          ? `Dashboard - Dr. ${adminInfo.name} | Unix-doctors`
          : "Admin Dashboard";

      if (pathname === "/all-appointments")
        return "Appointments";

      if (pathname === "/doctor-registration")
        return "Doctor Registration";

      if (pathname === "/list-all-doctors")
        return "Doctors List";

      return "Unix-doctors Admin";
    };

    document.title = getTitle(location.pathname);
  }, [location, adminToken, adminInfo]);

  return adminToken ? (
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
