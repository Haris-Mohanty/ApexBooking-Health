import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { changeAccountStatus, getAllDoctor } from "../../api/api";
import { Table } from "antd";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/spinnerSlice";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  //Fetch all doctors req
  const fetchAllDoctors = async () => {
    try {
      dispatch(showLoading());
      const res = await getAllDoctor();
      dispatch(hideLoading());

      if (res.success) {
        setDoctors(res.data);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  //Change Doctor account status
  const handleAccountStatus = async (record, statuss) => {
    const doctorId = record.userId;
    const status = statuss;
    const data = { doctorId, status };
    try {
      dispatch(showLoading());
      const res = await changeAccountStatus(data);
      dispatch(hideLoading());
      console.log(res);
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllDoctors();
  }, []);

  //Antd Table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Department",
      dataIndex: "department",
    },
    {
      title: "Exp",
      dataIndex: "experience",
    },
    {
      title: "Fees",
      dataIndex: "feePerConsultation",
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Apv.
            </button>
          ) : (
            <button className="btn btn-danger">Rej.</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="table-responsive">
        <h1>All Doctors</h1>
        <Table
          dataSource={doctors}
          columns={columns}
          rowKey={(record) => record._id}
        />
      </div>
    </Layout>
  );
};

export default Doctors;
