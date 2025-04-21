import React, { useState } from "react";

const Login = () => {
  //Track whether the user is signing up or logging in
  //Possible values 'Sign up' or 'Login'
  const [state, setState] = useState("Sign Up");

  //Stores the users full name input (only used in Sign Up mode)
  const [name, setName] = useState("");

  //Stores the users emails input (used in both Login and Sign up)
  const [email, setEmail] = useState("");

  //Stores user password input (used in both Login and Sign Up)
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <form className="min-h-[100vh] flex items-center justify-center">
      <div className="flex flex-col gap-4 p-8 w-full max-w-md border rounded-xl text-[#5E5E5E] text-sm shadow-lg bg-white">
        <h2 className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="mb-4">
          Please {state === "Sign Up" ? "sign up" : "log in"} to book an
          appointment
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-[#DADADA] rounded w-full p-2"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <label className="block mb-1 font-medium">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <label className="block mb-1 font-medium">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2"
            type="password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-opacity-90 transition text-white w-full py-2 mt-4 rounded-md text-base font-medium"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === 'Sign Up'
          ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
          : <p>Create an new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  );
};

export default Login;




