import React, { useState, useRef, useEffect, forwardRef } from "react";
import logo from "../../assets/img/logo_4.png";
import { Link } from "react-router-dom";
import "./style.css";
// image import
import avatar from "../../assets/profile/user.svg";

const Header = (props) => {
  // Main Function
  const [toggle, setToggle] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (e.target !== ref.current) {
        setToggle(false);
      }
    }

    window.addEventListener("click", handler);
  }, []);

  // End of Main
  return (
    <header className="flex px-1 py-2 bg-gray-200 h-14 xl:h-16 items-center">
      <div className=" w-1/3 md:ml-2 " id="logo p-2">
        <Link to="/">
          <img className="w-24 xl:w-28 mt-1" src={logo} />
        </Link>
      </div>
      <div className="w-2/3">
        <div className="flex items-center justify-end">
          <ul className="flex py-2 h-auto">
            {props.login ? (
              <div className="relative p-1 flex  justify-start items-center  md:flex-row md:mr-3 cursor-pointer lg:mr-4 min-w-2/6">
                <img className="w-6 md:mr-1 md:w-8" src={avatar} />
                <p className="text-xs w-full font-semibold text-center text-gray-800 cursor-default px-1 lg:text-base">
                  {props.currentUser.split(" ")[0]}
                </p>
              </div>
            ) : (
              <Link to="/login">
                <span className=" bg-blue-600 px-3 py-2 rounded-sm text-sm text-white mr-2 md:mr-4 font-medium ">
                  Sign In
                </span>
              </Link>
            )}
          </ul>

          {props.login ? (
            <div className="relative md:mr-4 cursor-pointer">
              <svg
                className="w-8 h-8 p-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                ref={ref}
                onClick={() => {
                  setToggle(!toggle);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {toggle ? (
                <div className="border absolute flex flex-col justify-center right-0 top-11 w-20 h-16 z-50 rounded-sm cursor-default bg-white lg:w-32 lg:h-24">
                  <ul className="">
                    <Link
                      to={props.homeHeader === "Profile" ? "/profile" : "/"}
                    >
                      <li className="text-center text-xs md:text-sm my-1 lg:text-base">
                        {props.homeHeader}
                      </li>
                    </Link>
                    <Link to="/logout">
                      <li className="text-center text-xs md:text-sm my-1 ">
                        Log Out
                      </li>
                    </Link>
                  </ul>
                </div>
              ) : (
                false
              )}
            </div>
          ) : (
            false
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
