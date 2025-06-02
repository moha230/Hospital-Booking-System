import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

// Create a new context object called AdminContext
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  // Get the backend URL from the environment variables
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  //admin token and settoken with intitial string check local storage
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") ? localStorage.getItem("adminToken") : ""
  );

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashboardData, setDashboardData] = useState(false);

  // Function listing  all Doctors data from Database
  const adminListAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}api/v1/admin/list-all-doctors`,
        {},
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  //function to change  availability of doctors
  const changeAvailability = async (doctorId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}api/v1/admin/change-availability`,
        { doctorId },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        //call the list all doctors to update the data
        adminListAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //list all  all appointments data from Database
  const listAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}api/v1/admin/list-appointments`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Function to cancel appointment using API
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}api/v1/admin/cancel-appointment`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        listAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}api/v1/admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    adminToken,
    setAdminToken,
    doctors,
    adminListAllDoctors,
    changeAvailability,
    appointments,
    listAllAppointments,
    cancelAppointment,
    getDashboardData,
    dashboardData
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
