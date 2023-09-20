import React, { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import {toast} from 'react-toastify';
import {useAuth} from '../hooks';
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useAuth();

  // function for handle user's login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    // checking if email and password not empty
    if(!email || !password){
      setLoggingIn(false);
      toast.error("Email and Password is Required");
      return;
    }

    const response = await auth.login(email,password)

    setLoggingIn(false);

    if(response.success){
      toast.success('Login Successfully');
    }else{
      toast.error(response.message);
    }
  };
  // console.log(auth);
  if(auth.user){
    return <Navigate to='/' />
  }

  return (
    <div>
      <p className="text-sm text-gray-400 my-3">
        <NavLink to="/">
          <span className="underline hover:text-red-700">Home</span>
        </NavLink>
        / Login
      </p>
      <div className="max-w-[650px] shadow-xl p-4 mx-auto text-center my-10">
        <h2 className="font-thin text-3xl py-4">Login</h2>
        <p className="text-md text-gray-500">
          Enter Login details to get access
        </p>
        <form onSubmit={handleSubmit}>
          <div className="my-3 p-3 flex flex-col text-left">
            <label>Email Address</label>
            <input
              type="text"
              className="outline-none border-1 mt-1 mb-6 border-gray-300 focus:border-red-700 p-3 placeholder:text-sm"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              className="outline-none border-1 mt-1 mb-6 border-gray-300 focus:border-red-700 p-3 placeholder:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-sm text-red-700 text-right cursor-pointer">
              Forgot Password?
            </p>
          </div>
          <div className="flex justify-between items-center p-3">
            <p>
              Don't Have Account? 
              <NavLink to="/register">
                <span className="text-red-700"> Sign Up</span> Here.
              </NavLink>
            </p>
            <button
              type="submit"
              disabled={loggingIn}
              className="bg-red-700 px-10 py-4 text-xl text-white rounded-sm hover:bg-slate-950"
            >
              {loggingIn ? "Logging In..." : "Log In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
