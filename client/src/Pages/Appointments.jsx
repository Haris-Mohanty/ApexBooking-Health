import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getUserAppointments } from "../api/api";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import moment from "moment";
import { Table } from "antd";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  // Fetch User Appointments
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

  //Create antd table
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   render: (text, record) => (
    //     <span>
    //       {record.doctorid.firstName} {record.doctorId.lastName}
    //     </span>
    //   ),
    // },
    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    //   render: (text, record) => <span>{record.doctorId.phone}</span>,
    // },
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
  ];

  return (
    <Layout>
      <div className="table-responsive">
        <h1 className="m-4 text-center">Appointments List</h1>
        <Table
          className="mt-3"
          columns={columns}
          dataSource={appointments}
          rowKey={(record) => record._id}
        />
      </div>
    </Layout>
  );
};

export default Appointments;
