import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { navMenu } from "../data/data";
import { BsSearch } from "react-icons/bs";
function Navbar(props) {
  const [mobileScreen, setMobileScreen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);

  // handling toggle menu and mobile menu
  useEffect(() => {
    if(props.screen <= 1280){
      setMobileScreen(true);
      setActiveMenu(props.menu);
    }else{
      setMobileScreen(false);
      setActiveMenu(false);
    }
  },[props,mobileScreen,activeMenu]);
  return (
    <div className="flex justify-between items-center border-b-4 border-slate-950 py-4">
      <div className=" font-bold text-md py-2">
        <ul
          className={
            mobileScreen
              ? !activeMenu ? "w-0 hidden" :"w-72 top-0 left-0 fixed h-full bg-white md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 shadow-lg"
              : "xl:flex justify-between items-center gap-3"
          }
        >
          {mobileScreen ? (
            <h2 className="font-bold text-left text-xl uppercase py-4 px-1 border-b-1 border-gray-500">
              Megasis
            </h2>
          ) : (
            <></>
          )}
          {navMenu.map((link) => (
            <li
              className={
                mobileScreen
                  ? "hover:text-red-700 hover:bg-neutral-200 px-3 py-3 capitalize border-b-1 border-gray-300"
                  : "hover:text-red-700 px-1 capitalize"
              }
            >
              <NavLink to={link.path}>{link.name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="max-sm:w-full sm:w-full xl:max-w-[200px]">
        <input
          type="text"
          className="border-b-2 border-white focus:border-red-700 outline-none w-full"
          placeholder="Search..."
        />
        <button type="button" className="-ml-6">
          <BsSearch size={24} />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
