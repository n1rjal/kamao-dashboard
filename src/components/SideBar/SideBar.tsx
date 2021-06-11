import React, { useContext, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaHashtag } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
import NavBarRoutes from "./routes";

import "./sidebar.css";

const SideBar = () => {
  const [toggle, setToggle] = useState(false);
  const contextData = useContext(DataContext);
  return (
    <>
      <button
        className={`sideBar__toggler ${toggle && "open"}`}
        onClick={(e) => {
          setToggle(!toggle);
        }}
      >
        NAVIGATION
      </button>
      <div className={`sidebar__sidebarContainer p-2 ${toggle && "open"}`}>
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="my-3">
            <NavLink to="/">KAMAO</NavLink>
          </h2>
          <span>
            <button
              className="btn btn-danger px-1 py-0"
              onClick={(e) => {
                setToggle(!toggle);
              }}
            >
              X
            </button>
          </span>
        </div>
        <hr />
        {NavBarRoutes.map((NavRoute) => (
          <section className="my-3">
            <h5>
              {" "}
              {NavRoute.icon} {NavRoute.primary_name}
            </h5>
            {NavRoute.routes?.map((InnerNavBarRoute) => (
              <p className="my-1">
                <NavLink
                  to={InnerNavBarRoute.link}
                  className="linkTitle d-flex align-items-center"
                >
                  {InnerNavBarRoute.primary_name}
                </NavLink>
              </p>
            ))}
          </section>
        ))}
      </div>
    </>
  );
};

export default SideBar;
