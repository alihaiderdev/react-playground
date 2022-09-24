// import { faker } from "@faker-js/faker";
import React, { useEffect } from "react";
import ProductItem from "../components/ProductItem";
import products from "../products.json";

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
  useEffect(() => {
    console.log(products);
  }, []);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products?.length > 0 &&
            products?.map((product, index) => {
              return <ProductItem key={index} product={product} />;
            })}
        </div>
      </div>
    </section>
  );
};

export default Products;
