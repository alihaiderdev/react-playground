import { Link } from "react-router-dom";
import { useShoppingCart } from "../context/CartContext";
import {
  convertToUSD,
  imageErrorHandler,
  imageUrlFormatter,
} from "../utilities";
import IncreaseDecreaseAndRemoveButtons from "./IncreaseDecreaseAndRemoveButtons";

const ProductItem = ({
  product: { id, title, price, image, description, quantity },
}) => {
  const { getItemQuantity, increaseCartQuantity } = useShoppingCart();

  const qty = getItemQuantity(id);

  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <Link to={`/products/${id}`}>
        <span className="block relative h-48 rounded overflow-hidden">
          <img
            alt={title}
            className="object-cover object-center w-full h-full block"
            src={imageUrlFormatter(image?.data?.attributes?.url)}
            onError={({ currentTarget }) => imageErrorHandler(currentTarget)}
          />
        </span>
      </Link>
      <div className="mt-4">
        <h2 className="text-gray-900 title-font text-lg font-medium">
          {title}
        </h2>
        <ul className="flex justify-between items-center">
          <li className="text-md font-black text-indigo-600">
            Price: {convertToUSD(price)}
          </li>
          <li className="text-md font-black text-indigo-600">
            Quantity: {quantity}
          </li>
          {qty === 0 ? (
            <button
              onClick={() => increaseCartQuantity(id)}
              className="capitalize bg-indigo-600 text-white font-semibold px-2 py-1 rounded-sm"
            >
              + Add to cart
            </button>
          ) : (
            <IncreaseDecreaseAndRemoveButtons
              id={id}
              qty={qty}
              quantity={quantity}
            />
          )}
        </ul>
        {/* <p className="mt-1">{description}</p> */}
      </div>
    </div>
  );
};

export default ProductItem;
