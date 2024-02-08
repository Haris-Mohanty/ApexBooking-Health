import React from "react";
import "./layout.css";

const Layout = ({ children }) => {
  return (
    <>
      <div className="main">
        <div className="d-flex layout">
          <div className="sidebar"></div>
          <div className="content">
            <div className="header"></div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
