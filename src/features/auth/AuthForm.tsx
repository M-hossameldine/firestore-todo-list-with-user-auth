import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { signUp, login } from "libs/firebase";
import { type UserCredential } from "firebase/auth";

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      let userCredential: UserCredential;
      if (isSignup) {
        userCredential = await signUp(values);
        message.success("Account created successfully!");
      } else {
        userCredential = await login(values);
        message.success("Logged in successfully!");
        setIsSignup(false);
      }

      // * you can save userCredentials to be used later for authenticated requests

      navigate("/todos");
    } catch (error: any) {
      const errorMessage = isSignup
        ? "Email Already in Use!"
        : "Invalid Email or Password!";
      message.error(errorMessage);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, type: "email", message: "Enter a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Enter your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} block>
          {isSignup ? "Sign Up" : "Login"}
        </Button>

        <Button type="link" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Already have an account? Login" : "New user? Sign up"}
        </Button>
      </Form>
    </div>
  );
};

export default AuthForm;
