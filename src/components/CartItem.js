import { useShoppingCart } from "../context/CartContext";
import products from "../products.json";
import { formatCurrency } from "../utilities";
import IncreaseDecreaseAndRemoveButtons from "./IncreaseDecreaseAndRemoveButtons";

const CartItem = ({ id, quantity }) => {
  const { removeFromCart } = useShoppingCart();
  const item = products.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <div className="grid grid-cols-12 gap-3 my-4">
      <div className="col-span-6">
        <h2 className="text-indigo-600 text-lg font-semibold">{item.title}</h2>
        <img src={item.image} className="object-cover h-40" />
      </div>
      <div className="col-span-4 my-auto">
        <IncreaseDecreaseAndRemoveButtons
          id={id}
          qty={quantity}
          quantity={item.quantity}
        />
      </div>
      <div className="col-span-1 my-auto">{formatCurrency(item.price)}</div>
      <div className="col-span-1 my-auto">
        {formatCurrency(item.price * quantity)}
      </div>
      {/* <div className="col-span-6">
        <img src={item.image} className="object-contain w-full" />
      </div>
      <div className="col-span-6">
        <div>
          <h2 className="text-indigo-600 text-lg font-bold">{item.title}</h2>{" "}
          <p>{item.description}</p>
          <div className="text-indigo-600 text-lg font-semibold">
            Price: {formatCurrency(item.price)}
          </div>
          {quantity > 1 && (
            <span className="text-indigo-600 text-xs">x{quantity}</span>
          )}
          {formatCurrency(item.price * quantity)}
          <div className="mt-4">
            <IncreaseDecreaseAndRemoveButtons id={id} quantity={quantity} />
          </div>
          <div className="flex justify-between"></div>
          <div>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md text-xl"
              onClick={() => removeFromCart(item.id)}
            >
              &times;
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CartItem;
