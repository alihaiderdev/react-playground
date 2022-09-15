import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserList from '../components/UserList';
import { fetchUsers } from '../store/Slices/userSlice';

const UsersScreen = () => {
  const { isLoading, error, users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      <h1 className='text-3xl font-black text-center my-5 text-indigo-600'>
        Github Users List
      </h1>
      <main className='container mx-auto px-4 sm:px-8 md:px-12'>
        {isLoading && <h1 className='text-indigo-600 text-2xl'>Loading...</h1>}
        {!isLoading && error && (
          <h1 className='text-indigo-600 text-2xl'>{error}</h1>
        )}
        <UserList users={users} isLoading={isLoading} />
      </main>
      ;
    </>
  );
};

export default UsersScreen;
