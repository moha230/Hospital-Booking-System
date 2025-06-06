import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { adminToken, setAdminToken } = useContext(AdminContext);
  const { doctorToken, setDoctorToken } = useContext(DoctorContext);

  const logout = () => {
    if (adminToken) {
      setAdminToken("");
      localStorage.removeItem("adminToken");
    }

    if (doctorToken) {
      setDoctorToken("");
      localStorage.removeItem("doctorToken");
    }
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-3 text-xs">
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt="Logo"
        />
        <p className="border px-3.5 py-0.5 rounded-full border-green-600">
          {adminToken ? "Admin" : doctorToken ? "Doctor" : "Guest"}
        </p>
      </div>
      {(adminToken || doctorToken) && (
        <button
          onClick={logout}
          className="bg-primary text-white text-sm px-10 py-2 rounded-full"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export { Navbar };
