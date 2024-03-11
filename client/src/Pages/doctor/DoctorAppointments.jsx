import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/spinnerSlice";
import { getDoctorAppointments } from "../../api/api";
import moment from "moment";
import { Table } from "antd";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  //Fetch Doctor Appointments
  const fetchDoctorAppointments = async () => {
    try {
      dispatch(showLoading());
      const res = await getDoctorAppointments();
      setAppointments(res.data);
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDoctorAppointments();
  }, []);

  // Antd table design
  const columns = [
    {
      title: "User Name",
      dataIndex: "name",
      render: (text, record) => <span>{record.userInfo.name}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) => <span>{record.userInfo.email}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success"
                onClick={() => handleStatus(record, "approved")}
              >
                Approved
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="table-responsive">
        <h1 className="m-4 text-center">Appointments List</h1>
        <Table
          columns={columns}
          dataSource={appointments}
          rowKey={(record) => record._id}
          scroll={{ x: "max-content" }}
        />
      </div>
    </Layout>
  );
};

export default DoctorAppointments;
