import { useSelector } from "react-redux";
import { useShoppingCart } from "../context/CartContext";
// import products from "../products.json";
import {
  convertToUSD,
  imageErrorHandler,
  imageUrlFormatter,
} from "../utilities";
import IncreaseDecreaseAndRemoveButtons from "./IncreaseDecreaseAndRemoveButtons";

const CartItem = ({ id, quantity }) => {
  const { removeFromCart } = useShoppingCart();
  const { products } = useSelector((state) => state.product);

  const item = products.find((product) => product.id === id)?.attributes;
  if (item == null) return null;

  return (
    <div className="grid grid-cols-12 gap-3 my-4">
      <div className="col-span-5">
        <h2 className="text-indigo-600 text-lg font-semibold">{item.title}</h2>
        <img
          src={imageUrlFormatter(item?.image?.data?.attributes?.url)}
          className="object-cover h-40"
          onError={({ currentTarget }) => imageErrorHandler(currentTarget)}
        />
      </div>
      <div className="col-span-3 my-auto">
        <IncreaseDecreaseAndRemoveButtons
          id={id}
          qty={quantity}
          quantity={item.quantity}
        />
      </div>
      {/* <div className="col-span-2 my-auto">{formatCurrency(item.price)}</div> */}
      <div className="col-span-2 my-auto">{convertToUSD(item.price)}</div>
      <div className="col-span-2 my-auto">
        {convertToUSD(item.price * quantity)}
      </div>
    </div>
  );
};

export default CartItem;
