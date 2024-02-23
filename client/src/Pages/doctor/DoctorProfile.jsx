import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";

const DoctorProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);

  
  return (
    <>
      <Layout>
        <h1>Profile</h1>
      </Layout>
    </>
  );
};

export default DoctorProfile;
