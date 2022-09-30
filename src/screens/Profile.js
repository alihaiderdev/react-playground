import React from 'react';
import { useAuthAndCartContext } from '../context';

const Profile = () => {
  const { user } = useAuthAndCartContext();
  return <div>Profile</div>;
};

export default Profile;
