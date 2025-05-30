import React, { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

const UserAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="px-4 sm:px-8 py-8">
      <p className="pb-4 text-2xl font-semibold text-green-600 border-b">
        Your Appointments
      </p>
      <div className="grid gap-6 mt-6">
        {doctors.slice(0, 6).map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row bg-white shadow-md rounded-xl overflow-hidden border"
          >
            <div className="sm:w-40 flex-shrink-0 bg-[#EAEFFF]">
              <img
                className="w-full h-40 sm:h-full object-cover rounded-md"
                src={item.image}
                alt={item.name}
              />
            </div>

            <div className="flex-1 p-4 text-sm text-[#5E5E5E]">
              <p className="text-[#262626] text-lg font-semibold mb-1">
                {item.name}
              </p>
              <p className="mb-1 capitalize">{item.speciality}</p>
              <p className="text-[#464646] font-medium mt-2">Address:</p>
              <p>{item.address.street}</p>
              <p>
                {item.address.city}, {item.address.country}
              </p>
              <p className="mt-2">
                <span className="text-[#3C3C3C] font-medium">Date & Time:</span>{" "}
                3.5.2025 klo 09:00
              </p>
            </div>

            <div className="p-4 flex flex-col justify-between items-center gap-3 border-t sm:border-l sm:border-t-0">
              <button className="w-full sm:w-36 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                Pay
              </button>
              <button className="w-full sm:w-36 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAppointments;
