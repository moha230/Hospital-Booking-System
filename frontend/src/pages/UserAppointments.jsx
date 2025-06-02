import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

const UserAppointments = () => {
  const { backendUrl, userToken, getDoctorsData} = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}api/v1/user/appointments`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      const fetched = Array.isArray(data.appointments)
        ? data.appointments
        : data;
      setAppointments(fetched.reverse());
      console.log(fetched);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch appointments");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}api/v1/user/cancel-appointment`,
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (userToken) getUserAppointments();
  }, [userToken]);

  return (
    <div className="px-4 sm:px-8 py-8">
      <p className="pb-4 text-2xl font-semibold text-green-600 border-b">
        Your Appointments
      </p>
      <div className="grid gap-6 mt-6">
        {appointments
          .filter((item) => !item.cancelled) // 🧼 Filter out cancelled ones
          .map((item) => {
            const doc = item.doctor;
            let dateTime;

            try {
              if (item.slotDate.includes("_")) {
                const [d, m, y] = item.slotDate.split("_");
                dateTime = moment(
                  `${y}-${m}-${d} ${item.slotTime}`,
                  "YYYY-MM-DD HH:mm"
                );
              } else {
                dateTime = moment(item.slotTime);
              }
            } catch {
              dateTime = moment.invalid();
            }

            return (
              <div
                key={item._id}
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
                    {doc?.speciality || "Speciality not set"}
                  </p>

                  <p className="text-[#464646] font-medium mt-2">
                    Clinic Location:
                  </p>
                  <p>{doc?.city || "City not set"}</p>

                  <p className="mt-2">
                    <span className="text-[#3C3C3C] font-medium">
                      Date & Time:
                    </span>{" "}
                    {dateTime.isValid() ? (
                      <>
                        {dateTime.format("DD MMMM YYYY")} ||{" "}
                        {dateTime.format("HH:mm")}
                      </>
                    ) : (
                      "Invalid date"
                    )}
                  </p>

                  {item.cancelled && (
                    <p className="mt-2 text-red-500 font-semibold">
                      Status: Cancelled
                    </p>
                  )}
                </div>

                {!item.cancelled && (
                  <div className="p-4 flex flex-col justify-between items-center gap-3 border-t sm:border-l sm:border-t-0">
                    <button
                      className="w-full sm:w-36 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                      disabled={item.payment}
                    >
                      {item.payment ? "Paid" : "Pay"}
                    </button>
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="w-full sm:w-36 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UserAppointments;
