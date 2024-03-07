import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getUserAppointments } from "../api/api";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  const fetchUserAppointments = async () => {
    try {
      dispatch(showLoading());
      const res = await getUserAppointments();
      setAppointments(res.data);
      dispatch(hideLoading());
    } catch (err) {
      console.log(err);
      dispatch(hideLoading());
    }
  };
  console.log(appointments);

  useEffect(() => {
    fetchUserAppointments();
  }, []);

  return (
    <Layout>
      <h1>Appointments List</h1>
      {/* <div>{appointments.time}</div> */}
    </Layout>
  );
};

export default Appointments;
