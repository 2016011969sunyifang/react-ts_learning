import { Button, Card, Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";

export const LoginScreen = () => {
  const { login } = useAuth();
  const handleSubmit = (value: { username: string; password: string }) => {
    login(value);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <LongButton type="primary" htmlType="submit">
        登录
      </LongButton>
    </Form>
  );
};

const LongButton = styled(Button)`
  width: 100%;
`;
