// import { faker } from "@faker-js/faker";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ProductItem from "../components/ProductItem";
import { fetchProducts } from "../store/Slices/productSlice";

// const ids = { categories: [1, 2, 3, 4, 5], users: [1, 2, 3, 4] };
// const { categories, users } = ids;
// products = products.map((product, index) => {
//   return {
//     ...product,
//     id: index + 1,
//     categories: [categories[Math.floor(Math.random() * categories.length)]],
//     user: users[Math.floor(Math.random() * users.length)],
//     image: faker.image.food(2048, 1080, true),
//   };
// });

const Products = () => {
  // http://localhost:1337/api/products?populate=user,image,categories,reviews.user
  const { isLoading, products, error, meta } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchProducts(
        `/api/products?populate=image&pagination[page]=1&pagination[pageSize]=100`
      )
    );
  }, []);

  return (
    <section className="text-gray-600 body-font">
      {!isLoading && error && <h1>{error}</h1>}
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="flex flex-wrap -m-4">
            {products?.length > 0 &&
              products?.map((product) => {
                return (
                  <ProductItem
                    key={product.id}
                    product={{ id: product.id, ...product.attributes }}
                  />
                );
              })}
          </div>
          {/* <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              total={totalHits}
              showTotal={showTotal}
              showQuickJumper
              current={currentPageNumber}
              onChange={onPageChange}
              hideOnSinglePage={true}
              pageSizeOptions={["10", "50", "100", "200"]}
              responsive={true}
              // defaultCurrent={currentPageNumber}
              // total={500}
              // itemRender={itemRender}
            /> */}
        </>
      )}
    </section>
  );
};

export default memo(Products);
