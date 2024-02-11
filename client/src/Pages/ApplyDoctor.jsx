import { Button, Form, Input } from "antd";
import React from "react";
import Layout from "../components/Layout";

const ApplyDoctor = () => {
  return (
    <>
      <Layout>
        <h1 className="mt-2 mb-3">Apply Doctor</h1>
        <Form
          name="doctor-form"
          layout="vertical"
          initialValues={{ remember: true }}
          //   onFinish={onFinish}
        //   style={{ maxWidth: "400px", margin: "auto" }}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please enter your first name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please enter your last name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please input a valid email address!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please enter your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Apply Doctor
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    </>
  );
};

export default ApplyDoctor;
