import React from "react";
import "./layout.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../Assets/logo.png";

const Layout = ({ children }) => {
  const location = useLocation();

  // Sidenav menu
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-2-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-calendar-schedule-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-profile-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];
  const menuTobeRendered = userMenu;

  return (
    <>
      <div className="main">
        <div className="d-flex layout">
          {/********** SIDEBAR  ***********/}
          <div className="sidebar">
            <img className="app-logo" src={logo} alt={logo} />
            <div className="menu">
              {menuTobeRendered.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    key={menu.name}
                    className={`d-flex menu-item ${
                      isActive && "active-menu-item"
                    }`}
                  >
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
            </div>
          </div>
          {/********** MAIN  ***********/}
          <div className="content">
            <div className="header">
              <i class="ri-menu-line"></i>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
