import { createContext, useEffect, useState } from "react";
import { doctors } from "../assets";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbols = "€"; //
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);

  //frontend doctorslist from the backend
  const getdoctorsData = async () => {
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

  // perform side effects using user effect
  useEffect(() => {
    getdoctorsData();
  }, []);

  const value = {
    doctors,
    currencySymbols,
    getdoctorsData,
    backendUrl,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;

//import axios
// get back end url
