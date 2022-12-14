import { Link } from 'react-router-dom';
import { useAuthAndCartContext } from '../context';
import {
  convertToUSD,
  imageErrorHandler,
  imageUrlFormatter,
  placeholderImageUrl,
} from '../utilities';
import { IncreaseDecreaseAndRemoveButtons } from './IncreaseDecreaseAndRemoveButtons';

const ProductItem = ({ product: { id, title, price, image, quantity } }) => {
  const { getItemQuantity } = useAuthAndCartContext();

  const qty = getItemQuantity(id);

  return (
    <div className='lg:w-1/4 md:w-1/2 p-4 w-full'>
      <Link to={`/products/${id}`}>
        <span className='block relative h-48 rounded overflow-hidden'>
          <img
            alt={title}
            className='object-cover object-center w-full h-full block'
            src={
              image?.data
                ? imageUrlFormatter(image?.data?.attributes?.url)
                : placeholderImageUrl
            }
            onError={({ currentTarget }) => imageErrorHandler(currentTarget)}
          />
        </span>
      </Link>
      <div className='mt-4'>
        <h2 className='text-gray-900 title-font text-lg font-medium'>
          {title}
        </h2>
        <ul className='flex justify-between items-center'>
          <li className='text-md font-black text-indigo-600'>
            Price: {convertToUSD(price)}
          </li>
          <li className='text-md font-black text-indigo-600'>
            Quantity: {quantity}
          </li>
          <IncreaseDecreaseAndRemoveButtons
            id={id}
            qty={qty}
            quantity={quantity}
          />
        </ul>
        {/* <p className="mt-1">{description}</p> */}
      </div>
    </div>
  );
};

export default ProductItem;
