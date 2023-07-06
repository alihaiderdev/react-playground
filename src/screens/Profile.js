import { Spin } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import Input from '../components/Input';
import { useAuthAndCartContext } from '../context';
import { error, success } from '../utilities';

const Profile = () => {
  const { user, login } = useAuthAndCartContext();
  const [isLoading, setIsLoading] = useState(false);

  let [userDetails, setUserDetails] = useState(() => {
    const { firstName, lastName, billingAddress, email, username } = user?.user;

    return {
      firstName,
      lastName,
      email,
      username,
      country: billingAddress ? billingAddress.country : '',
      city: billingAddress ? billingAddress.city : '',
      zipCode: billingAddress ? billingAddress.zipCode : '',
      address: billingAddress ? billingAddress.address : '',
      state: billingAddress ? billingAddress.state : '',
      mobileNumber: billingAddress ? billingAddress.mobileNumber : '',
    };
  });
  const {
    firstName,
    lastName,
    email,
    username,
    country,
    city,
    zipCode,
    address,
    state,
    mobileNumber,
  } = userDetails;
  const [profile, setProfile] = useState(null);

  const onValueChangeHandler = ({ target: { name, value } }) => {
    setUserDetails({ ...userDetails, [name]: value });
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('files.profile', profile);
    userDetails = {
      firstName,
      lastName,
      email,
      username,
      billingAddress: { country, city, zipCode, address, state, mobileNumber },
    };
    formData.append('data', JSON.stringify(userDetails));

    try {
      setIsLoading(true);
      const { data } = await axios(`/api/users/${user?.user?.id}`, {
        method: 'PUT',
        data: JSON.stringify(userDetails),
        // data: formData,
      });

      if (Object.keys(data).length > 0) {
        const { data: userData } = await axios(
          `/api/users/${data?.id}?populate=firstName,lastName,billingAddress,profile`
        );

        login({
          ...user,
          user: userData,
        });
      }

      success('Profile Updated Successfully!');
    } catch ({ message }) {
      console.log(message);
      error('Facing error while updating profile!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={updateProfileHandler} className='grid grid-cols-12 gap-6'>
      <div className='col-span-12 md:col-span-6 lg:col-span-4'>
        <Input
          type={'email'}
          name={'email'}
          value={email}
          handler={onValueChangeHandler}
        />
      </div>
      <div className='col-span-12 md:col-span-6 lg:col-span-4'>
        <Input
          type={'text'}
          name={'username'}
          value={username}
          handler={onValueChangeHandler}
        />
      </div>
      <div className='col-span-12 md:col-span-6 lg:col-span-4'>
        <Input
          type={'text'}
          name={'firstName'}
          value={firstName}
          handler={onValueChangeHandler}
        />
      </div>
      <div className='col-span-12 md:col-span-6 lg:col-span-4'>
        <Input
          type={'text'}
          name={'lastName'}
          value={lastName}
          handler={onValueChangeHandler}
        />
      </div>
      <div className='col-span-12 md:col-span-6 lg:col-span-4'>
        <Input
          type={'text'}
          name={'country'}
          value={country}
          handler={onValueChangeHandler}
        />
      </div>
      <div className='col-span-12 md:col-span-6 lg:col-span-4'>
        <Input
          type={'text'}
          name={'city'}
          value={city}
          handler={onValueChangeHandler}
        />
      </div>
      <div className='col-span-12 md:col-span-6 lg:col-span-4'>
        <Input
          type={'number'}
          name={'zipCode'}
          value={zipCode}
          handler={onValueChangeHandler}
        />
      </div>
      <div className='col-span-12 md:col-span-6 lg:col-span-4'>
        <Input
          type={'tel'}
          name={'mobileNumber'}
          value={mobileNumber}
          handler={onValueChangeHandler}
        />
      </div>
      <div className='col-span-12 md:col-span-6 lg:col-span-4'>
        <Input
          type={'text'}
          name={'state'}
          value={state}
          handler={onValueChangeHandler}
        />
      </div>

      <div className='col-span-12 md:col-span-6 lg:col-span-4'>
        <label
          className='m-0 text-lg capitalize font-black text-indigo-600 text-left block'
          htmlFor={'address'}
        >
          Address:{' '}
        </label>
        <textarea
          id='address'
          rows={10}
          value={address}
          name='address'
          onChange={onValueChangeHandler}
          placeholder='Enter your address'
          className='w-full rounded-md px-2 py-3 outline-none resize-none border-solid border-2 border-indigo-600'
        />
      </div>
      {/* <div className="col-span-12 md:col-span-6 lg:col-span-4">
        <label
          className="m-0 text-lg capitalize font-black text-indigo-600 text-left block"
          htmlFor={"profile"}
        >
          Profile:{" "}
        </label>
        <input
          type="file"
          name="profile"
          id="profile"
          onChange={(e) => setProfile(e.target.files[0])}
        />
      </div> */}

      <div className='col-span-12'>
        <button
          type='submit'
          className='bg-indigo-600 py-3 px-8 text-white rounded-md ml-auto block'
        >
          {isLoading && <Spin size='small' />} Update
        </button>
      </div>
    </form>
  );
};

export default Profile;
