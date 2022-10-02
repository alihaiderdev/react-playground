import { Rate } from "antd";
import moment from "moment";
import { useState } from "react";
import { useParams } from "react-router-dom";
import IncreaseDecreaseAndRemoveButtons from "../components/IncreaseDecreaseAndRemoveButtons";
import { useAuthAndCartContext } from "../context";
import { useRead } from "../hooks";
import {
  convertToUSD,
  imageErrorHandler,
  imageUrlFormatter,
  placeholderImageUrl,
} from "../utilities";

const description = ["terrible", "bad", "normal", "good", "wonderful"];

const Product = () => {
  const { id: productId } = useParams();
  const { getItemQuantity } = useAuthAndCartContext();
  const [reviews, setReviews] = useState([]);

  const {
    isLoading,
    error,
    data: { id, attributes },
  } = useRead({
    url: `/api/products/${productId}?populate=image,reviews.user`,
  });

  const qty = getItemQuantity(id);

  return (
    <section className="grid grid-cols-12 gap-6">
      {!isLoading && error && (
        <div className="col-span-12 text-center">
          <h1 className="text-indigo-600 font-bold text-3xl">{error}</h1>
        </div>
      )}
      {isLoading ? (
        <h1 className="text-indigo-600 font-bold text-3xl">Loading...</h1>
      ) : (
        !error && (
          <>
            <div className="col-span-12 md:col-span-6">
              <span className="block relative rounded overflow-hidden">
                <img
                  alt={attributes?.title}
                  className="object-cover object-center w-full h-full block"
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
            <div className="col-span-12 md:col-span-6">
              <h1 className="text-indigo-600 font-bold text-3xl">
                {attributes?.title}
              </h1>
              <Rate
                tooltips={description}
                className="text-indigo-600 pt-4"
                allowHalf
                disabled
                defaultValue={attributes?.averageRating}
              />
              <p
                className="py-4"
                dangerouslySetInnerHTML={{ __html: attributes?.description }}
              ></p>
              <ul className="text-indigo-600 text-xl">
                <li className="pb-2">
                  Quantity:{" "}
                  <span className="font-black">{attributes?.quantity}</span>
                </li>
                <li className="pb-2">
                  Price:{" "}
                  <span className="font-black">
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

            <section className="col-span-12">
              <h1 class="mb-8 text-3xl font-heading font-medium leading-tight">
                Reviews ({attributes?.reviews?.data?.length})
              </h1>

              {attributes?.reviews?.data?.length > 0 &&
                attributes?.reviews?.data?.map(
                  ({
                    id,
                    attributes: {
                      content,
                      rating,
                      createdAt,
                      user: {
                        data: {
                          attributes: { firstName, lastName, username },
                        },
                      },
                    },
                  }) => {
                    return (
                      <div className="mb-2 shadow-lg rounded-t-8xl rounded-b-5xl overflow-hidden">
                        <div className="px-4 pt-4 md:px-12 bg-white bg-opacity-40">
                          <div className="flex flex-wrap items-center">
                            <h4 className="w-full md:w-auto text-xl font-heading font-medium">
                              {firstName && lastName
                                ? `${firstName} ${lastName}`
                                : username}
                            </h4>
                            <div className="w-full md:w-px h-2 md:h-8 mx-8 bg-transparent md:bg-gray-200"></div>
                            <span className="mr-4 text-xl font-heading font-medium">
                              {rating.toString().length === 1
                                ? `${rating}.0`
                                : rating}
                            </span>
                            <Rate disabled allowHalf defaultValue={rating} />
                          </div>
                        </div>
                        <div className="px-4 pt-4 pb-8 md:px-12 overflow-hidden bg-white">
                          <div className="flex flex-wrap">
                            <div className="w-full md:w-2/3 mb-6 md:mb-0">
                              <p className="max-w-2xl text-gray-400 leading-loose">
                                {content}
                              </p>
                            </div>
                            <div className="w-full md:w-1/3 text-right">
                              <p className="text-sm text-gray-400">
                                {moment(createdAt).fromNow()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
            </section>
          </>
        )
      )}
    </section>
  );
};

export default Product;
