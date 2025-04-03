import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

function Speciality() {
  return (
    <div
      className="flex gap-4 py-16 flex-col items-center  text-[#262626]"
      id="speciality"
    >
      <h1 className="font-medium text-3xl ">Look for any Unix specialist</h1>
      <p className="sm:w-1/3 bg-primary text-sm text-center">
        Just browse through
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specialityData.map((item, index) => (
          <Link
            to={`/doctors/${item.speciality}`}
            key={index}
            className="group relative flex flex-col items-center text-xs cursor-pointer flex-shrink-0 transition-all duration-500 hover:scale-110 hover:z-10">
            <img
              className="mb-6 w-16 sm:w-36 transition-transform duration-300 ease-in-out"
              src={item.image}
              alt={item.speciality}
            />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Speciality;
