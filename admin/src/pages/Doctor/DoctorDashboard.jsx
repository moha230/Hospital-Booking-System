import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const { doctorToken, getDashboardData, dashboardData } =
    useContext(DoctorContext);

  useEffect(() => {
    if (doctorToken) {
      getDashboardData();
      console.log("Dashboard fetching triggered");
    }
  }, [doctorToken, getDashboardData]);

  if (!dashboardData) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="bg-white mt-10 rounded shadow">
      <div className="flex items-center gap-2.5 px-4 py-4 border-b">
        <img src={assets.list_icon} alt="List" />
        <p className="font-semibold">Latest Bookings</p>
      </div>

      <div className="pt-4">
        {dashboardData.latestAppointments?.slice(0, 5).map((item, index) => {
          const formattedDate = item.slotDate?.replace(/_/g, "/") || "Unknown";

          return (
            <div
              key={index}
              className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
            >
              <img
                className="rounded-full w-10 h-10 object-cover"
                src={item.userData?.image || assets.default_avatar}
                alt="User"
              />
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">
                  {item.docData?.name || "Doctor"} with{" "}
                  {item.userData?.name || "User"}
                </p>
                <p className="text-gray-600">
                  Booking on {formattedDate} at {item.slotTime}
                </p>
              </div>
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <p className="text-yellow-500 text-xs font-medium">Upcoming</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorDashboard;
