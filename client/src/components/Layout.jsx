import React, { useState } from "react";
import "./layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import { Badge } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [isIconClicked, setIsIconClicked] = useState(false);

  const handleIcon = () => {
    setCollapsed(!collapsed);
  };
  const handleIcons = () => {
    setIsIconClicked(!isIconClicked);
  };

  //Logout
  const handleLogout = () => {
    localStorage.clear();
    dispatch(setUser(null));
    navigate("/login");
  };

  // Nav menu for user
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
  ];
  //Nav Menu for admin
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-2-line",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/admin/doctors",
      icon: "ri-user-star-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-profile-line",
    },
  ];
  //Nav Menu for Doctor
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-2-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-calendar-schedule-line",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-profile-line",
    },
  ];
  const menuTobeRendered =
    user && user.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;

  return (
    <>
      <div className="main">
        <div className="d-flex layout">
          {/********** SIDEBAR  ***********/}
          <div className={collapsed ? "collapsed-sidebar" : "sidebar"}>
            {collapsed ? (
              <h3 className="fw-bold">AH</h3>
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
              <div
                className={`d-flex montserrat menu-item`}
                onClick={handleLogout}
              >
                <i className="ri-logout-box-line"></i>
                {!collapsed && <Link to={"/logout"}>Logout</Link>}
              </div>
            </div>
          </div>

          {/********** SIDEBAR FOR MOBILE  ***********/}
          <nav className="NavbarItems">
            <div className={isIconClicked ? "nav-menu active" : "nav-menu"}>
              {menuTobeRendered.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    key={menu.name}
                    className={`d-flex montserrat nav-links ${
                      isActive && "active-menu-item"
                    }`}
                  >
                    <i className={menu.icon}></i>
                    {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                  </div>
                );
              })}
              <div
                className={"d-flex montserrat nav-links"}
                onClick={handleLogout}
              >
                <i className="ri-logout-box-line"></i>
                {!collapsed && <Link to={"/logout"}>Logout</Link>}
              </div>
            </div>
          </nav>

          {/********** MAIN  ***********/}
          <div className="content">
            <div className="header">
              {/* Desktop Menu Icon */}
              <div onClick={handleIcon}>
                {!collapsed ? (
                  <i className="ri-close-fill close-icon"></i>
                ) : (
                  <i className="ri-menu-line menu-icon"></i>
                )}
              </div>
              {/* Mobile Menu Icon */}
              <div className="menu-icons d-none" onClick={handleIcons}>
                {isIconClicked ? (
                  <i className="ri-close-fill close-mob-icon" />
                ) : (
                  <i className="ri-menu-line menu-mob-icon" />
                )}
              </div>
              {/* Notification icon & Name */}
              <div className="d-flex align-items-center px-4">
                <Badge
                  count={user?.unSeenNotifications.length}
                  style={{ position: "absolute", top: "0", right: "13px" }}
                  onClick={() => navigate("/notifications")}
                >
                  <i className="ri-notification-2-line notification-icon px-3"></i>
                </Badge>
                <Link className="anchor text-secondary fw-bold" to={"/profile"}>
                  {user?.name}
                </Link>
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
