import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home.jsx";
import About from "@/pages/About.jsx";
import Contact from "@/pages/Contact.jsx";
import Doctors from "@/pages/Doctors.jsx";
import Login from "@/pages/Login.jsx";
import Profile from "@/pages/Profile.jsx";
import UserAppointment from "@/pages/UserAppointment.jsx";
import Appointment from "@/pages/Appointment.jsx";
import Navbar from "@/components/layer/Navbar.jsx";
import Footer from "@/components/layer/Footer.jsx";

const App = () => {
  return (
    <div className="mx-10 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/userAppointment" element={<UserAppointment />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
