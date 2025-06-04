import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorProfile = () => {
  const { doctorToken, profileData, getProfileData } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  useEffect(() => {
    if (doctorToken) getProfileData();
  }, [doctorToken]);

  if (!profileData) return null;

  const {
    name,
    email,
    image: profileImg,
    address = {},
    fees,
    degree,
    speciality,
    experience,
    about,
    available,
  } = profileData;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded-lg text-sm space-y-6 mt-10">
      <div className="flex items-center gap-6">
        <img
          className="w-28 h-28 rounded-full object-cover border-2 border-gray-300"
          src={profileImg}
          alt="Profile"
        />
        <div>
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p className="text-gray-500">{email}</p>
          <p className="text-gray-600 mt-1">{degree} - {speciality}</p>
          <span className="text-xs border px-2 py-0.5 rounded-full">{experience}</span>
        </div>
      </div>

      <div>
        <label className="font-medium text-gray-700">About</label>
        <p className="mt-1 text-gray-700">{about}</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="w-full sm:w-1/2">
          <label className="block text-gray-600 text-sm mb-1">Appointment Fee</label>
          <p>{currency} {fees}</p>
        </div>

        <div className="w-full sm:w-1/2">
          <label className="block text-gray-600 text-sm mb-1">Availability</label>
          <p>{available ? "Available" : "Unavailable"}</p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-gray-700 font-medium">Address</label>
        <p>{address.street}</p>
        <p>{address.city}</p>
        <p>{address.country}</p>
      </div>
    </div>
  );
};

export default DoctorProfile;
