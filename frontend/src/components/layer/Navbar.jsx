import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/index.js";

const Navbar = () => {
  const navigate = useNavigate();

  //state variables
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]">
      <img
        onClick={() => navigate("/")}
        className="w-45 cursor-pointer"
        src={assets.logo}
        alt="logo"
      />
      <ul className="md:flex items-start gap-5 font-medium hidden">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex-item.center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative ">
            <img className="w-8 rounded-full" src={assets.profile_pic} />
            <img className="w-2.5" src={assets.dropdown_icon} />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4">
                <p
                  className="hover:text-green-500 cursor-pointer"
                  onClick={() => navigate("profile")}
                >
                  Oma profile
                </p>
                <p
                  className="hover:text-green-500 cursor-pointer"
                  onClick={() => navigate("UserAppointment")}
                >
                  My appointment
                </p>
                <p
                  className="hover:text-green-500 cursor-pointer"
                  onClick={() => setToken(false)("profile")}
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Register Account
          </button>
        )}
        
      </div>
    </div>
  );
};

export default Navbar;
