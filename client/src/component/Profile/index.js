import axios from "axios";
import "./style.css";
import React, { useState, useEffect } from "react";
import Graph from "../Graph/index";
import BrandIcons from "../../service/images";
import Loader from "react-loader-spinner";

const Profile = (props) => {
  // Main
  const [openSearch, setSearch] = useState(false);
  const [ongoing, setOngoing] = useState(true);
  const [tracked, setTracked] = useState(false);
  const [Notification, setNotification] = useState(false);
  const [ongoingTask, setOngoingTask] = useState([]);
  const [trackedTask, setTrackedTask] = useState([]);
  const [notificationTask, setNotificationTask] = useState([]);
  const [onLoding, setOnLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/profileData");
        const notification = await axios.get("/notification");
        if (response.data["Data"] !== undefined) {
          const ongoingTask = response.data["Data"].filter((Element) => {
            if (Element["pricedrop"] === false) {
              return Element;
            }
          });
          const trackedTask = response.data["Data"].filter((Element) => {
            if (Element["pricedrop"] === true) {
              return Element;
            }
          });
          setOngoingTask(ongoingTask);
          setTrackedTask(trackedTask);
          setOnLoading(false);
        }
        setNotificationTask(notification.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();

    return () => {};
  }, []);

  // End of Main
  return (
    <div className="profile scrollbar-hide pt-2 h-screen bg-white">
      <div className="border border-gray-300 mx-2 rounded-sm mb-8 md:w-11/12 md:mx-auto">
        <div className="flex justify-between items-center px-2 py-1">
          <div className=" p-1 md:w-1/2 ">
            <span
              className={
                ongoing
                  ? "text-xs px-2 lg:text-lg cursor-pointer text-blue-600 "
                  : "text-xs px-2 lg:text-lg cursor-pointer "
              }
              onClick={() => {
                setTracked(false);
                setOngoing(true);
                setNotification(false);
              }}
            >
              Ongoing
            </span>
            <span
              className={
                tracked
                  ? "text-xs px-2 lg:text-lg cursor-pointer text-blue-600 "
                  : "text-xs px-2 lg:text-lg cursor-pointer "
              }
              onClick={() => {
                setTracked(true);
                setOngoing(false);
                setNotification(false);
              }}
            >
              Tracked
            </span>
            <span
              className={
                Notification
                  ? "text-xs px-2 lg:text-lg cursor-pointer text-blue-600 "
                  : "text-xs px-2 lg:text-lg cursor-pointer "
              }
              onClick={() => {
                setTracked(false);
                setOngoing(false);
                setNotification(true);
              }}
            >
              Notification
            </span>
          </div>
          <div className="flex justify-center items-center ">
            <div className="relative">
              <svg
                className="w-4 h-4 m-2 md:hidden lg:hidden cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  setSearch(!openSearch);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {openSearch ? (
                <input
                  className="absolute right-0 top-10 text-xs p-1 rounded-sm shadow-sm  md:hidden lg:hidden border border-gray-300 outline-none"
                  type="text"
                  placeholder="Search Products"
                />
              ) : (
                false
              )}
              <input
                className=" border hidden md:block md:text-sm lg:block p-1 rounded-sm outline-none"
                placeholder="Search Product"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Info Tiles */}
      {onLoding ? (
        <div className="h-screen flex justify-center ">
          <Loader
            className="mt-24"
            type="TailSpin"
            color="rgb(76, 76, 76)"
            height={50}
            width={50}
            timeout={30000} //3 secs
          />
        </div>
      ) : (
        false
      )}

      {ongoing &&
        ongoingTask.map((element, index) => {
          return (
            <div className="flex flex-col" key={element["_id"]}>
              <div className="border border-gray-300 shadow-sm mx-2 rounded-sm my-2 md:w-11/12 md:mx-auto">
                <div>
                  <img
                    className="w-16 mx-1 my-1 lg:w-24"
                    src={BrandIcons[element["vendor"]]}
                  />
                </div>
                <div className="flex flex-col items-center px-2 lg:flex-row lg:justify-between">
                  <div className="text-sm text-center lg:text-lg">
                    {/* CHHAVI INDIA 120 TC Microfiber Double 3D Printed Bedsheet
                  (Pack of 1, Blue, White) */}
                    {element["title"]}
                  </div>
                  <div className="text-sm font-semibold lg:text-lg">
                    Marked Price :
                    {(function () {
                      const formatter = new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(element["target_price"]);
                      return formatter;
                    })()}
                  </div>
                </div>
                <div>
                  <Graph
                    dateArray={element["dateArray"]}
                    priceArray={element["current_price"]}
                  />
                </div>
              </div>
            </div>
          );
        })}

      {tracked &&
        trackedTask.map((element) => {
          return (
            <div className="flex flex-col" key={element["_id"]}>
              <div className="border border-gray-300 shadow-sm mx-2 rounded-sm my-2 md:w-11/12 md:mx-auto">
                <div>
                  <img
                    className="w-16 mx-1 my-1 lg:w-24"
                    src={BrandIcons[element["vendor"]]}
                  />
                </div>
                <div className="flex flex-col items-center px-2 lg:flex-row lg:justify-between">
                  <div className="text-sm text-center lg:text-lg">
                    {/* CHHAVI INDIA 120 TC Microfiber Double 3D Printed Bedsheet
                  (Pack of 1, Blue, White) */}
                    {element["title"]}
                  </div>
                  <div className="text-sm font-semibold lg:text-lg">
                    Marked Price :
                    {(function () {
                      const formatter = new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(element["target_price"]);
                      return formatter;
                    })()}
                  </div>
                </div>
                <div>
                  <Graph
                    dateArray={element["dateArray"]}
                    priceArray={element["current_price"]}
                  />
                </div>
              </div>
            </div>
          );
        })}

      {/* Notification Panel */}
      {Notification &&
        notificationTask.map((element) => {
          return (
            <div
              className="border border-gray-300 flex flex-col items-center m-2 shadow-sm mx-2 rounded-sm my-2 md:w-11/12 md:mx-auto "
              key={element["_id"]}
            >
              <div className=" flex flex-col w-full items-center p-2">
                <div className="notification__date text-xs font-semibold mb-2 xl:text-base">
                  {(function () {
                    const date = new Date(element["date"]);
                    return date.toDateString();
                  })()}
                </div>
                <div className="notification__title text-xs text-center md:text-sm lg:text-lg">
                  {/* Bathla Advance 5-Step Foldable, with Sure-Hinge Technology
                  (Orange) Aluminium Ladder (With Platform) */}
                  {element["title"]}
                </div>
              </div>
              <div className="flex justify-between items-center w-full py-2 px-1">
                <div className="target__price text-xs font-semibold text-gray-800 xl:text-base">
                  Marked Price :{" "}
                  {(function () {
                    const formatter = new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(element["target_price"]);
                    return formatter;
                  })()}
                </div>
                <div className="buy__btn">
                  <span className="  py-1 px-2 rounded-sm text-white font-medium bg-blue-500 xl:py-2 ">
                    <a
                      className="text-xs xl:text-sm "
                      href={element["url"]}
                      target="_blank"
                      alt="buy now"
                    >
                      Buy Now{" "}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          );
        })}

      {/* End of Notification */}
    </div>
  );
};

export default Profile;
