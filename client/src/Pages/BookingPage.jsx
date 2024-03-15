import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  bookingAppointment,
  bookingAvailability,
  getDoctorById,
} from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import toast from "react-hot-toast";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";

const BookingPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [doctor, setDoctor] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);

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

  // Booking appointments
  const handleBooking = async () => {
    const data = {
      doctorId: params.doctorId,
      userId: user._id,
      doctorInfo: doctor,
      userInfo: user,
      date: date,
      time: time,
    };
    try {
      dispatch(showLoading());
      const res = await bookingAppointment(data);
      dispatch(hideLoading());
      toast.success(res.message);
      navigate("/");
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };

  //
  const handleAvailability = async () => {
    const data = { doctorId: params.doctorId, date, time };
    try {
      dispatch(showLoading());
      const res = await bookingAvailability(data);
      console.log(res);
      dispatch(hideLoading());
      if (res.success) {
        setIsAvailable(true);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
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
          <div className="card w-100 mt-3">
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
                  aria-required={"true"}
                  className="mb-2"
                  format={"DD-MM-YYYY"}
                  onChange={(value) => setDate(value.format("DD-MM-YYYY"))}
                  disabledDate={(current) =>
                    current && current < moment().startOf("day")
                  }
                />

                <TimePicker
                  aria-required={"true"}
                  className="mb-2"
                  format={"HH:mm"}
                  onChange={(time) => setTime(time.format("HH:mm"))}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleAvailability}
                >
                  Check Availability
                </button>

                {isAvailable && (
                  <button
                    className="btn btn-success mt-2"
                    onClick={handleBooking}
                  >
                    Book Now
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
