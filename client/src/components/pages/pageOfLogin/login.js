import React, { useState } from "react";
import { Input, Form, Checkbox, Button } from "antd";
import "./login.css";
import { useParams, Link, useHistory } from "react-router-dom";

const Login = (props) => {
  const layout = {
    labelCol: { span: 90 },
    wrapperCol: { span: -10 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  let history = useHistory();

  const onFinish = (values) => {
    if (values.password === "123456") {
      history.push("/changeServer");
    }
  };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };

  // const onchange = () => {
  //
  // };

  return (
    <div className="border">
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        // onFieldsChange={onchange}
      >
        <Form.Item
          name="password"
          rules={[{ required: true, message: "הכנס סיסמה" }]}
        >
          <Input
            className="enterPassword"
            placeholder="הכנס את הסיסמה 123456"
            type="password"
          />
        </Form.Item>

        <Button className="send" type="primary" htmlType="submit">
          שלח
        </Button>
        <br />
        <br />
        <Link to="/" className="linkShop">
          בחזרה לחנות
        </Link>
      </Form>
    </div>
  );
};

export default Login;
