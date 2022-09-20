import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../components/Search';
import UserList from '../components/UserList';
import { fetchUsers } from '../store/Slices/userSlice';

const UsersScreen = () => {
  const { isLoading, error, users, total } = useSelector((state) => state.user);
  // console.log({ isLoading, error, users, total });
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (categories?.length > 0) {
  //     categories?.forEach(async (category) => {
  //       const res = await fetch(
  //         `${Api_constant['domain']}${Api_constant['sub_domain']['get_category']}/${category.id}`,
  //         {
  //           method: 'PUT',
  //           headers: {
  //             Authorization:
  //               'Bearer 0aad178b2a110c9a23a2d7b41f88a30146e3c6542170664edd442992eaec12dfb8ca7c1e89ff0977a4f236831aea193fb90f0096c0333693fd735045690048591b05abb6939fe08b492418cfc90ab638c0e5b7de191791198f57e699760c06a581b8071680a93d350cf32abf30e5702124ea0cf729d505ff5872c208d9713082',
  //           },
  //           body: JSON.stringify({
  //             data: {
  //               logo_img: '/images/sitemap/',
  //             },
  //           }),
  //         }
  //       );
  //       const data = await res.json();
  //       console.log({ data });
  //     });
  //   }
  // }, [categories?.length]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      <h1 className='text-3xl font-black text-center my-5 text-indigo-600'>
        Github Users List
      </h1>
      <main className='container mx-auto px-4 sm:px-8 md:px-12'>
        <Search />
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
