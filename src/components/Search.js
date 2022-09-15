import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './Input';

const Search = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  // console.log(navigate());
  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
  };
  return (
    <form onSubmit={searchHandler} className='w-2/4 flex items-center mb-4'>
      <Input
        isLabel={false}
        type={'search'}
        name={'query'}
        value={query}
        handler={(e) => setQuery(e.target.value)}
      />

      <button
        type={'submit'}
        className='bg-indigo-600 p-3 text-white rounded-md'
      >
        Search
      </button>
    </form>
  );
};

export default Search;
