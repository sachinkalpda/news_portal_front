import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {RxCross1} from 'react-icons/rx';
import Navbar from "./Navbar";
// import {FaPowerOff} from 'react-icons/fa';
import { FaRegCircleUser } from "react-icons/fa6";
import { FiLogIn } from "react-icons/fi";
import { socialLink } from "../data/data";

import { FaBars } from "react-icons/fa";

import { useAuth } from "../hooks";
function Header() {
  const [screenSize, setScreenSize] = useState(undefined);
  const [activeMenu, setActiveMenu] = useState(false);

  const auth = useAuth();

  // handling resizing event for handling mobile menu
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.addEventListener("resize", handleResize);
  }, [activeMenu]);
  return (
    <div>
      <div className="flex justify-between items-center py-6 border-b-1 border-gray-300">
        <div className="font-bold text-2xl">
          <NavLink to="/">MEGASIS</NavLink>
        </div>

        <div className="flex justify-between  items-center">
          <div className="font-bold text-xl py-0 px-4 border-r-1 border-gray-300">
            {auth.user ? (
              <div className="flex">
                <NavLink to="/profile" className="mr-4 hover:text-red-700">
                  <FaRegCircleUser size={24} title="Profile" />
                </NavLink>
                <NavLink
                  to="/"
                  onClick={auth.logout}
                  className="hover:text-red-700 text-md"
                >
                  Log Out
                </NavLink>
              </div>
            ) : (
              <NavLink to="/login">
                <FiLogIn size={24} title="Log In" />
              </NavLink>
            )}
          </div>
          <div className="max-sm:hidden sm:hidden xl:flex justify-between gap-4 items-center p-3">
            {socialLink.map((item) => (
              <NavLink to={item.path} target="_blank" title={item.title} className="px-2 hover:text-red-700">
                {item.icon}
              </NavLink>
            ))}
          </div>
          <div className="xl:hidden p-3">
            {
              (activeMenu) ?
                <RxCross1 onClick={() => setActiveMenu(!activeMenu)} />
                :

                <FaBars onClick={() => setActiveMenu(!activeMenu)} />
            }
          </div>
        </div>
      </div>
      <Navbar screen={screenSize} menu={activeMenu} />
    </div>
  );
}

export default Header;
