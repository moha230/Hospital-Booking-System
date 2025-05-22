import React, { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, adminToken, adminListAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (adminToken) {
      adminListAllDoctors();
    }
  });

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-2xl font-semibold text-center mb-6">Current list of doctors</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {doctors.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-[#C9D8FF] transition-transform hover:-translate-y-2 duration-300"
          >
            <div className="w-full h-70 bg-[#EAEFFF]">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-lg font-semibold text-[#262626]">{item.name}</p>
              <p className="text-sm text-gray-600">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
