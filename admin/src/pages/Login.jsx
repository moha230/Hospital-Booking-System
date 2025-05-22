import React, { useContext, useState } from "react";
import { AdminContext } from "@/context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";


const Login = () => {
  // State to track which type of login is currently active ("Admin" or "Doctor")
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { setAdminToken } = useContext(AdminContext);
  
  console.log("Backend URL:", backendUrl);

  //function for handlins submition
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "api/v1/admin/login", {
          email,
          password,
        });

        if (data.success) {
          setAdminToken(data.token);
          //set the token to local storage
          localStorage.setItem("adminToken", data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // Main form container, centers the content both vertically and horizontally
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center justify-center"
    >
      <div className="flex flex-col gap-4 p-6 border rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center">
          <span>{state}</span> Login
        </h2>

        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            id="email"
            name="email"
            required
            className="border border-gray-300 w-full p-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            id="password"
            name="password"
            required
            className="border border-gray-300 w-full p-2 rounded"
          />
        </div>

        <button type="submit" className="bg-primary  text-white py-2 rounded">
          Login
        </button>

        <p className="text-sm text-center mt-2">
          {state === "Admin" ? (
            <>
              Doctor login?{" "}
              <span
                className="text-green-600 cursor-pointer"
                onClick={() => setState("Doctor")}
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Admin login?{" "}
              <span
                className="text-green-600 cursor-pointer"
                onClick={() => setState("Admin")}
              >
                Click here
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export { Login };
