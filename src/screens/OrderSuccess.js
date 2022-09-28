import React, { useEffect } from "react";
import { useAuthAndCartContext } from "../context";

const OrderSuccess = () => {
  const { clearCart } = useAuthAndCartContext();

  useEffect(() => {
    clearCart();
  }, []);

  return <div>OrderSuccess</div>;
};

export default OrderSuccess;
