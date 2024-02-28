import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
 
  return (
    <>
    <div className="col-md-3 m-4">
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title text-primary mb-4">
            Dr. {doctor.firstName} {doctor.lastName}
          </h5>
          <ul className="list-group list-group-flush mb-4">
            <li className="list-group-item">
              <span className="fw-bold">Specialization:</span> {doctor.specialization}
            </li>
            <li className="list-group-item">
              <span className="fw-bold">Experience:</span> {doctor.experience}
            </li>
            <li className="list-group-item">
              <span className="fw-bold">Timings:</span> {doctor.timings[0]} - {doctor.timings[1]}
            </li>
            <li className="list-group-item">
              <span className="fw-bold">Fee Per Consultation:</span> {doctor.feePerConsultation}
            </li>
          </ul>
          <button
            onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
            className="btn btn-primary w-100"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>

    </>
  );
};

export default DoctorList;
