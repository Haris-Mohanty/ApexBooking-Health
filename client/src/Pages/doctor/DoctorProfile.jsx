import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/spinnerSlice";
import { getDoctorInfo, updateDoctorProfile } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, Input, InputNumber, Row, TimePicker } from "antd";
import moment from "moment";
import toast from "react-hot-toast";

const DoctorProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  //Fetch Doctor information
  const fetchDoctorInfo = async () => {
    const userId = params.id;
    try {
      dispatch(showLoading());
      const response = await getDoctorInfo(userId);
      setDoctor(response.data);
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  // Update doctor profile
  const onFinish = async (values) => {
    const data = {
      ...values,
      userId: user._id,
      timings: [
        moment(values.timings[0]).format("HH:mm"),
        moment(values.timings[1]).format("HH:mm"),
      ],
    };
    try {
      dispatch(showLoading());
      const response = await updateDoctorProfile(data);
      dispatch(hideLoading());
      navigate("/");
      toast.success(response.message);
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchDoctorInfo();
  }, []);

  return (
    <>
      <Layout>
        <h1 className="text-center mb-3">Manage Profile</h1>
        {doctor && (
          <Form
            name="doctor-form"
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              ...doctor,
              timings: [
                moment(doctor.timings[0], "HH:mm"),
                moment(doctor.timings[1], "HH:mm"),
              ],
            }}
          >
            <h3 className="mb-2 text-secondary">Personal Information:</h3>
            <Row gutter={10}>
              <Col span={8} xs={24} sm={24} lg={8}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your first name!",
                    },
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
                  Update Profile
                </Button>
              </Form.Item>
            </div>
          </Form>
        )}
      </Layout>
    </>
  );
};

export default DoctorProfile;
