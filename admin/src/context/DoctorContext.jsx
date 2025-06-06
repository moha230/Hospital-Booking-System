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

      console.log("Dashboard response:", data);

      if (data.success) {
        setDashboardData(data.dashboard);
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
    
      setProfileData(data.profileData);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateProfile = async (profileData, imageFile = null) => {
    try {
      const formData = new FormData();
  
      formData.append("about", profileData.about);
      formData.append("available", profileData.available);
  
      formData.append("address", JSON.stringify(profileData.address));
  
      if (imageFile) {
        formData.append("image", imageFile); 
      }
  
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${doctorToken}`,
            "Content-Type": "multipart/form-data", 
          },
        }
      );
  
      if (data.success) {
        toast.success(data.message);
        getProfileData();
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      return false;
    }
  };
  
  

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}api/v1/doctor/complete-appointment`,
        {
          headers: {
            Authorization: `Bearer ${doctorToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        listAllAppointments();

        getDashboardData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

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
    completeAppointment,
    updateProfile,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
