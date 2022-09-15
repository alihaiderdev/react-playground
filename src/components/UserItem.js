import React, { useState } from 'react';
import CustomModal from '../components/Modal';

const UserItem = ({ user, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div
      className='col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3'
      key={user.id}
    >
      <div className={`shadow-2xl p-4 rounded-lg text-center`}>
        <img
          className='w-48 rounded-full'
          src={user.avatar_url}
          alt={user.login}
          style={{ margin: '0 auto' }}
        />
        <h6
          className='text-indigo-600 text cursor-pointer pt-7'
          onClick={openModal}
        >
          {user.login}
        </h6>
        <div>
          Github Profile URL:{' '}
          <a
            href={user.html_url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-indigo-600 hover:text-indigo-600'
          >
            {user.login}
          </a>
        </div>
      </div>
      <CustomModal
        title={'User Details'}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        username={user.login}
      />
    </div>
  );
};

export default UserItem;
