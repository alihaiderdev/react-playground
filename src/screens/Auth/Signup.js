import axios from "axios";
import React, { useState } from "react";
import AuthFormsLayout from "../../components/AuthFormsLayout";
import Input from "../../components/Input";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [signup, setSignup] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = signup;

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log({ signup });
    try {
      const { data } = await axios({
        url: "/api/auth/local/register",
        method: "POST",
        data: JSON.stringify(signup),
      });
      setUser(data);
      if (Object.keys(data).length > 0) {
        localStorage.setItem("jwt", data.jwt);
      }
      console.log({ data });
    } catch (error) {
      console.log({ error });
    }
  };
  console.log(user);

  const onValueChangeHandler = ({ target: { name, value } }) => {
    setSignup({ ...signup, [name]: value });
  };

  return (
    <AuthFormsLayout title={"Register"} submitHandler={submitHandler}>
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
    </AuthFormsLayout>
  );
};

export default Signup;
