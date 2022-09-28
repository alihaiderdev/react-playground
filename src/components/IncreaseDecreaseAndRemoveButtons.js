import { useAuthAndCartContext } from "../context";

const IncreaseDecreaseAndRemoveButtons = ({ id, quantity, qty }) => {
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useAuthAndCartContext();
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
          <span className="fs-3">{qty}</span> in cart
        </div>
        <button
          disabled={quantity === qty ? true : false}
          className="bg-indigo-600 text-white font-semibold px-2 py-1 rounded-sm"
          onClick={() => quantity !== qty && increaseCartQuantity(id)}
        >
          {quantity === qty ? "Disabled" : "+"}
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
