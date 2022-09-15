import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import UserList from '../components/UserList';
import { fetchUsers } from '../store/Slices/userSlice';

const SearchScreen = () => {
  let [searchParams, _] = useSearchParams();
  const dispatch = useDispatch();
  const { isLoading, error, users } = useSelector((state) => state.user);
  console.log(searchParams.get('q'), { isLoading, error, users });

  useEffect(() => {
    dispatch(fetchUsers(searchParams.get('q')));
  }, [searchParams.get('q')]);

  return (
    <>
      <h1 className='text-3xl font-black text-center my-5 text-indigo-600'>
        Search Results:
      </h1>
      <main className='container mx-auto px-4 sm:px-8 md:px-12'>
        {isLoading && <h1 className='text-indigo-600 text-2xl'>Loading...</h1>}
        {!isLoading && error && (
          <h1 className='text-indigo-600 text-2xl'>{error}</h1>
        )}
        <UserList users={users} isLoading={isLoading} />
      </main>
    </>
  );
};

export default SearchScreen;
