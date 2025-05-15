import { createContext, useState } from "react"; //importing necessary hooks and functions from react 


// Create a new context object called AdminContext
export const AdminContext = createContext();



const AdminContextProvider = (props) => {

//admin token and settoken with intitial string
const [adminToken, setAdmintoken] = useState("");


// Get the backend URL from the environment variables
const backendUrl = import.meta.env.VITE_BACKEND_URL

// The `value` object will made avialable for all childe components through context.
  const value = {
    adminToken,
    setAdmintoken,
    backendUrl 
  };

  // This makes the `value` available to all child components wrapped by provider.
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
