import React from 'react';
import { useAuthAndCartContext } from '../context';

const Orders = () => {
  const { user } = useAuthAndCartContext();
  return <div>Orders</div>;
};

export default Orders;
