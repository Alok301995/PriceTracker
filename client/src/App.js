import React, { useState, useEffect, useRef, forwardRef } from "react";
import "./App.css";
import axios from "axios";
import Header from "./component/Header/index";
import Home from "./component/Home/index";
import Footer from "./component/Footer/index";
import Login from "./component/Login/index";
import Profile from "./component/Profile/index";
import Logout from "./component/Logout/index";
import { Switch, Route } from "react-router-dom";

function App() {
  // Main

  const [login, setLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [serverResponse, setServerResponse] = useState({});
  const [homeHeader, setHomeHeader] = useState("Profile");
  const [profileHeader, setProfileHeader] = useState("Home");

  useEffect(async () => {
    // console.log(toggleRef.current);
    async function fetchData() {
      const response = await axios.get("/auth");
      setLogin(response.data["login"]);
      setCurrentUser(response.data["currentUser"]);
      setServerResponse(response.data);
    }
    fetchData();
  }, []);
  // End of Main
  return (
    <div className="App scrollbar-hide box-border min-h-screen flex flex-col h-auto justify-between font-raleway ">
      <Switch>
        <Route exact path="/">
          <Header
            login={login}
            currentUser={currentUser}
            homeHeader={homeHeader}
          ></Header>
          <Home></Home>
          <div className="mt-16"></div>
          <Footer></Footer>
        </Route>
        <Route exact path="/login">
          <Login setLogin={setLogin} setCurrentUser={setCurrentUser}></Login>
        </Route>
        <Route exact path="/profile">
          <Header
            login={login}
            currentUser={currentUser}
            homeHeader={profileHeader}
          ></Header>
          <Profile />
        </Route>
        <Route exact path="/logout">
          <Logout setLogin={setLogin}></Logout>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
