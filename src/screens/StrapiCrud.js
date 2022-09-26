import React, { useEffect } from "react";
import products from "../products.json";
import { getIds } from "../utilities";
import { create, read } from "../utilities/scripts";

// const ids = { categories: [1, 2, 3, 4, 5], users: [1, 2, 3, 4] };
// const { categories, users } = ids;

const StrapiCrud = () => {
  const createMultipleProducts = async (product) => {
    try {
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

  //   useEffect(() => {
  //     products.forEach(async (product) => {
  //       product = {
  //         ...product,
  //         categories: [categories[Math.floor(Math.random() * categories.length)]],
  //         user: users[Math.floor(Math.random() * users.length)],
  //       };
  //       //   await createMultipleProducts(product);
  //     });
  //   }, []);

  useEffect(async () => {
    const categories = getIds(await read({ url: `/api/categories` }));
    const users = getIds(await read({ url: `/api/users` }));

    products.forEach(async (product) => {
      product = {
        ...product,
        categories: [categories[Math.floor(Math.random() * categories.length)]],
        user: users[Math.floor(Math.random() * users.length)],
      };
      await create({ url: `/api/products`, fields: product });
    });
  }, []);

  return <div>StrapiCrud</div>;
};

export default StrapiCrud;
