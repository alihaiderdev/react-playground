import { Rate, Spin } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthAndCartContext } from '../context';
import { success } from '../utilities';

const Review = ({ review, getAllReviewsByProductId }) => {
  const {
    attributes: {
      content,
      rating,
      createdAt,
      user: {
        data: {
          id: userId,
          attributes: { firstName, lastName, username },
        },
      },
    },
    id,
  } = review;
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthAndCartContext();

  const deleteReview = async (reviewId) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/reviews/${reviewId}?productId=${params.id}`);
      success('Review deleted successfully!');
      getAllReviewsByProductId();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li className='mb-2 shadow-xl rounded-t-8xl rounded-b-5xl overflow-hidden'>
      <div className='px-4 pt-4 bg-white bg-opacity-40'>
        <div className='flex items-center justify-between'>
          <div className='flex'>
            <h4 className='w-full md:w-auto text-xl font-heading font-medium'>
              {firstName && lastName ? `${firstName} ${lastName}` : username}
            </h4>
            <div className='ml-4'>
              <span className='mr-4 text-xl font-heading font-medium'>
                {rating.toString().length === 1 ? `${rating}.0` : rating}
              </span>
              <Rate disabled allowHalf defaultValue={rating} />
            </div>
          </div>
          <div>
            {userId === user?.user?.id && (
              <button
                onClick={() => deleteReview(id)}
                className='bg-red-600 text-white font-semibold px-2 py-1 rounded-sm'
              >
                {isLoading && <Spin size='small' />} Delete
              </button>
            )}
          </div>
        </div>
      </div>
      <div className='p-4 overflow-hidden bg-white'>
        <div className='flex flex-wrap'>
          <div className='w-full md:w-2/3 mb-6 md:mb-0'>
            <p className='max-w-2xl text-gray-400 leading-loose'>{content}</p>
          </div>
          <div className='w-full md:w-1/3 text-right'>
            <p className='text-sm text-gray-400'>
              {moment(createdAt).fromNow()}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Review;
