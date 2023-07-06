import { message, Rate, Spin } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IncreaseDecreaseAndRemoveButtons } from '../components/IncreaseDecreaseAndRemoveButtons';
import Review from '../components/Review';
import { useAuthAndCartContext } from '../context';
import {
  convertToUSD,
  imageErrorHandler,
  imageUrlFormatter,
  placeholderImageUrl,
} from '../utilities';

const description = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const Product = () => {
  const { id: productId } = useParams();
  const { getItemQuantity } = useAuthAndCartContext();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({});
  const { id, attributes } = product;
  const [error, setError] = useState('');
  const { user } = useAuthAndCartContext();

  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProductDetails = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(`/api/products/${productId}?populate=image`);

      setProduct(data?.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllReviewsByProductId = async () => {
    try {
      setLoading(true);
      const { data } = await axios(
        `/api/reviews?filters[product][id]=${productId}&populate=user`
      );
      setReviews(data?.data);
    } catch (error) {
      message.error('Error while getting reviews!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      getProductDetails();
      getAllReviewsByProductId();
    }
  }, [productId]);

  const reviewSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios(`/api/reviews`, {
        method: 'POST',
        data: JSON.stringify({
          data: {
            content: content.trim(),
            rating,
            user: user?.user?.id,
            product: +productId,
          },
        }),
      });
      setContent('');
      setRating(0);
      getAllReviewsByProductId();
    } catch (error) {
      message.error('Error while posting review!');
    } finally {
      setLoading(false);
    }
  };

  const qty = getItemQuantity(id);

  return (
    <section className='grid grid-cols-12 gap-6'>
      {!isLoading && error && (
        <div className='col-span-12 text-center'>
          <h1 className='text-indigo-600 font-bold text-3xl'>{error}</h1>
        </div>
      )}
      {isLoading ? (
        <h1 className='text-indigo-600 font-bold text-3xl'>Loading...</h1>
      ) : (
        !error && (
          <>
            <div className='col-span-12 md:col-span-6'>
              <span className='block relative rounded overflow-hidden'>
                <img
                  alt={attributes?.title}
                  className='object-cover object-center w-full h-full block'
                  src={
                    attributes?.image?.data
                      ? imageUrlFormatter(
                          attributes?.image?.data?.attributes?.url
                        )
                      : placeholderImageUrl
                  }
                  onError={({ currentTarget }) =>
                    imageErrorHandler(currentTarget)
                  }
                />
              </span>
            </div>
            <div className='col-span-12 md:col-span-6'>
              <h1 className='text-indigo-600 font-bold text-3xl'>
                {attributes?.title}
              </h1>
              <Rate
                tooltips={description}
                className='text-indigo-600 pt-4'
                allowHalf
                disabled
                defaultValue={attributes?.averageRating}
              />
              <p
                className='py-4'
                dangerouslySetInnerHTML={{ __html: attributes?.description }}
              ></p>
              <ul className='text-indigo-600 text-xl'>
                <li className='pb-2'>
                  Quantity:{' '}
                  <span className='font-black'>{attributes?.quantity}</span>
                </li>
                <li className='pb-2'>
                  Price:{' '}
                  <span className='font-black'>
                    {convertToUSD(attributes?.price)}
                  </span>
                </li>
              </ul>
              <IncreaseDecreaseAndRemoveButtons
                id={id}
                qty={qty}
                quantity={attributes?.quantity}
              />
            </div>
            <section className='col-span-8'>
              {Object.keys(user || {}).length > 0 ? (
                <form className='mt-8' onSubmit={reviewSubmitHandler}>
                  <h1 className='text-indigo-600 text-xl font-semibold mb-4'>
                    Give your valuable review!
                  </h1>
                  <div className='grid grid-cols-12 gap-6'>
                    <div className='col-span-12 md:col-span-6 flex'>
                      <label
                        className='m-0 text-lg capitalize font-black text-indigo-600 text-left block'
                        htmlFor={'content'}
                      >
                        Content:
                      </label>
                      <textarea
                        id='content'
                        rows={5}
                        value={content}
                        name='content'
                        required
                        onChange={(e) => setContent(e.target.value)}
                        placeholder='Write your review'
                        className='ml-4 w-full rounded-md px-2 py-3 outline-none resize-none border-solid border-2 border-indigo-600'
                      />
                    </div>
                    <div className='col-span-12 md:col-span-6 flex'>
                      <label className='m-0 text-lg capitalize font-black text-indigo-600 text-left block'>
                        Rating:
                      </label>
                      <Rate
                        allowHalf
                        value={rating}
                        onChange={(value) => setRating(value)}
                        className='mb-4 ml-4 text-indigo-600'
                      />
                    </div>
                  </div>

                  <div className='flex justify-end'>
                    <button className='bg-indigo-600 text-white font-semibold px-2 py-1 rounded-sm'>
                      Submit
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <h1 className='text-indigo-600 text-xl font-semibold mb-4'>
                    For submitting your review please login first!
                    <Link
                      to={`/auth/login`}
                      className='flex-shrink-0 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded hover:text-white ml-4'
                    >
                      Login
                    </Link>
                  </h1>
                </div>
              )}

              {loading ? (
                <Spin />
              ) : !loading && reviews?.length > 0 ? (
                <>
                  <h1 className='mb-8 text-3xl font-heading font-medium leading-tight'>
                    Reviews ({reviews?.length})
                  </h1>

                  <ul>
                    {reviews?.map((review) => {
                      return (
                        <Review
                          review={review}
                          key={review?.id}
                          getAllReviewsByProductId={getAllReviewsByProductId}
                        />
                      );
                    })}
                  </ul>
                </>
              ) : (
                <h1>No reviews yet!</h1>
              )}
              {}
            </section>
          </>
        )
      )}
    </section>
  );
};

export default Product;
