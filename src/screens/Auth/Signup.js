import { Spin } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthFormsLayout from "../../components/AuthFormsLayout";
import Input from "../../components/Input";
import { error, success } from "../../utilities";

const Signup = () => {
  const navigate = useNavigate();

  const [signup, setSignup] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { username, email, password } = signup;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios(`/api/auth/local/register`, {
        method: "POST",
        data: JSON.stringify(signup),
      });
      success("Successfully Register");
      navigate("/auth/login");
      // setSignup({ username: "", email: "", password: "" });
    } catch ({ message }) {
      console.log(message);
      error("Email or Username are already taken");
    } finally {
      setIsLoading(false);
    }
  };

  const onValueChangeHandler = ({ target: { name, value } }) => {
    setSignup({ ...signup, [name]: value });
  };

  return (
    <AuthFormsLayout title={"Register"}>
      <form onSubmit={submitHandler} autoComplete="off" autoCapitalize="off">
        <Input
          type={"text"}
          name={"username"}
          value={username}
          handler={onValueChangeHandler}
        />
        <Input
          type={"email"}
          name={"email"}
          value={email}
          handler={onValueChangeHandler}
        />
        <Input
          type={"password"}
          name={"password"}
          value={password}
          handler={onValueChangeHandler}
        />
        <div>
          <button
            type="submit"
            className="bg-indigo-600 py-3 px-8 text-white rounded-md ml-auto block"
          >
            {isLoading && <Spin className="mr-2" />}
            Register
          </button>
        </div>
      </form>
    </AuthFormsLayout>
  );
};

export default Signup;
