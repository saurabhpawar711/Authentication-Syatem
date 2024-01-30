import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const saveUser = async () => {
    if (email.trim().length === 0 || password.trim().length === 0) {
      setError("Please fill all fields");
      return;
    } else {
      setError("");
      const userDetails = {
        email,
        password,
      };
      try {
        const response = await axios.post(
          "http://localhost:4000/user/check-user",
          userDetails
        );
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          navigate("/dashboard");
        }
      } catch (err) {
        console.log(err);
        setError(err.response.data.error);
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <h4 style={{ color: "red" }}>{error}</h4>
      <Input
        type={"email"}
        id={"email"}
        placeholder={"Email"}
        getValue={(value) => setEmail(value)}
      />
      <Input
        type={"password"}
        id={"password"}
        placeholder={"Password"}
        getValue={(value) => setPassword(value)}
      />
      <Button value={"Login"} onClick={saveUser} />
    </div>
  );
};

export default Login;
