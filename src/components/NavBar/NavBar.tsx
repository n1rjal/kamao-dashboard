import React, { useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { DataContext as GlobalDataContext } from "../../contexts/DataContext";

import "./navbar.css";

const NavBar = () => {
  const [notificationOpen, setnotificationOpen] = useState<Boolean>(false);
  const dataContextData = useContext(GlobalDataContext);
  return (
    <>
      <nav className="d-flex justify-content-between px-3 px-lg-5 px-md-3 align-items-center">
        <div>
          <Link className="navIcon" to="/">
            DASHBOARD
          </Link>
        </div>
        <div
          className="rightSide user-select-none"
          style={{ cursor: "pointer" }}
          onClick={(e) => setnotificationOpen(!notificationOpen)}
        >
          <h4 className="navbar__NavBar__UserName mx-3 ">
            {dataContextData.userProfile?.name || "No User"}
          </h4>
        </div>
      </nav>
      {notificationOpen && (
        <div className="notificationContainer">
          <h6 className="display-6 border-bottom p-2 text-white">
            Notifications
          </h6>
          <div className="notificationItem my-2">
            <div>Dipesh khanal reported Test User's post</div>
            <small className="text-muted">{new Date().toDateString()}</small>
          </div>
          <div className="notificationItem my-2">
            <div>New competition will go live tommorow</div>
            <small className="text-muted">{new Date().toDateString()}</small>
          </div>
          <div className="notificationItem my-2">
            <div>A comment is reported</div>
            <small className="text-muted">{new Date().toDateString()}</small>
          </div>
          <hr></hr>
          <button
            className="btn btn-danger p-1"
            onClick={(e) => {
              dataContextData.setter?.setUserToken(false);
              dataContextData.setter?.setIsLoggedIn(false);
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </>
  );
};

export default NavBar;
