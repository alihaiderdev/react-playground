import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useAuthAndCartContext } from "../context";

const useOrder = (session_id) => {
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuthAndCartContext();

  useEffect(() => {
    if (Object.keys(user || {}).length > 0) {
      const fetchOrder = async () => {
        try {
          setIsLoading(true);
          const { data } = await axios(`/api/orders/confirm`, {
            method: "POST",
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
  }, [Object.keys(user || {}).length]);

  return { order, isLoading, error };
};

const OrderSuccess = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const { clearCart } = useAuthAndCartContext();
  const { order, isLoading, error } = useOrder(searchParams.get("session_id"));

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <>
      {!isLoading && error && <h1>{error}</h1>}
      {isLoading ? (
        <Spinner />
      ) : (
        <h1>
          Your order has been confirm with the order id: {order.id} and status:{" "}
          {order.status}
        </h1>
      )}
    </>
  );
};

export default OrderSuccess;
