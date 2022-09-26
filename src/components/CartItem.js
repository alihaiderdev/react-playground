import { useSelector } from 'react-redux';
import {
  convertToUSD,
  imageErrorHandler,
  imageUrlFormatter,
  placeholderImageUrl,
} from '../utilities';
import IncreaseDecreaseAndRemoveButtons from './IncreaseDecreaseAndRemoveButtons';

const CartItem = ({ id, quantity }) => {
  const { products } = useSelector((state) => state.product);

  const item = products?.find((product) => product.id === id)?.attributes;
  if (item == null) return null;

  console.log(item);

  return (
    <div className='grid grid-cols-12 gap-3 my-4'>
      <div className='col-span-5'>
        <h2 className='text-indigo-600 text-lg font-semibold'>{item.title}</h2>
        <img
          src={
            item?.image?.data
              ? imageUrlFormatter(item?.image?.data?.attributes?.url)
              : placeholderImageUrl
          }
          className='object-cover h-40 w-full'
          onError={({ currentTarget }) => imageErrorHandler(currentTarget)}
        />
      </div>
      <div className='col-span-3 my-auto'>
        <IncreaseDecreaseAndRemoveButtons
          id={id}
          qty={quantity}
          quantity={item.quantity}
        />
      </div>
      {/* <div className="col-span-2 my-auto">{formatCurrency(item.price)}</div> */}
      <div className='col-span-2 my-auto'>{convertToUSD(item.price)}</div>
      <div className='col-span-2 my-auto'>
        {convertToUSD(item.price * quantity)}
      </div>
    </div>
  );
};

export default CartItem;
