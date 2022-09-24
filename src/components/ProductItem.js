import { useShoppingCart } from "../context/CartContext";
import IncreaseDecreaseAndRemoveButtons from "./IncreaseDecreaseAndRemoveButtons";

const ProductItem = ({ product: { id, title, price, image, description } }) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);

  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <a className="block relative h-48 rounded overflow-hidden">
        <img
          alt={title}
          className="object-cover object-center w-full h-full block"
          src={image}
        />
      </a>
      <div className="mt-4">
        <h2 className="text-gray-900 title-font text-lg font-medium">
          {title}
        </h2>
        <ul className="flex justify-between items-center">
          <li className="text-md font-black text-indigo-600">
            Price: ${price}
          </li>
          {/* <li>Qty: {product.quantity}</li> */}
          {quantity === 0 ? (
            <button
              onClick={() => increaseCartQuantity(id)}
              className="capitalize bg-indigo-600 text-white font-semibold px-2 py-1 rounded-sm"
            >
              + Add to cart
            </button>
          ) : (
            <IncreaseDecreaseAndRemoveButtons id={id} quantity={quantity} />
          )}
        </ul>
        <p className="mt-1">${description}</p>
      </div>
    </div>
  );
};

export default ProductItem;
