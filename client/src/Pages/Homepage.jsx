import React, { useEffect, useState } from "react";
import { getAllApprovedDoctors } from "../api/api";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";

const Homepage = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

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
  }, []);
  return (
    <>
      <Layout>
        <h1 className="text-center mb-3">Doctors List</h1>
        <Row>
          {doctors && doctors.map((doctor) => <DoctorList key={doctor._id} doctor={doctor} />)}
        </Row>
      </Layout>
    </>
  );
};

export default Homepage;
