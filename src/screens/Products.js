// import { faker } from "@faker-js/faker";
import { Pagination } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ProductItem from '../components/ProductItem';
import { fetchProducts } from '../store/Slices/productSlice';

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

const showTotal = (total) => `${total} Total Items: `;

const Products = () => {
  // http://localhost:1337/api/products?populate=user,image,categories,reviews.user
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const { isLoading, products, error, meta } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  const onShowSizeChange = (current, pageSize) => {
    setItemsPerPage(pageSize);
  };

  const onPageChange = (page) => {
    setCurrentPageNumber(page);
  };

  console.log({ meta });

  useEffect(() => {
    dispatch(
      fetchProducts(
        `/api/products?populate=image&pagination[page]=${currentPageNumber}&pagination[pageSize]=${itemsPerPage}`
      )
    );
  }, [itemsPerPage, currentPageNumber]);

  return (
    <section className='text-gray-600 body-font'>
      {!isLoading && error && <h1>{error}</h1>}
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className='flex flex-wrap -m-4'>
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
          <div className='w-full py-10'>
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              total={meta?.total}
              showTotal={showTotal}
              showQuickJumper
              current={currentPageNumber}
              onChange={onPageChange}
              hideOnSinglePage={true}
              pageSizeOptions={['10', '50', '100', '200']}
              responsive={true}
              // defaultCurrent={currentPageNumber}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default memo(Products);
