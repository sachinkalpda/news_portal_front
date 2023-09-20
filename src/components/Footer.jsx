import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="footer bg-slate-950 ">
      <div className="p-3 md:p-12 container mx-auto xl:px-12">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 text-white">
          <div className="p-4">
            <h4 className="text-xl font-semibold mb-6">About</h4>
            <ul className="text-sm">
              <li className="text-gray-100 hover:text-white hover:underline hover:scale-y-105  py-2">
                <NavLink to="/">Our Story</NavLink>
              </li>
              <li className="text-gray-100 hover:text-white hover:underline hover:scale-y-105  py-2">
                <NavLink to="/">Mission</NavLink>
              </li>
              <li className="text-gray-100 hover:text-white hover:underline hover:scale-y-105  py-2">
                <NavLink to="/">About Us</NavLink>
              </li>
              <li className="text-gray-100 hover:text-white hover:underline hover:scale-y-105  py-2">
                <NavLink to="/">News</NavLink>
              </li>
            </ul>
          </div>
          <div className="p-4">
            <h4 className="text-xl font-semibold mb-6">Categories</h4>
            <ul className="text-sm">
              <li className="text-gray-100 hover:text-white hover:underline hover:scale-y-105  py-2">
                <NavLink to="/">Work</NavLink>
              </li>
              <li className="text-gray-100 hover:text-white hover:underline hover:scale-y-105  py-2">
                <NavLink to="/">Services</NavLink>
              </li>
              <li className="text-gray-100 hover:text-white hover:underline hover:scale-y-105  py-2">
                <NavLink to="/">Products</NavLink>
              </li>
              <li className="text-gray-100 hover:text-white hover:underline hover:scale-y-105  py-2">
                <NavLink to="/">Tips & Trick</NavLink>
              </li>
            </ul>
          </div>
          <div className="p-4">
            <h4 className="text-xl font-semibold mb-6">Categories</h4>
            <ul className="text-sm">
              <li className="text-gray-100 hover:text-white hover:underline hover:scale-y-105  py-2">
                <NavLink to="/">Work</NavLink>
              </li>
              <li className="text-gray-100 hover:text-white hover:underline hover:scale-y-105  py-2">
                <NavLink to="/">Services</NavLink>
              </li>
              <li className="text-gray-100 hover:text-white hover:underline hover:scale-y-105  py-2">
                <NavLink to="/">Products</NavLink>
              </li>
              <li className="text-gray-100 hover:text-white hover:underline hover:scale-y-105  py-2">
                <NavLink to="/">Tips & Trick</NavLink>
              </li>
            </ul>
          </div>
          <div className="p-4">
            <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="text-sm">
              <li className="text-gray-100 hover:text-white hover:underline hover:scale-y-105  py-2">
                <NavLink to="/">Privacy Policy</NavLink>
              </li>
              <li className="text-gray-100 hover:text-white hover:underline hover:scale-y-105  py-2">
                <NavLink to="/">Privacy Statement</NavLink>
              </li>
              <li className="text-gray-100 hover:text-white hover:underline hover:scale-y-105  py-2">
                <NavLink to="/">Use of Cookies</NavLink>
              </li>
              <li className="text-gray-100 hover:text-white hover:underline hover:scale-y-105  py-2">
                <NavLink to="/">International Editions</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto xl:px-12">
      <div className="border-t-1 border-gray-300 mt-3 p-3 text-center text-white ">
        Copyright ©2023 All rights reserved.
      </div>
      </div>
    </div>
  );
}

export default Footer;
