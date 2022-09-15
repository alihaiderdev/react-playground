import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import AuthFormsLayout from '../../components/AuthFormsLayout';
import Input from '../../components/Input';

const Login = () => {
  const [login, setLogin] = useState({
    identifier: '',
    password: '',
  });

  const { identifier, password } = login;

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log({ login });
    const { data } = await axios({
      url: '/api/auth/local',
      method: 'POST',
      data: JSON.stringify(login),
    });
    console.log({ data });
  };
  const onValueChangeHandler = ({ target: { name, value } }) => {
    setLogin({ ...login, [name]: value });
  };

  return (
    <AuthFormsLayout title={'Login'} submitHandler={submitHandler}>
      <Input
        type={'text'}
        name={'identifier'}
        value={identifier}
        handler={onValueChangeHandler}
      />
      <Input
        type={'password'}
        name={'password'}
        value={password}
        handler={onValueChangeHandler}
      />
    </AuthFormsLayout>
  );
};

export default Login;
