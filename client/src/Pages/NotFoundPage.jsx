import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-2 text-danger fw-medium">
          404 - Page Not Found
        </h1>
        <p className="lead">
          Oops! The page you are looking for does not exist. Please check the
          URL and try again.
        </p>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
