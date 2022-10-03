import { useAuthAndCartContext } from '../context';

export const IncreaseDecreaseAndRemoveButtons = ({ id, quantity, qty }) => {
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useAuthAndCartContext();
  return (
    <>
      {' '}
      {quantity > 0 ? (
        qty === 0 ? (
          <button
            onClick={() => increaseCartQuantity(id)}
            className='capitalize bg-indigo-600 text-white font-semibold px-2 py-1 rounded-sm'
          >
            + Add to cart
          </button>
        ) : (
          <div className='flex items-center flex-col gap-2'>
            <div className='flex items-center justify-center gap-2'>
              <button
                className='bg-indigo-600 text-white font-semibold px-2 py-1 rounded-sm'
                onClick={() => decreaseCartQuantity(id)}
              >
                -
              </button>
              <div>
                <span className='fs-3'>{qty}</span> in cart
              </div>
              <button
                disabled={quantity === qty ? true : false}
                className='bg-indigo-600 text-white font-semibold px-2 py-1 rounded-sm'
                onClick={() => quantity !== qty && increaseCartQuantity(id)}
              >
                {quantity === qty ? 'Disabled' : '+'}
              </button>
            </div>
            <button
              className='bg-red-600 text-white font-semibold px-2 py-1 rounded-sm'
              onClick={() => removeFromCart(id)}
            >
              Remove
            </button>
          </div>
        )
      ) : (
        <h1 className='text-red-600 font-bold text-lg'>Not in Stock</h1>
      )}
    </>
  );
};
