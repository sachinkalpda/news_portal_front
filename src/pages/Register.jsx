import React, { useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import { useAuth } from "../hooks";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const auth = useAuth();
  const history = useNavigate();

  const handleSubmit = async  (e) => {
    e.preventDefault();
    setRequestInProgress(true);
    // checking name , email, password, confirmPassword are required
    if(!name || !email || !password || !confirmPassword){
      toast.error('All Fields are Required');
      setRequestInProgress(false);
      return;
    }
    // checking if password mathching or not
    if(password !== confirmPassword){
      setPassword('');
      setConfirmPassword('');
      toast.error("Password doesn't matched");
      setRequestInProgress(false);
      return;
    }
    // checking checkbox is checked
    if(!checked){
      toast.error('Please Accept Terms & Conditions to Continue.');
      setRequestInProgress(false);
      return;
    }

    const response = await auth.register(name,email,password);

    if(response.success){
      setRequestInProgress(false);
      toast.success('Registered Successfully. Please Login to Continue');
      history('/login')
      return;
    }else{
      toast.error(response.message);
    }
    setRequestInProgress(false);

  }

  if (auth.user) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <p className="text-sm text-gray-400 my-3">
        <NavLink to="/">
          <span className="underline hover:text-red-700">Home</span>
        </NavLink>
        / Register
      </p>
      <div className="max-w-[650px] shadow-xl p-4 mx-auto text-center my-10">
        <h2 className="font-thin text-3xl py-4">Register</h2>
        <p className="text-md text-gray-500">
          Create your account to get full access
        </p>
        <form onSubmit={handleSubmit}>
          <div className="my-3 p-3 flex flex-col text-left">
            <label>Full Name</label>
            <input
              type="text"
              className="outline-none border-1 mt-1 mb-6 border-gray-300 focus:border-red-700 p-3 placeholder:text-sm"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email Address</label>
            <input
              type="email"
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
            <label>Confirm Password</label>
            <input
              type="password"
              className="outline-none border-1 mt-1 mb-6 border-gray-300 focus:border-red-700 p-3 placeholder:text-sm"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <p className="text-sm text-left cursor-pointer flex items-center">
              <input type="checkbox" className="mr-2" onChange={(e) => setChecked(e.target.checked)}/>I have already Read{" "}
              <span className="text-red-700">Terms & Conditions</span>.
            </p>
          </div>
          <div className="flex justify-between items-center p-3">
            <p>
              Already Have Account?
              <NavLink to="/login">
                <span className="text-red-700">Log In</span> Here.
              </NavLink>
            </p>
            <button
              disabled={requestInProgress}
              className="bg-red-700 px-10 py-4 text-xl text-white rounded-sm hover:bg-slate-950"
            >
              {requestInProgress ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
