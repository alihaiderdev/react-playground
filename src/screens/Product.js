import { Rate } from "antd";
import { useParams } from "react-router-dom";
import IncreaseDecreaseAndRemoveButtons from "../components/IncreaseDecreaseAndRemoveButtons";
import { useShoppingCart } from "../context/CartContext";
import { useFetchData } from "../hooks/useFetchData";
import {
  convertToUSD,
  imageErrorHandler,
  imageUrlFormatter,
} from "../utilities";

const description = ["terrible", "bad", "normal", "good", "wonderful"];

const Product = () => {
  const { id: productId } = useParams();
  const { getItemQuantity } = useShoppingCart();

  const {
    isLoading,
    error,
    data: { id, attributes },
    meta,
  } = useFetchData(
    `/api/products/${productId}?populate=user,image,reviews.user`
  );

  const qty = getItemQuantity(id);
  //   console.log({ id, attributes });

  return (
    <section className="grid grid-cols-12 gap-6">
      {!isLoading && error && (
        <h1 className="text-indigo-600 font-bold text-3xl">{error}</h1>
      )}
      {isLoading ? (
        <h1 className="text-indigo-600 font-bold text-3xl">Loading...</h1>
      ) : (
        <>
          <div className="col-span-12 md:col-span-6">
            <span className="block relative rounded overflow-hidden">
              <img
                alt={attributes?.title}
                className="object-cover object-center w-full h-full block"
                src={imageUrlFormatter(
                  attributes?.image?.data?.attributes?.url
                )}
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
        </>
      )}
    </section>
  );
};

export default Product;
