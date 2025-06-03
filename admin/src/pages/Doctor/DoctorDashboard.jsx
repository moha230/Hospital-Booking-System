import React, { useContext, useEffect } from "react";
import moment from "moment";
import { assets } from "../../assets/assets";
import { DoctorContext } from "../../context/DoctorContext";

const Dashboard = () => {
  const { doctorToken, getDashboardData, dashboardData } =
    useContext(DoctorContext);

  useEffect(() => {
    if (doctorToken) {
      getDashboardData();
    }
  }, [doctorToken]);

  if (!dashboardData) {
    return <div className="p-4 text-gray-600">Loading dashboard data...</div>;
  }

  const cancelledCount = dashboardData.latestAppointments.filter(
    (app) => app.cancelled
  ).length;

  return (
    <div className="m-5">
      {/* Summary Cards */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.doctor_icon} alt="Doctors" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.doctors}
            </p>
            <p className="text-gray-400">Doctors</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img
            className="w-14"
            src={assets.appointments_icon}
            alt="Appointments"
          />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.appointments}
            </p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.patients_icon} alt="Patients" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.patients}
            </p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>

        {/* Cancelled Summary */}
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-red-100 cursor-pointer hover:scale-105 transition-all">
          <img
            className="w-14"
            src={assets.cancel_icon || assets.warning_icon}
            alt="Cancelled"
          />
          <div>
            <p className="text-xl font-semibold text-red-500">
              {cancelledCount}
            </p>
            <p className="text-gray-400">Cancelled</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="bg-white mt-10 rounded shadow">
        <div className="flex items-center gap-2.5 px-4 py-4 border-b">
          <img src={assets.list_icon} alt="List" />
          <p className="font-semibold">Latest Bookings</p>
        </div>

        <div className="pt-4">
          {dashboardData.latestAppointments.slice(0, 5).map((item, index) => {
            const formattedDate = moment(
              item.slotDate.replace(/_/g, "/"),
              "D/M/YYYY"
            ).format("DD MMM YYYY");

            return (
              <div
                key={index}
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
              >
                <img
                  className="rounded-full w-10 h-10 object-cover"
                  src={item.docData.image}
                  alt="Doctor"
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.docData.name} with {item.userData.name.trim()}
                  </p>
                  <p className="text-gray-600">
                    Booking on {formattedDate} at {item.slotTime}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <p className="text-yellow-500 text-xs font-medium">
                    Upcoming
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
