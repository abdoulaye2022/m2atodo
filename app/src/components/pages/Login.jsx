import React from "react";
import { Button, Typography, Form, Input, Flex } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login = () => {
  const navigation = useNavigate();

  const onFinish = (values) => {
    axios
      .post("/users/login", {email: values.email, password: values.password})
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        return navigation("/home");
      })
      .catch(err => {
        console.error('Error:', err.message);
      });
  };
  return (
    <Flex
      gap="center"
      align="center"
      justify="center"
      vertical
      style={{ height: "90vh" }}
    >
      <Title level={3} style={{ marginBottom: "20px" }}>
        Welcome to M2aTodo
      </Title>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "E-mail is not a valid email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="E-mail"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Login;
