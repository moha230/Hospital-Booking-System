import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  // Get the backend URL from the environment variables
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  //doctor token and settoken with intitial string check local storage
  const [doctorToken, setDoctorToken] = useState(
    localStorage.getItem("doctorToken")
      ? localStorage.getItem("doctorToken")
      : ""
  );

  const [profileData, setProfileData] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [dashboardData, setDashboardData] = useState(false);

  //list all  all appointments data from Database
  const listAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}api/v1/doctor/list-appointments`,
        {
          headers: {
            Authorization: `Bearer ${doctorToken}`,
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

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}api/v1/doctor/dashboard`, {
        headers: {
          Authorization: `Bearer ${doctorToken}`,
        },
      });

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

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}api/v1/doctor/profile`, {
        headers: {
          Authorization: `Bearer ${doctorToken}`,
        },
      });
      console.log(data.profileData);
      setProfileData(data.profileData);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  
  const completeAppointment = async (appointmentId) => {

    try {

      const { data } = await axios.get(`${backendUrl}api/v1/doctor/complete-appointment`, {
        headers: {
          Authorization: `Bearer ${doctorToken}`,
        },
      });

        if (data.success) {
            toast.success(data.message)
            listAllAppointments()
            
            getDashboardData()
        } else {
            toast.error(data.message)
        }

    } catch (error) {
        toast.error(error.message)
        console.log(error)
    }

}

  const value = {
    doctorToken,
    setDoctorToken,
    backendUrl,
    appointments,
    getDashboardData,
    listAllAppointments,
    getProfileData,
    profileData,
    dashboardData,
    completeAppointment
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
