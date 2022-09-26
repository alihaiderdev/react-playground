import axios from "axios";

export const config = {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_STRAPI_TOKEN}`,
    // "Content-Type": "application/json",
  },
};

export const create = async ({ url, fields }) => {
  console.log({ url, fields });
  try {
    const {
      data: { data },
    } = await axios.post(url, {
      headers: {
        Authorization: `Bearer 00f482ed984d75668372983c5fbfda10fc4cf56b74d1311d2d9a337ab87d019bb7fb096f43b553b0ac4bd8e133c2aa10e0012d63d7ab4bbcd779b9faa360b92c2001a8f08d182f2d82839a025b63ad13441c0121bb1507ccec082a834f564f665ccd3488058de34bb1e5f6ff226a6a9434231c885131a31b84e4558fa03189a4`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ data: fields }),
    });
    console.log({ data });
  } catch (error) {
    console.log({ error: error.message });
  }
};

export const read = async ({ url }) => {
  try {
    if (url === "/api/users") {
      const { data } = await axios.get(url);
      console.log({ data });
      return data;
    } else {
      const {
        data: { data },
      } = await axios.get(url);
      console.log({ data });
      return data;
    }
  } catch (error) {
    console.log({ error: error.message });
  }
};

export const update = async ({ url, fields }) => {
  try {
    const {
      data: { data },
    } = await axios.put(url, {
      ...config,
      data: JSON.stringify({ data: fields }),
    });
    console.log({ data });
  } catch (error) {
    console.log({ error: error.message });
  }
};

export const remove = async ({ url }) => {
  try {
    const {
      data: { data },
    } = await axios.delete(url);
    console.log({ data });
  } catch (error) {
    console.log({ error: error.message });
  }
};
