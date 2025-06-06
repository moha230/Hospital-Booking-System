import React from "react";
import { assets } from "../../assets/index.js";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
      {/* left side container */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Appointment <br /> with best doctor
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Let get you patched up <br className="hidden sm:block" /> unix style
          </p>
        </div>
        <div
          onClick={() => navigate("/doctors")}
          className="cursor-pointer flex items-center gap-2 bg-white px-8 py-3 rounded-full text-[#595959] text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
        >
          Book appointment
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </div>
      </div>
      {/* right side container */}
      <div className="md:w-1/2 relative bg-transparent"></div>
    </div>
  );
};

export default Header;
