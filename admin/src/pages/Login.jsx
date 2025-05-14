import React, { useState } from "react";
import { assets } from "@/assets/assets"; // Assuming you will use icons later

const Login = () => {
  const [state, setState] = useState("Admin");

  return (
    <form className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col gap-4 p-6 border rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center">
          <span>{state}</span> Login
        </h2>

        <div>
          <label htmlFor="email">Email</label>
          <input
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
