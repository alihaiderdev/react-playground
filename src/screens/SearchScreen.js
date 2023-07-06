import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserList from '../components/UserList';
import { fetchUsers } from '../store/Slices/userSlice';

const SearchScreen = () => {
  let [searchParams, _] = useSearchParams();
  const dispatch = useDispatch(),
    navigate = useNavigate();
  const { isLoading, error, users, total } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers(searchParams.get('q')));
  }, [searchParams.get('q')]);

  return (
    <>
      <h1 className='text-3xl font-black text-center my-5 text-indigo-600'>
        Search Results: ({total})
      </h1>

      <main className='container mx-auto px-4 sm:px-8 md:px-12'>
        <button
          className='bg-indigo-600 p-3 text-white rounded-md'
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
        {isLoading && <h1 className='text-indigo-600 text-2xl'>Loading...</h1>}
        {!isLoading && error && (
          <h1 className='text-indigo-600 text-2xl'>{error}</h1>
        )}
        {!isLoading && users?.length > 0 ? (
          <UserList users={users} isLoading={isLoading} />
        ) : (
          <h1 className='text-3xl font-black text-center my-5 text-indigo-600'>
            No result found by your query "{searchParams.get('q')}"
          </h1>
        )}
      </main>
    </>
  );
};

export default SearchScreen;
