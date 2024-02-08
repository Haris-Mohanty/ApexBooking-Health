import React, { useEffect } from "react";
import { getUserInfo } from "../api/api";
import Layout from "../components/Layout";

const Homepage = () => {
  //Fetch user info
  const fetchUserInfo = async () => {
    try {
      const res = await getUserInfo();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);
  return (
    <>
      <Layout>
        <h1>Homepage</h1>
      </Layout>
    </>
  );
};

export default Homepage;
