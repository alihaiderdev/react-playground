import React, { useState } from 'react';
import Input from '../components/Input';
import { countries } from '../data';

const genders = ['Male', 'Female', 'Other'];

const Checkbox = ({ id, item, handleClick, isChecked }) => {
  return (
    <li>
      <input
        id={id}
        key={id}
        name={item.name}
        type='checkbox'
        onChange={handleClick}
        checked={isChecked}
        className='mr-2'
      />
      <label htmlFor={`${id}`} className='hover'>
        {item.name} - {getFormattedPrice(item.price)}
      </label>
    </li>
  );
};

const optionsGenerator = (array, filters) => {
  return (
    array?.length > 0 &&
    array?.map((item, index) => {
      return (
        <Checkbox
          key={index}
          type='checkbox'
          item={item}
          id={item.name}
          isChecked={item?.isChecked || false}
          handleClick={filters}
        />
      );
    })
  );
};

const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

const FormScreen = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    gender: genders[0],
    country: countries[0],
  });
  let [toppings, setToppings] = useState([
    {
      name: 'Capsicum',
      price: 1.2,
    },
    {
      name: 'Paneer',
      price: 2.0,
    },
    {
      name: 'Red Paprika',
      price: 2.5,
    },
    {
      name: 'Onions',
      price: 3.0,
    },
    {
      name: 'Extra Cheese',
      price: 3.5,
    },
    {
      name: 'Baby Corns',
      price: 3.0,
    },
    {
      name: 'Mushroom',
      price: 2.0,
    },
  ]);

  let [selectedToppings, setSelectedToppings] = useState([]);
  const [total, setTotal] = useState(0);
  const [showTotal, setShowTotal] = useState(true);
  const { name, email, password, gender, country } = data;

  const submitHandler = (e) => {
    e.preventDefault();
    // on click submit button do whatever you want send data to api or something else here i am just simply log it
    // for this trick you must set same name in in input name attribute as your state name otherwise this shorthand trick is not work as expected
    selectedToppings = toppings?.filter((o) => o?.isChecked);
    setSelectedToppings(selectedToppings);

    console.log({
      name,
      email,
      password,
      gender,
      country,
      total,
      selectedToppings,
    });
  };

  // const onValueChangeHandler = (e) => {
  //   setData({ ...data, [e.target.name]: e.target.value });
  // };
  // OR
  const onValueChangeHandler = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  async function checked(e) {
    const { name, checked } = e.target;
    toppings = toppings.map((item) => {
      if (item.name === name) {
        setTotal((prev) => prev + item?.price);
        return { ...item, isChecked: checked };
      } else {
        return item;
      }
    });
    setToppings(toppings);
  }
  const toppingOptions = optionsGenerator(toppings, checked);

  return (
    <div className='container mx-auto px-4'>
      <form onSubmit={submitHandler}>
        {/* <input
          type='text'
          name='name'
          placeholder='Enter your name'
          className='mr-3 py-3 px-2 border-solid border-2 border-indigo-600 outline-none'
          required
          value={name}
          onChange={onValueChangeHandler}
        />
        <input
          type='email'
          name='email'
          placeholder='Enter your email'
          className='mr-3 py-3 px-2 border-solid border-2 border-indigo-600 outline-none'
          required
          value={email}
          onChange={onValueChangeHandler}
        />
        <input
          type='password'
          name='password'
          placeholder='Enter your password'
          className='mr-3 py-3 px-2 border-solid border-2 border-indigo-600 outline-none'
          required
          value={password}
          onChange={onValueChangeHandler}
        /> */}
        {/* Same Above Code with custom input component */}
        <Input
          type={'text'}
          name={'name'}
          value={name}
          handler={onValueChangeHandler}
        />
        <Input
          type={'email'}
          name={'email'}
          value={email}
          handler={onValueChangeHandler}
        />
        <Input
          type={'password'}
          name={'password'}
          value={password}
          handler={onValueChangeHandler}
        />

        <select
          name='country'
          defaultValue={country}
          className='py-[0.85rem] px-2 border-solid border-2 border-indigo-600 outline-none bg-transparent'
          required
          onChange={onValueChangeHandler}
        >
          {countries?.length > 0 &&
            countries?.map((country, index) => {
              return (
                <option key={index} value={country}>
                  {country}
                </option>
              );
            })}
        </select>

        {/* <span className='p-4' onChange={onValueChangeHandler}>
          <span className='mr-5'>
            <input
              type='radio'
              value='Male'
              name='gender'
              className='accent-indigo-600'
              checked={gender === 'Male'}
            />{' '}
            Male
          </span>
          <span className='mr-5'>
            <input
              type='radio'
              value='Female'
              name='gender'
              className='accent-indigo-600'
              checked={gender === 'Female'}
            />{' '}
            Female
          </span>
          <span className='mr-5'>
            <input
              type='radio'
              value='Other'
              name='gender'
              className='accent-indigo-600'
              checked={gender === 'Other'}
            />{' '}
            Other
          </span>
        </span> */}

        {/* Same Above Code by using array of genders */}

        <span className='p-4' onChange={onValueChangeHandler}>
          {genders?.length > 0 &&
            genders?.map((_gender, index) => {
              return (
                <span className='mr-5' key={index}>
                  <input
                    type='radio'
                    id={`radio-${index}`}
                    className='accent-indigo-600'
                    value={_gender}
                    name='gender'
                    checked={gender === _gender}
                  />{' '}
                  <label htmlFor={`radio-${index}`}>{_gender}</label>
                </span>
              );
            })}
        </span>

        <ul>{toppingOptions}</ul>
        <label>
          <input
            type='checkbox'
            defaultChecked={showTotal}
            onChange={() => setShowTotal(!showTotal)}
            className='mr-2'
          />
          {!showTotal ? 'Show' : 'Hide'} total
        </label>
        {showTotal && (
          <h4 className='pt-3'>
            <span>Total: </span>
            <span className='text-indigo-600 font-black'>
              {getFormattedPrice(total)}
            </span>
          </h4>
        )}

        <div>
          <button
            type='submit'
            className='bg-indigo-600 p-3 text-white rounded-md'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormScreen;
