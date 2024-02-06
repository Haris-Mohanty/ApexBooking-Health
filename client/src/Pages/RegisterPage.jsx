import React from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png";
import regLogo from "../Assets/reg-logo.png";
import { registerUser } from "../api/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Form submit (Register)
  const onFinish = async (values) => {
    const name = values.name;
    const email = values.email;
    const password = values.password;

    const data = { name, email, password };
    try {
      dispatch(showLoading());
      await registerUser(data);
      dispatch(hideLoading());
      toast.success("User Registered Successfully!");
      navigate("/login");
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };

  //Password Validation
  const validatePassword = async (rule, value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    if (!value || regex.test(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject(
        "Password must contain at least 6 characters, including one uppercase letter, one lowercase letter, and one number."
      );
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 order-md-2">
            <img src={regLogo} className="w-100 vh-100" alt="" />
          </div>
          <div className="col-md-6 order-md-1 d-flex align-items-center">
            <div className="container mt-5">
              <Form
                name="register-form"
                onFinish={onFinish}
                layout="vertical"
                className="register-form"
              >
                <h2 className="text-center fw-medium display-5 mb-3 montserrat">
                  Register Form
                </h2>
                <div className="d-flex mx-auto justify-content-center w-75">
                  <img src={logo} className="w-75" alt={logo} />
                </div>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "Please enter a valid email!",
                    },
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    {
                      validator: validatePassword,
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  <Button
                    className="w-100 btn-primary"
                    type="primary"
                    htmlType="submit"
                  >
                    Register
                  </Button>
                </Form.Item>
              </Form>

              <div className="text-center mt-3 mb-2">
                Already registered?{" "}
                <Link to="/login" className="text-success fw-medium">
                  Login Here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
