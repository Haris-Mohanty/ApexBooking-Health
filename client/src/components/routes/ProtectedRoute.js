import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {

  


  useEffect(() => {

  }, []);

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoute;
