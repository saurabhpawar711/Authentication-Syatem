import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./SignUp.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const saveUser = async () => {
    if (
      firstName.trim().length === 0 ||
      lastName.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      number.trim().length === 0 ||
      username.trim().length === 0
    ) {
      setError("Please fill all fields");
      return;
    } else {
      setError("");
      const userDetails = {
        firstName,
        lastName,
        email,
        password,
        number,
        username,
      };
      try {
        await axios.post(
          "http://localhost:4000/user/add-user",
          userDetails
        );
        navigate("/login");

      } catch (err) {
        console.log(err);
        setError(err.response.data.error);
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>SignUp</h2>
      <h4 style={{ color: "red" }}>{error}</h4>
      <Input
        type={"text"}
        id={"firstName"}
        placeholder={"First Name"}
        getValue={(value) => setFirstName(value)}
      />
      <Input
        type={"text"}
        id={"lastName"}
        placeholder={"Last Name"}
        getValue={(value) => setLastName(value)}
      />
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
      <Input
        type={"tel"}
        id={"phoneNumber"}
        placeholder={"Phone Number"}
        getValue={(value) => setNumber(value)}
      />
      <Input
        type={"text"}
        id={"username"}
        placeholder={"Username"}
        getValue={(value) => setUsername(value)}
      />
      <Button value={"Sign Up"} onClick={saveUser} />
    </div>
  );
};

export default SignUp;
