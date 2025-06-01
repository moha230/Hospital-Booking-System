import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

const UserAppointments = () => {
  const { backendUrl, userToken } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}api/v1/user/appointments`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (userToken) {
      getUserAppointments();
    }
  }, [userToken]);

  return (
    <div className="px-4 sm:px-8 py-8">
      <p className="pb-4 text-2xl font-semibold text-green-600 border-b">
        Your Appointments
      </p>
      <div className="grid gap-6 mt-6">
        {appointments.map((item, index) => {
          const doc = item.docData;

          // Merge date + time with moment
          let dateTime = "";
          if (item.slotTime.includes("T")) {
            dateTime = moment(item.slotTime); // ISO
          } else {
            // e.g. slotDate = "1_6_2025", slotTime = "09:00"
            const [d, m, y] = item.slotDate.split("_");
            dateTime = moment(
              `${y}-${m}-${d} ${item.slotTime}`,
              "YYYY-MM-DD HH:mm"
            );
          }

          return (
            <div
              key={index}
              className="flex flex-col sm:flex-row bg-white shadow-md rounded-xl overflow-hidden border"
            >
              <div className="sm:w-40 flex-shrink-0 bg-[#EAEFFF]">
                <img
                  className="w-full h-40 sm:h-full object-cover rounded-md"
                  src={doc?.image || "https://via.placeholder.com/150"}
                  alt={doc?.name || "Doctor"}
                />
              </div>

              <div className="flex-1 p-4 text-sm text-[#5E5E5E]">
                <p className="text-[#262626] text-lg font-semibold mb-1">
                  {doc?.name || "Doctor name unavailable"}
                </p>
                <p className="mb-1 capitalize">
                  {doc?.speciality || "Speciality"}
                </p>

                <p className="text-[#464646] font-medium mt-2">Address:</p>
                <p>{doc?.address?.street || "Street not set"}</p>
                <p>
                  {doc?.address?.city || "City"},{" "}
                  {doc?.address?.country || "Country"}
                </p>

                <p className="mt-2">
                  <span className="text-[#3C3C3C] font-medium">
                    Date & Time:
                  </span>{" "}
                  {dateTime.format("D.M.YYYY")} time {dateTime.format("HH:mm")}
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
          );
        })}
      </div>
    </div>
  );
};

export default UserAppointments;
