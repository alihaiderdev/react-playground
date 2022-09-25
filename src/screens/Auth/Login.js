import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthFormsLayout from "../../components/AuthFormsLayout";
import Input from "../../components/Input";
import { fetchUser } from "../../store/Slices/authSlice";

const Login = () => {
  const [user, _] = useState(JSON.parse(localStorage.getItem("user")));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    identifier: "",
    password: "",
  });

  useEffect(() => {
    if (Object.keys(user || {}).length > 0) {
      return navigate("/products");
    }
  }, [user]);

  const { identifier, password } = login;

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(fetchUser({ userInfo: login, url: `/api/auth/local` }));
  };

  const onValueChangeHandler = ({ target: { name, value } }) => {
    setLogin({ ...login, [name]: value });
  };

  return (
    <AuthFormsLayout title={"Login"} submitHandler={submitHandler}>
      <form onSubmit={submitHandler} autoComplete="off" autoCapitalize="off">
        <Input
          type={"text"}
          name={"identifier"}
          value={identifier}
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
            Login
          </button>
        </div>
      </form>
    </AuthFormsLayout>
  );
};

export default Login;
