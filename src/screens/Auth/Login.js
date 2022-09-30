import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthFormsLayout from '../../components/AuthFormsLayout';
import Input from '../../components/Input';
import { useAuthAndCartContext } from '../../context';
import { error } from '../../utilities';

const Login = () => {
  const { login: signIn, user } = useAuthAndCartContext();

  const navigate = useNavigate();

  const [login, setLogin] = useState({
    identifier: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(user || {}).length > 0) {
      navigate('/products');
    }
  }, [Object.keys(user || {}).length]);

  const { identifier, password } = login;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const { data } = await axios(`/api/auth/local`, {
        method: 'POST',
        data: JSON.stringify(login),
      });
      const res = await axios(
        `/api/users/${data?.user?.id}?populate=shippingAddress, billingAddress`
      );
      const userWithAddress = {
        jwt: data.jwt,
        user: {
          ...data.user,
          billingAddress: res.data?.billingAddress,
          shippingAddress: res.data?.shippingAddress,
        },
      };
      signIn(userWithAddress);

      // here its your choice to redirect user to whatever page you want as a successful login or simply set input fields and show a success message
      navigate('/products');

      // OR
      // success("Successfully Login");
      // setLogin({ identifier: "", password: "" });
    } catch ({ message }) {
      console.log(message);
      error('Invalid identifier or password');
    } finally {
      setIsLoading(false);
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
