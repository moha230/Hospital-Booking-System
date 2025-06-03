import React, { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import moment from "moment";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../components/adminTable";

const AllAppointments = () => {
  const { adminToken, appointments, cancelAppointment, listAllAppointments } =
    useContext(AdminContext);
  const { currency } = useContext(AppContext);

  useEffect(() => {
    if (adminToken) listAllAppointments();
  }, [adminToken]);

  const formatDate = (slotDate) => {
    if (!slotDate || !slotDate.includes("_")) return "Invalid";
    const [d, m, y] = slotDate.split("_");
    return moment(`${y}-${m}-${d}`, "YYYY-MM-DD").format("DD MMM YYYY");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="w-full flex justify-center mb-4">
        <h2 className="text-xl font-semibold">All Appointments</h2>
      </div>

      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Fees</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-sm text-gray-400 py-6"
                >
                  No appointments available.
                </TableCell>
              </TableRow>
            ) : (
              appointments.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <div className="flex items-center space-x-2">
                      <img
                        src={item.userData.image}
                        alt="Doctor"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="whitespace-nowrap">
                        {item.userData.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{item.userData.gender}</TableCell>
                  <TableCell>
                    {formatDate(item.slotDate)}, {item.slotTime}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <div className="flex items-center space-x-2">
                      <img
                        src={item.docData.image}
                        alt="Doctor"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="whitespace-nowrap">
                        {item.docData.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {currency || "€"}
                    {item.amount}
                  </TableCell>
                  <TableCell>
                    {item.cancelled ? (
                      <span className="text-red-500 font-semibold text-xs">
                        Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <span className="text-green-600 font-semibold text-xs">
                        Completed
                      </span>
                    ) : (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="text-blue-600 hover:underline text-xs"
                      >
                        Cancel
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllAppointments;
