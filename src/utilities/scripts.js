import axios from "axios";
import { constant } from "../constants";

export const config = {
  headers: {
    Authorization: `Bearer ${constant.TOKEN}`,
  },
};

export const create = async ({ url, fields }) => {
  try {
    const {
      data: { data },
    } = await axios.post(url, {
      headers: {
        Authorization: `Bearer ${constant.TOKEN}`,
      },
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
