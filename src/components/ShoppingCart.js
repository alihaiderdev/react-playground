import { Drawer } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useShoppingCart } from '../context/CartContext';
import { fetchCartProductsList } from '../store/Slices/productSlice';
import { convertToUSD } from '../utilities';
import CartItem from './CartItem';

export function ShoppingCart({ isOpen }) {
  const dispatch = useDispatch();
  const { closeCart, cartItems, cartQuantity, clearCart } = useShoppingCart();
  const { isLoading, error, productsInCart } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    const filterIds = cartItems
      .map((item, index) => `filters[id][$in][${index}]=${item.id}`)
      .join('&');
    dispatch(
      fetchCartProductsList(`/api/products?${filterIds}&populate=image`)
    );
  }, [cartItems.length]);

  return (
    <Drawer
      title={`Cart (${cartQuantity})`}
      placement='right'
      onClose={closeCart}
      open={isOpen}
      size={'large'}
      //   width={"30%"}
    >
      {!isLoading && error && (
        <h1 className='text-indigo-600 font-bold text-3xl'>{error}</h1>
      )}
      {isLoading ? (
        <h1 className='text-indigo-600 font-bold text-3xl'>Loading ...</h1>
      ) : cartItems?.length > 0 ? (
        <>
          <div className='grid grid-cols-12 gap-3'>
            <div className='col-span-5'>Product</div>
            <div className='col-span-3'>Quantity</div>
            <div className='col-span-2'>Price</div>
            <div className='col-span-2'>Total</div>
          </div>
          {cartItems.map((item, index) => (
            <CartItem key={index} {...item} productsInCart={productsInCart} />
          ))}
          <div className='flex justify-between items-center'>
            <span className='font-bold text-indigo-500 text-xl'>
              Total{' '}
              {convertToUSD(
                cartItems.reduce((total, cartItem) => {
                  const item = productsInCart?.find(
                    (i) => i.id === cartItem.id
                  )?.attributes;
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </span>
            <button
              className='font-semibold bg-red-600 text-white px-3 py-1 rounded-md text-lg'
              onClick={() => clearCart()}
            >
              Clear Cart
            </button>
          </div>
        </>
      ) : (
        <h2 className='text-indigo-600 font-black text-xl text-center'>
          No items in cart
        </h2>
      )}
    </Drawer>
  );
}
