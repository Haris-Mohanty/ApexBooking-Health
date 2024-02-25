import React, { useEffect, useState } from "react";
import { getAllApprovedDoctors, getUserInfo } from "../api/api";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";

const Homepage = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  //Fetch user info
  const fetchUserInfo = async () => {
    try {
      await getUserInfo();
    } catch (err) {
      console.log(err);
    }
  };

  //Get all approved doctors
  const fetchAllApprovedDoctors = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllApprovedDoctors();
      setDoctors(response.data);
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllApprovedDoctors();
    fetchUserInfo();
  }, []);
  return (
    <>
      <Layout>
        <h1 className="text-center mb-3">Homepage</h1>
      </Layout>
    </>
  );
};

export default Homepage;
