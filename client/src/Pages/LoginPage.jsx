import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";
import logLogo from "../Assets/log-logo.png";

const LoginPage = () => {
  //Form submit (Login)
  const onFinish = (values) => {
    console.log("Received values:", values);
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
            <img src={logLogo} className="w-100 vh-100" alt={logLogo} />
          </div>
          <div className="col-md-6 order-md-1 d-flex align-items-center">
            <div className="container mt-5">
              <Form
                name="login-form"
                onFinish={onFinish}
                layout="vertical"
                className="login-form"
              >
                <h2 className="text-center fw-medium display-5 mb-3 montserrat">
                  Login Form
                </h2>
                <div className="d-flex mx-auto justify-content-center w-75">
                  <img src={logo} className="w-75" alt={logo} />
                </div>

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
                    Login
                  </Button>
                </Form.Item>
              </Form>

              <div className="text-center mt-3 mb-2">
                Don't have an account?{" "}
                <Link to="/register" className="text-success fw-medium">
                  Register Here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
