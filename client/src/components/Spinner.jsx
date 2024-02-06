import React from "react";
import { useSelector } from "react-redux";

const Spinner = () => {
  const { loading } = useSelector((state) => state.spinner);
  return (
    <>
      {loading && (
        <div className="loader-container">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}
    </>
  );
};

export default Spinner;
