import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ProductItem from '../components/ProductItem';
import { fetchSearchProducts } from '../store/Slices/productSlice';

const showTotal = (total) => `${total} Total Items: `;
export const Search = () => {
  const dispatch = useDispatch(),
    navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const {
    searchLoading: isLoading,
    searchProducts: products,
    searchError: error,
    searchMeta: meta,
  } = useSelector((state) => state.product);

  const onShowSizeChange = (current, pageSize) => {
    setItemsPerPage(pageSize);
  };

  const onPageChange = (page) => {
    setCurrentPageNumber(page);
  };

  useEffect(() => {
    const query = searchParams.get('q');
    dispatch(
      fetchSearchProducts(
        `/api/products?filters[$or][0][title][$containsi]=${query}&filters[$or][1][description][$containsi]=${query}&populate=image&pagination[page]=${currentPageNumber}&pagination[pageSize]=${itemsPerPage}`
      )
    );
  }, [searchParams.get('q'), itemsPerPage, currentPageNumber]);

  return (
    <>
      <div className='flex items-center justify-between mb-4'>
        <button
          className='bg-indigo-600 p-3 text-white rounded-md'
          onClick={() => navigate('/products')}
        >
          Back to Home
        </button>
        {products?.length > 0 && (
          <h1 className='text-3xl font-black text-center text-indigo-600'>
            Search Results: ({meta?.total})
          </h1>
        )}
      </div>
      {!isLoading && error && <h1>{error}</h1>}
      {isLoading ? (
        <LoadingSkeleton />
      ) : !isLoading && products?.length > 0 ? (
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
            />
          </div>
        </>
      ) : (
        <h1 className='text-3xl font-black text-center my-5 text-indigo-600'>
          No result found by your query "{searchParams.get('q')}"
        </h1>
      )}
    </>
  );
};
