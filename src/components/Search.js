import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './Input';

const Search = ({ ...rest }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  // console.log(navigate());
  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
  };
  return (
    <form onSubmit={searchHandler} className='flex items-center'>
      <Input
        isLabel={false}
        type={'search'}
        name={'query'}
        value={query}
        handler={(e) => setQuery(e.target.value)}
        style={{ marginBottom: '0px' }}
      />

      <button className='bg-indigo-600 p-3 text-white rounded-md ml-4'>
        Search
      </button>
    </form>
  );
};

export default Search;
