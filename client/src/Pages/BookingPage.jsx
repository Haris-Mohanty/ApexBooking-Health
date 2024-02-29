import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getDoctorById } from "../api/api";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import toast from "react-hot-toast";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";

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
      <div className="container mt-4">
        <h1 className="text-center mb-5">Booking Page</h1>
        {doctor && (
          <div className="card w-50 mt-3">
            <div className="card-body">
              <h3 className="card-title text-center">
                Dr. {doctor.firstName} {doctor.lastName}
              </h3>
              <p className="card-text">
                <b>Fees:</b> <i>₹ {doctor.feePerConsultation}</i>
              </p>
              <p className="card-text">
                <b>Experience:</b> <i>{doctor.experience} Years</i>
              </p>
              <p className="card-text">
                <b>Timings:</b>{" "}
                <i>
                  {doctor.timings?.[0]} - {doctor.timings?.[1]}
                </i>
              </p>
              <p className="card-text">
                <b>Specialization:</b> <i>{doctor.specialization}</i>
              </p>
              <div className="d-flex flex-column">
                <DatePicker
                  className="mb-2"
                  format={"DD-MM-YYYY"}
                  onChange={(value) =>
                    setDate(moment(value).format("DD-MM-YYYY"))
                  }
                />
                <TimePicker.RangePicker
                  className="mb-2"
                  format={"HH:MM"}
                  onChange={(values) =>
                    setTimings([
                      moment(values[0]).format("HH-MM"),
                      moment(values[1].format("HH-MM")),
                    ])
                  }
                />
                <button className="btn btn-primary">Check Availability</button>
                <button className="btn btn-success mt-2">Book Now</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
