import React, { useState } from "react";

const Login = () => {
  //Track whether the user is signing up or logging in
  //Possible values 'Sign up' or 'Login'
  const [state, setState] = useState("Login");

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
    <form>
      <div>
        <p>{state === 'Sign Up' ? "Create Account":"Login"}</p>
      </div>
    </form>
  );
};

export default Login;
