import React from 'react';

const Input = ({ type, name, value, handler }) => {
  return (
    <div className='mb-3'>
      <label
        className='text-lg capitalize font-black text-indigo-600 w-1/4 inline-block mb-2'
        htmlFor={name}
      >
        {name}:{' '}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={`Enter your ${name}`}
        className='m-0 py-3 px-2 border-solid border-2 border-indigo-600 outline-none w-4/5'
        required
        value={value}
        onChange={handler}
        autoComplete='off'
      />
    </div>
  );
};
export default Input;
