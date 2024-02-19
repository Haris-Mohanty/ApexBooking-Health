import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getAllUser } from "../../api/api";
import { Table } from "antd";

const Users = () => {
  const [users, setUsers] = useState([]);

  //Fetch All Users
  const fetchAllUsers = async () => {
    try {
      const res = await getAllUser();
      if (res.success) {
        setUsers(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // antd table column
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
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
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="table-responsive">
        <h1 className="mb-4 text-center mt-2">Users List</h1>
        <Table
          dataSource={users}
          columns={columns}
          rowKey={(record) => record._id}
        />
      </div>
    </Layout>
  );
};

export default Users;
