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
      console.log("adminToken:", adminToken);


      
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



  // The `value` object will made avialable for all childe components through context.
  const value = {
    adminToken,
    setAdminToken,
    doctors,
    adminListAllDoctors,
  
  };

  // This makes the `value` available to all child components wrapped by provider.
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
