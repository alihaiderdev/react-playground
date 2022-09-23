import React, { useEffect } from "react";
import products from "../products.json";

const ids = { categories: [1, 2, 3, 4, 5], users: [1, 2, 3, 4] };
const { categories, users } = ids;
console.log(process.env.REACT_APP_STRAPI_TOKEN);
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjYzOTM2MTA5LCJleHAiOjE2NjQwMjI1MDl9.INMpP217dBhSOitvvcCGNoNu4xsMaFzI_VPdZSnVTmY";

const StrapiCrud = () => {
  const createMultipleProducts = async (product) => {
    try {
      console.log({ product });
      const config = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_STRAPI_TOKEN}`,
          //   Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: product }),
      };
      const res = await fetch("http://localhost:1337/api/products", config);
      const _data = await res.json();
      console.log({ _data });
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    console.log(products);

    products.forEach(async (product) => {
      product = {
        ...product,
        categories: [categories[Math.floor(Math.random() * categories.length)]],
        user: users[Math.floor(Math.random() * users.length)],
      };
      //   await createMultipleProducts(product);
    });
  }, []);

  return <div>StrapiCrud</div>;
};

export default StrapiCrud;
