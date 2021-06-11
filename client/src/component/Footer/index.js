import React, { useState } from "react";
import "./style.css";
import About from "../About/index";
import HowToUse from "../Howtouse/index";
const Footer = () => {
  const [toggler, setToggler] = useState(true);
  const [about, setAbout] = useState(false);
  const [contact, setContact] = useState(false);
  const [hwt, setHwt] = useState(false);

  return (
    <footer className="flex flex-col justify-center text-xs w-full p-2 ">
      <div className="flex flex-col xl:flex-row  p-2 justify-between">
        <div className=" flex xl:flex-col justify-center xl:w-1/3 ">
          <div className="flex-1 flex justify-center p-1 items-center ">
            <span
              className="cursor-pointer text-gray-200 font-medium xl:text-base"
              onClick={() => {
                setToggler(false);
                setContact(true);
                setAbout(false);
                setHwt(false);
              }}
            >
              Contact Us
            </span>
          </div>
          <div className="flex-1 flex justify-center p-1 items-center">
            <span
              className="cursor-pointer text-gray-200  font-medium  xl:text-base"
              onClick={() => {
                setToggler(false);
                setContact(false);
                setAbout(true);
                setHwt(false);
              }}
            >
              About Us
            </span>
          </div>
          <div className="flex-1 flex justify-center p-1 items-center">
            <span
              className="cursor-pointer text-gray-200 font-medium xl:text-base"
              onClick={() => {
                setToggler(false);
                setContact(false);
                setAbout(false);
                setHwt(true);
              }}
            >
              How to use
            </span>
          </div>
        </div>
        <div className="relative my-1 h-36 overflow-y-scroll  scrollbar-hide xl:w-2/3 xl:h-36 xl:my-0">
          <div className="flex justify-end absolute right-1 top-1 z-50 ">
            <svg
              className={
                toggler
                  ? "w-6 h-6 text-gray-400 cursor-pointer hidden"
                  : "w-6 h-6 text-gray-400 cursor-pointer"
              }
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                setToggler(true);
                setContact(false);
                setAbout(false);
                setHwt(false);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {toggler && (
            <div className=" flex flex-col p-2 h-full justify-center xl:items-end ">
              <div className=" md:flex md:items-center md:flex-col md:py-2">
                <h1 className="text-gray-200 text-xl font-medium">GET ALRT</h1>
                <p className="text-gray-200 text-sm font-medium">
                  Free Price Tracker For E-commerce Sites
                </p>
                <div className="text-gray-200 ">Social Media Icons</div>
              </div>
            </div>
          )}

          {contact && (
            <div className="contact__us flex flex-col  h-full py-2">
              <input
                type="text"
                placeholder="Email"
                className="p-1 w-2/3 md:w-4/12 xl:w-6/12 mx-auto border border-gray-400 outline-none rounded-sm"
              />
              <textarea
                className="w-8/12 mx-auto md:w-4/12 xl:w-6/12 my-2 px-2 py-2 border border-gray-400 outline-none"
                placeholder="Message "
              ></textarea>
              <button className="footer__btn border border-blue-500 bg-blue-600 hover:border-gray-300 p-1 my-0 rounded-xl w-3/12 xl:w-2/12 mx-auto text-white font-medium outline-none focus:outline-none">
                Send
              </button>
            </div>
          )}

          <div className="about__us">{about && <About />}</div>
          <div className="how__to__use">{hwt && <HowToUse />}</div>
        </div>
      </div>
      <div className="text-xs text-gray-200 font-medium text-center p-2">
        &#169; All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
