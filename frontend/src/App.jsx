import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Doctors from "./pages/Doctors.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import UserAppointments from "./pages/UserAppointments.jsx";
import Appointment from "./pages/Appointment.jsx";
import Navbar from "./components/layer/Navbar.jsx";
import Footer from "./components/layer/Footer.jsx";
import { ToastContainer } from "react-toastify";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const getTitle = (pathname) => {
      if (pathname === "/") return "Home";
      if (pathname === "/about") return "About";
      if (pathname === "/contact") return "Contact";
      if (pathname.startsWith("/doctors")) return "Doctors";
      if (pathname === "/login") return "Login";
      if (pathname === "/profile")
        return user ? `${user.name}'s Profile - Unix-doctors` : "Profile";
      if (pathname === "/userAppointments")
        return user ? `${user.name}'s Appointments` : "Appointments";
      if (pathname.startsWith("/appointment")) return "Book Appointment";
      return "Unix-doctors";
    };

    document.title = getTitle(location.pathname);
  }, [location]);

  return (
    <div className="mx-10 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/userAppointments" element={<UserAppointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

