import React, { useEffect } from "react";
import { getUserInfo } from "../api/api";

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
      <h1>Homepage</h1>
    </>
  );
};

export default Homepage;
