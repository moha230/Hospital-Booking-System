import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]">
      <img className="w-45 cursor-pointer" src={assets.logo} alt="logo" />
      <ul className="md:flex items-start gap-5 font-medium hidden">
        <NavLink>
          <li>Home</li>
          <hr />
        </NavLink>
        <NavLink>
          <li>Doctors</li>
          <hr />
        </NavLink>
        <NavLink>
          <li>Contact</li>
          <hr />
        </NavLink>
        <NavLink>
          <li>About</li>
          <hr />
        </NavLink>
      </ul>
      <div>
        <button>Register Account</button>
      </div>
    </div>
  );
};

export default Navbar;
