import { Button, Col, Form, Input, InputNumber, Row, TimePicker } from "antd";
import React from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { applyDoctorAccount } from "../api/api";
import moment from "moment";

const ApplyDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  //Form Submit
  const onFinish = async (values) => {
    const userId = user._id;
    const data = { ...values, userId };
    data.timings = values.timings.map((time) => time.format("HH:mm"));
    try {
      dispatch(showLoading());
      await applyDoctorAccount(data);
      dispatch(hideLoading());
      toast.success("Doctor account applied successfully!");
      navigate("/");
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <Layout>
        <h1 className="mb-1 montserrat d-flex justify-content-center">
          Apply For Doctor
        </h1>
        <hr />
        <Form name="doctor-form" layout="vertical" onFinish={onFinish}>
          <h3 className="mb-2 text-secondary">Personal Information:</h3>
          <Row gutter={10}>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "Please enter your first name!" },
                  {
                    min: 2,
                    message: "First name must be at least 2 characters long!",
                  },
                  {
                    max: 15,
                    message: "First name cannot exceed 15 characters!",
                  },
                ]}
              >
                <Input placeholder="Enter First Name" />
              </Form.Item>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  { required: true, message: "Please enter your last name!" },
                  {
                    min: 2,
                    message: "Last name must be at least 2 characters long!",
                  },
                  {
                    max: 15,
                    message: "Last name cannot exceed 15 characters!",
                  },
                ]}
              >
                <Input placeholder="Enter Last Name" />
              </Form.Item>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number!",
                  },
                  {
                    pattern: /^\d{10}$/,
                    message: "Please enter a valid 10-digit phone number!",
                  },
                ]}
              >
                <Input type="number" placeholder="Enter Phone Number" />
              </Form.Item>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Website"
                name="website"
                rules={[
                  {
                    required: true,
                    message: "Please enter your website!",
                  },
                ]}
              >
                <Input type="url" placeholder="Enter Website url" />
              </Form.Item>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please enter your address!",
                  },
                  {
                    max: 100,
                    message: "Address cannot exceed 100 characters!",
                  },
                ]}
              >
                <Input.TextArea placeholder="Enter Addres" rows={1} />
              </Form.Item>
            </Col>
          </Row>
          <hr />

          <h3 className="mb-1 text-secondary">Professional Information:</h3>
          <Row gutter={10}>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Department"
                name="department"
                rules={[
                  {
                    required: true,
                    message: "Please enter your department!",
                  },
                ]}
              >
                <Input placeholder="Enter Department" />
              </Form.Item>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                rules={[
                  {
                    required: true,
                    message: "Please enter your specialization!",
                  },
                ]}
              >
                <Input placeholder="Enter your specialization" />
              </Form.Item>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Experience (Years)"
                name="experience"
                rules={[
                  {
                    required: true,
                    message: "Please enter your experience in years!",
                  },
                  {
                    type: "number",
                    min: 0,
                    max: 50,
                    message: "Experience cannot exceed 50 years!",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Enter experience"
                />
              </Form.Item>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Fee Per Consultation (INR)"
                name="feePerConsultation"
                rules={[
                  {
                    required: true,
                    message: "Please enter your experience in years!",
                  },
                  {
                    type: "number",
                    min: 0,
                    max: 100000,
                    message: "Fees cannot exceed 1,00,000 rupees!",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  prefix="₹"
                  placeholder="Enter fee per consultation"
                />
              </Form.Item>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Timings"
                name="timings"
                rules={[
                  {
                    required: true,
                    message: "Please enter the timings!",
                  },
                ]}
              >
                <TimePicker.RangePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Apply Doctor
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Layout>
    </>
  );
};

export default ApplyDoctor;
