import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuthAndCartContext } from '../context';

const useOrder = (session_id) => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuthAndCartContext();

  useEffect(() => {
    if (session_id) {
      const fetchOrder = async () => {
        try {
          setIsLoading(true);
          const { data } = await axios(`/api/orders/confirm`, {
            method: 'POST',
            data: JSON.stringify({ data: { checkout_session: session_id } }),
          });

          setOrder(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchOrder();
    }
  }, [session_id]);

  return { order, isLoading, error };
};

const OrderSuccess = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const { clearCart } = useAuthAndCartContext();
  const { order, isLoading, error } = useOrder(searchParams.get('session_id'));

  useEffect(() => {
    clearCart();
    console.log(searchParams.get('session_id'));
    console.log({ order, isLoading, error });
  }, []);

  return (
    <div>
      Your order has been confirm with the order id: {order.id} and status:{' '}
      {order.status}
    </div>
  );
};

export default OrderSuccess;
