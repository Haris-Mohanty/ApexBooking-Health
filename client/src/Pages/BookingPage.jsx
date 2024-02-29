import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getDoctorById } from "../api/api";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import toast from "react-hot-toast";
import { DatePicker, TimePicker } from "antd";

const BookingPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [doctor, setDoctor] = useState([]);
  const [date, setDate] = useState();
  const [timings, setTimings] = useState();
  const [isAvailable, setIsAvailable] = useState();

  //Fetching doctor
  const fetchDoctorById = async () => {
    try {
      dispatch(showLoading());
      const response = await getDoctorById({ doctorId: params.doctorId });
      dispatch(hideLoading());
      setDoctor(response.data);
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchDoctorById();
  }, []);

  return (
    <Layout>
      <h1 className="text-center mb-3">Booking Page</h1>
      <div className="container m-2">
        {doctor && (
          <div>
            <h3>
              Dr. {doctor.firstName} {doctor.lastName}
            </h3>
            <p>
              <b>Fees:</b> <i>{doctor.feePerConsultation}</i>
            </p>
            <p>
              <b>Timings:</b>{" "}
              <i>
                {doctor.timings[0]} - {doctor.timings[1]}
              </i>
            </p>
            <div className="d-flex flex-column">
              <DatePicker format={"DD-MM-YYYY"} />
              <TimePicker.RangePicker format={"HH:MM"} />
              <button className="btn btn-primary mt-2">
                Check Availability
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
