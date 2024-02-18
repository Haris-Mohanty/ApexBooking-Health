import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getAllUser } from "../../api/api";

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

  console.log(users);

  return (
    <Layout>
      <h1>Users List</h1>
    </Layout>
  );
};

export default Users;
