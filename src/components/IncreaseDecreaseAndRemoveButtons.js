import React from "react";
import { useShoppingCart } from "../context/CartContext";

const IncreaseDecreaseAndRemoveButtons = ({ id, quantity }) => {
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart();

  return (
    <div className="flex items-center flex-col gap-2">
      <div className="flex items-center justify-center gap-2">
        <button
          className="bg-indigo-600 text-white font-semibold px-2 py-1 rounded-sm"
          onClick={() => decreaseCartQuantity(id)}
        >
          -
        </button>
        <div>
          <span className="fs-3">{quantity}</span> in cart
        </div>
        <button
          className="bg-indigo-600 text-white font-semibold px-2 py-1 rounded-sm"
          onClick={() => increaseCartQuantity(id)}
        >
          +
        </button>
      </div>
      <button
        className="bg-red-600 text-white font-semibold px-2 py-1 rounded-sm"
        onClick={() => removeFromCart(id)}
      >
        Remove
      </button>
    </div>
  );
};

export default IncreaseDecreaseAndRemoveButtons;
