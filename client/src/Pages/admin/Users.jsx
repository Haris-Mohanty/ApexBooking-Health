import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getAllUser } from "../../api/api";
import { Table } from "antd";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/spinnerSlice";

const Users = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  //Fetch All Users
  const fetchAllUsers = async () => {
    try {
      dispatch(showLoading());
      const res = await getAllUser();
      dispatch(hideLoading());

      if (res.success) {
        setUsers(res.data);
      }
    } catch (err) {
      dispatch(hideLoading());
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
      title: "Created",
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
          scroll={{ x: "max-content" }}
        />
      </div>
    </Layout>
  );
};

export default Users;
