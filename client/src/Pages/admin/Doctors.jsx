import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getAllDoctor } from "../../api/api";
import { Table } from "antd";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  //Fetch all doctors req
  const fetchAllDoctors = async () => {
    try {
      const res = await getAllDoctor();
      if (res.success) {
        setDoctors(res.data);
      }
    } catch (err) {
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
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button className="btn btn-success">Apv.</button>
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
