import { loadStripe } from "@stripe/stripe-js";
import { Drawer } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { constant } from "../constants";
import { useAuthAndCartContext } from "../context";
import { fetchCartProductsList } from "../store/Slices/productSlice";
import { convertToUSD } from "../utilities";
import CartItem from "./CartItem";
import LoadingButton from "./LoadingButton";

const stripePromise = loadStripe(constant.STRIPE_PK);

export function ShoppingCart({ isOpen }) {
  const dispatch = useDispatch();
  const { closeCart, cartItems, cartQuantity, clearCart, user } =
    useAuthAndCartContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    isLoading,
    error: _error,
    productsInCart,
  } = useSelector((state) => state.product);

  useEffect(() => {
    const filterIds = cartItems
      .map((item, index) => `filters[id][$in][${index}]=${item.id}`)
      .join("&");
    dispatch(
      fetchCartProductsList(`/api/products?${filterIds}&populate=image`)
    );
  }, [cartItems.length]);

  const login = () => {
    closeCart();
    navigate("/auth/login");
  };

  const calculateTotal = (cartItems) => {
    if (productsInCart?.length > 0) {
      return cartItems.reduce((total, cartItem) => {
        const item = productsInCart?.find(
          (i) => i.id === cartItem.id
        )?.attributes;
        return total + (item?.price || 0) * cartItem.quantity;
      }, 0);
    }
  };

  const checkout = async () => {
    // https://dmitripavlutin.com/remove-object-property-javascript/
    const { id, ...billingAddress } = user?.user.billingAddress;
    const order = {
      total: calculateTotal(cartItems),
      user: user?.user.id,
      status: "unpaid",
      products: cartItems?.map((item) => item.id),
      quantityWithProductIds: cartItems,
      address: billingAddress,
    };
    try {
      setLoading(true);
      const stripe = await stripePromise;
      const { data } = await axios(`/api/orders`, {
        method: "POST",
        data: JSON.stringify({ data: order }),
      });
      const result = await stripe.redirectToCheckout({
        sessionId: data?.session_id,
      });
      console.log({ result });
    } catch (error) {
      error(error.message);
      console.log({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title={`Cart (${cartQuantity})`}
      placement="right"
      onClose={closeCart}
      open={isOpen}
      size={"large"}
      //   width={"30%"}
    >
      {!isLoading && _error && (
        <h1 className="text-indigo-600 font-bold text-3xl">{_error}</h1>
      )}
      {isLoading ? (
        <h1 className="text-indigo-600 font-bold text-3xl">Loading ...</h1>
      ) : cartItems?.length > 0 ? (
        <>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-5">Product</div>
            <div className="col-span-3">Quantity</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Total</div>
          </div>
          {cartItems.map((item, index) => (
            <CartItem key={index} {...item} productsInCart={productsInCart} />
          ))}
          <div className="flex justify-end items-center">
            <span className="font-bold text-indigo-500 text-xl">
              Total {convertToUSD(calculateTotal(cartItems))}
            </span>
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              className="capitalize bg-red-600 text-white font-semibold px-2 py-1 rounded-sm"
              onClick={() => clearCart()}
            >
              Clear Cart
            </button>
            {Object.keys(user || {}).length > 0 ? (
              <LoadingButton
                loading={loading}
                title={"Checkout"}
                handler={checkout}
              />
            ) : (
              <button
                onClick={login}
                className="capitalize bg-indigo-600 text-white font-semibold px-2 py-1 rounded-sm"
              >
                Login
              </button>
            )}
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
