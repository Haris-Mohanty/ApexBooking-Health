import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/spinnerSlice";
import { getDoctorInfo } from "../../api/api";
import { useParams } from "react-router-dom";

const DoctorProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);

  const dispatch = useDispatch();
  const params = useParams();

  //Fetch Doctor info
  const fetchDoctorInfo = async () => {
    const userId = params.id;
    try {
      dispatch(showLoading());
      const response = await getDoctorInfo(userId);
      console.log(response);
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDoctorInfo();
  }, []);

  return (
    <>
      <Layout>
        <h1>Profile</h1>
      </Layout>
    </>
  );
};

export default DoctorProfile;
