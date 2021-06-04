import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import Loader from "react-loader-spinner";
// Image imports

import flipkartBg from "../../assets/img/flipkart__bg.png";
import amazon from "../../assets/brands/amazon.svg";

import Brands from "../../service/images";

const Home = (props) => {
  // Main Function
  const [url, setUrl] = useState("");
  const [placeholder, setPlaceholder] = useState("Enter Product URL / Link");
  const [userPlaceholder, setUserPlaceholder] = useState("Enter Price");
  const [userPrice, setUserPrice] = useState("");
  const [updateIndex, setUpdateIndex] = useState(null);
  const [updateReq, setUpdateReq] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverResponse, setServerResponse] = useState([]);
  const [responseLoading, setResponseLoading] = useState(false);
  const [responseLoaded, setResponseLoaded] = useState(false);
  const [msgResponse, setMsgResponse] = useState({});
  // URL Submit
  const onUrlSubmit = async (e) => {
    e.preventDefault();
    setResponseLoaded(false);
    setServerResponse([]);
    if (url.length === 0) {
      setPlaceholder("Product URL/Link Empty");
      return;
    } else {
      const data = { url: url };
      try {
        const response = await axios.post("/url", data);
        setServerResponse(response.data);
        setResponseLoaded(true);

        return;
      } catch (error) {
        console.log(error.message, error.stack);
      }
    }
  };

  // User Price Submit handler
  const onUserPriceSubmit = async (e) => {
    e.preventDefault();
    if (userPrice.length === 0) {
      setUserPlaceholder("Empty Feild");
      return;
    } else {
      if (isNaN(userPrice)) {
        setUserPrice("");
        setUserPlaceholder("Not Number");

        return;
      } else {
        try {
          const data = { data: serverResponse, price: userPrice, url: url };
          const response = await axios.post("userData", data);
          setMsgResponse(response.data);
          setSuccess(response.data["success"]);
          setUpdateIndex(response.data["updateIndex"]);
          setUpdateReq(response.data["updateRequired"]);
          return;
        } catch (error) {
          console.log(error.message, error.stack);
        }
      }
    }
  };
  // Price Update handler
  const priceUpdateHandler = async (e) => {
    e.preventDefault();
    if (userPrice.length === 0) {
      setUserPlaceholder("Empty Feild");
      return;
    } else {
      if (isNaN(userPrice)) {
        setUserPrice("");
        setUserPlaceholder("Not Number");
        return;
      } else {
        try {
          const data = { updatePrice: userPrice, updateIndex: updateIndex };
          const response = await axios.post("/userData/updatePrice", data);
          setMsgResponse(response.data);
          setUpdateReq(false);
          setSuccess(true);
        } catch (error) {
          console.log(error.message, error.stack);
        }
      }
    }
  };

  // End of Main function

  return (
    <div className="home overflow-x-hidden h-auto  scrollbar-hide  flex flex-col justify-center items-center my-8 ">
      <div className="flex flex-col w-screen items-center ">
        <h1 className="text-2xl md:text-3xl lg:text-3xl text-gray-800 font-medium">
          Price Tracker
        </h1>
        <p className="text-md md:text-lg text-gray-600 font-medium">
          For your favorite products
        </p>
      </div>
      {/* Search Bar  */}
      <div className=" w-screen h-auto p-2  ">
        <div className="box-border flex justify-center p-2">
          <input
            className="w-4/5 sm:w-4/6 md:w-6/12 lg:w-5/12 xl:w-4/12   px-2 py-2 text-sm font-normal sm:text-base  outline-none border border-blue-600 rounded-r-none rounded-l-sm text-gray-white"
            type="text"
            placeholder={placeholder}
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
          <button
            className="search-btn bg-blue-500 font-semibold px-4 md:px-4 md:text-base lg:px-6 text-sm text-white rounded-r-sm rounded-l-none outline-none "
            onClick={onUrlSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      {/* Brand Icons */}
      <div className=" w-screen flex justify-center py-1 my-1 ">
        <div className="w-10/12 md:w-8/12 lg:w-7/12 xl:w-5/12 flex justify-center">
          <div className="wrapper h-auto">
            <div className="items flex justify-center items-center">
              <a href="https://www.amazon.in" target="_blank">
                <img className="w-16 h-8" src={Brands["Amazon"]} />
              </a>
            </div>
            <div className="items flex justify-center items-center">
              <a href="https://www.flipkart.com" target="_blank">
                <img className="w-16 h-8" src={Brands["Flipkart"]} />
              </a>
            </div>
            <div className="items flex justify-center items-center">
              <a href="https://paytmmall.com/" target="_blank">
                <img className="w-16 h-8" src={Brands["Paytm"]} />
              </a>
            </div>
            <div className="items flex justify-center items-center">
              <a href="https://www.nykaa.com/" target="_blank">
                <img className="w-16 h-8" src={Brands["Nykaa"]} />
              </a>
            </div>
            <div className="items flex justify-center items-center">
              <a href="https://www.snapdeal.com/" target="_blank">
                <img className="w-16 h-8" src={Brands["Snapdeal"]} />
              </a>
            </div>
            <div className="items flex justify-center items-center">
              <a href="https://www.limeroad.com/" target="_blank">
                <img className="w-16 h-8" src={Brands["Limeroad"]} />
              </a>
            </div>
            <div className="items flex justify-center items-center">
              <a href="https://www.reliancedigital.in/" target="_blank">
                <img className="w-16 h-8" src={Brands["Reliance Digital"]} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Info div */}

      {responseLoaded ? (
        <div className="info w-full flex flex-col items-center ">
          <div className=" w-4/5 sm:w-4/6 md:w-7/12 lg:w-6/12 xl:w-4/12  border rounded-md border-gray-300 animateInDiv">
            <div className="info__header flex justify-between py-2 px-2">
              <div className="text-xs">
                <img className="w-20 h-10 object-contain" src={flipkartBg} />
              </div>
              {/* Close button */}
              <div
                className="text-xs flex justify-center items-center w-10 h-10 cursor-pointer"
                onClick={() => {
                  setResponseLoaded(false);
                  setServerResponse([]);
                  setUrl("");
                  setMsgResponse({});
                  setUserPrice("");
                  setSuccess(false);
                  setUpdateIndex(null);
                  setUpdateReq(false);
                }}
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            {success ? (
              <div className="flex justify-center p-2">
                <p className="text-xs text-gray-900 md:text-sm">
                  {msgResponse["msg"]}
                </p>
              </div>
            ) : (
              <div className="info__content ">
                <p className="text-xs text-center md:text-base  p-2   text-gray-700">
                  {/* Title of Product */}
                  {serverResponse[1]}
                </p>
                <p className="price text-sm md:text-lg text font-semibold flex justify-center text-gray-800">
                  {/* Price of Product */}
                  {(function () {
                    const formatter = new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(serverResponse[2]);
                    return formatter;
                  })()}
                </p>
                <div className="user__input flex justify-center p-2">
                  <input
                    type="text"
                    placeholder={userPlaceholder}
                    className="px-2 py-1 outline-none rounded-l-sm w-2/3 text-xs md:py-2 border lg:text-sm  border-blue-500"
                    onChange={(e) => {
                      setUserPrice(e.target.value);
                    }}
                    value={userPrice}
                  ></input>
                  <button
                    className=" bg-blue-500 px-2 py-1 outline-none rounded-r-sm md:px-3 lg:px-6 lg:text-sm text-xs text-white font-semibold"
                    onClick={updateReq ? priceUpdateHandler : onUserPriceSubmit}
                  >
                    {updateReq ? "Update" : "Submit"}
                  </button>
                </div>
                <div className="flex justify-center p-2">
                  <p className="text-xs text-gray-900 md:text-sm">
                    {msgResponse["msg"]}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  );
};

export default Home;