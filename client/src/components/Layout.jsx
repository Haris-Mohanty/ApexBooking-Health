import React, { useState } from "react";
import "./layout.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../Assets/logo.png";

const Layout = ({ children }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const handleIcon = () => {
    setCollapsed(!collapsed);
  };

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
          <div className={collapsed ? "collapsed-sidebar" : "sidebar"}>
            {collapsed ? (
              <h3>AH</h3>
            ) : (
              <img className="app-logo" src={logo} alt={logo} />
            )}

            <div className="menu">
              {menuTobeRendered.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    key={menu.name}
                    className={`d-flex montserrat menu-item ${
                      isActive &&
                      (collapsed
                        ? "activa-menu-item-collapse"
                        : "active-menu-item")
                    }`}
                  >
                    <i className={menu.icon}></i>
                    {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                  </div>
                );
              })}
            </div>
          </div>
          {/********** MAIN  ***********/}
          <div className="content">
            <div className="header">
              <div onClick={handleIcon}>
                {!collapsed ? (
                  <i className="ri-close-fill close-icon"></i>
                ) : (
                  <i className="ri-menu-line menu-icon"></i>
                )}
              </div>
              <div className="d-flex mx-4">
                <i className="ri-notification-2-line notification-icon"></i>
                <p>name</p>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
