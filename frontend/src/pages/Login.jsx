import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const [state, setState] = useState("Sign Up");

  //Stores the users full name input (only used in Sign Up mode)
  const [name, setName] = useState("");

  //Stores the users emails input (used in both Login and Sign up)
  const [email, setEmail] = useState("");

  //Stores user password input (used in both Login and Sign Up)
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { backendUrl, userToken, setUserToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}api/v1/user/register`, {
          name,
          password,
          email,
        });
        if (data.success) {
          //save data to local storage
          localStorage.setItem("userToken", data.userToken);
          setUserToken(data.userToken);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}api/v1/user/login`, {
          password,
          email,
        });

        if (data.success) {
          //save data to local storage
          localStorage.setItem("userToken", data.userToken);
          setUserToken(data.userToken);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (userToken) {
      toast.info("You're already logged in.");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [userToken]);
  
 




  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "login"} to book
          appointment
        </p>
        {state === "Sign Up" ? (
          <div className="w-full ">
            <p>Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="text"
              required
            />
          </div>
        ) : null}
        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) => {
              console.log("Email:", e.target.value);
              setEmail(e.target.value);
            }}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button className="bg-primary text-white w-full py-2 my-2 rounded-md text-base">
          {state === "Sign Up" ? "Create account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create an new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
