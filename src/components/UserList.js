import React from 'react';
import UserItem from './UserItem';

const UserList = ({ isLoading, users }) => {
  return (
    !isLoading &&
    users?.length > 0 && (
      <div className='grid grid-cols-12 gap-6 pt-16'>
        {users?.length > 0 &&
          users.map((user, index) => {
            return <UserItem key={index} user={user} index={index} />;
          })}
      </div>
    )
  );
};

export default UserList;
