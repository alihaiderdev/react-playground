import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthFormsLayout from '../../components/AuthFormsLayout';
import Input from '../../components/Input';
import { useShoppingCart } from '../../context/CartContext';
import {
  fetchLoggedInUserDetails,
  login as signin,
} from '../../store/Slices/authSlice';
import { error, success } from '../../utilities';

const Login = () => {
  const { login: signIn, user: _user } = useShoppingCart();
  const [user] = useState(JSON.parse(localStorage.getItem('user')));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    identifier: '',
    password: '',
  });

  // useEffect(() => {
  //   if (Object.keys(user || {}).length > 0) {
  //     dispatch(fetchLoggedInUserDetails());
  //     navigate('/products');
  //   }
  // }, [Object.keys(user || {}).length]);
  useEffect(() => {
    console.log({ _user });
  }, [Object.keys(_user || {}).length]);

  const { identifier, password } = login;

  const submitHandler = async (e) => {
    e.preventDefault();
    // const loggedInUser = await dispatch(
    //   signin({ userInfo: login, url: `/api/auth/local` })
    // );

    try {
      const { data } = await axios(`/api/auth/local`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        data: JSON.stringify(login),
      });
      success('Successfully Login');
      navigate('/auth/login');
      signIn(data);
      // setSignup({ username: "", email: "", password: "" });
    } catch ({ message }) {
      console.log(message);
      error('Invalid identifier or password');
    }
  };

  const onValueChangeHandler = ({ target: { name, value } }) => {
    setLogin({ ...login, [name]: value });
  };

  return (
    <AuthFormsLayout title={'Login'} submitHandler={submitHandler}>
      <form onSubmit={submitHandler} autoComplete='off' autoCapitalize='off'>
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
        <div>
          <button
            type='submit'
            className='bg-indigo-600 py-3 px-8 text-white rounded-md ml-auto block'
          >
            Login
          </button>
        </div>
      </form>
    </AuthFormsLayout>
  );
};

export default Login;
