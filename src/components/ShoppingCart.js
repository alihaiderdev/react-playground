import { Drawer } from "antd";
import { useShoppingCart } from "../context/CartContext";
import products from "../products.json";
import { formatCurrency } from "../utilities";
import CartItem from "./CartItem";

export function ShoppingCart({ isOpen }) {
  const { closeCart, cartItems, cartQuantity, clearCart } = useShoppingCart();

  //   useEffect(() => {
  //     if (cartItems?.length === 0) {
  //       closeCart();
  //     }
  //   }, [cartItems?.length]);

  return (
    <Drawer
      title={`Cart (${cartQuantity})`}
      placement="right"
      onClose={closeCart}
      open={isOpen}
      size={"large"}
      //   width={"30%"}
    >
      {cartItems?.length > 0 ? (
        <>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-7">Product</div>
            <div className="col-span-3">Quantity</div>
            <div className="col-span-1">Price</div>
            <div className="col-span-1">Total</div>
          </div>
          {cartItems.map((item, index) => (
            <CartItem key={index} {...item} />
          ))}
          <div className="flex justify-between items-center">
            <span className="font-bold text-indigo-500 text-xl">
              Total{" "}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = products.find((i) => i.id === cartItem.id);
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </span>
            <button
              className="font-semibold bg-red-600 text-white px-3 py-1 rounded-md text-lg"
              onClick={() => clearCart()}
            >
              Clear Cart
            </button>
          </div>
        </>
      ) : (
        <h2 className="text-indigo-600 font-black text-xl text-center">
          No items in cart
        </h2>
      )}
    </Drawer>
  );
}
