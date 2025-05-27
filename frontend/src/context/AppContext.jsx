import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbols = "€";

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [userToken, setUserToken] = useState(
    localStorage.getItem("userToken") ? localStorage.getItem("userToken") : ""
  );
  const [userData, setUserData] = useState(false);

  //frontend doctorslist from the backend
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}api/v1/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //get user profile data from the database

  const getUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}api/v1/user/get-profile`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // perform side effects using user effect
  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (userToken) {
      getUserProfileData();
    }
  }, [userToken]);

  const value = {
    doctors,
    currencySymbols,
    getDoctorsData,
    backendUrl,
    userToken,
    setUserToken,
    userData,
    setUserData,
    getUserProfileData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
