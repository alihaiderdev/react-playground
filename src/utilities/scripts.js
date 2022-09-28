import axios from "axios";

export const create = async ({ url, fields }) => {
  try {
    const {
      data: { data },
    } = await axios.post(url, {
      data: JSON.stringify({ data: fields }),
    });
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
