import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthFormsLayout from '../../components/AuthFormsLayout';
import Input from '../../components/Input';
import { error, success } from '../../utilities';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [signup, setSignup] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = signup;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios(`/api/auth/local/register`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        data: JSON.stringify(signup),
      });
      success('Successfully Register');
      navigate('/auth/login');
      // setSignup({ username: "", email: "", password: "" });
    } catch ({ message }) {
      console.log(message);
      error('Email or Username are already taken');
    }
  };

  const onValueChangeHandler = ({ target: { name, value } }) => {
    setSignup({ ...signup, [name]: value });
  };

  return (
    <AuthFormsLayout title={'Register'}>
      <form onSubmit={submitHandler} autoComplete='off' autoCapitalize='off'>
        <Input
          type={'text'}
          name={'username'}
          value={username}
          handler={onValueChangeHandler}
        />
        <Input
          type={'email'}
          name={'email'}
          value={email}
          handler={onValueChangeHandler}
        />
        <Input
          type={'password'}
          name={'password'}
          value={password}
          handler={onValueChangeHandler}
        />
        <div>
          <button
            type='submit'
            className='bg-indigo-600 py-3 px-8 text-white rounded-md ml-auto block'
          >
            Register
          </button>
        </div>
      </form>
    </AuthFormsLayout>
  );
};

export default Signup;
