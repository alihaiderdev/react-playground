import { Spin } from "antd";
import React from "react";

const LoadingButton = ({
  title,
  handler,
  loading,
  style = "",
  size = "",
  ...rest
}) => {
  return (
    <button
      {...rest}
      onClick={handler}
      disabled={loading ? true : false}
      className={`capitalize bg-indigo-600 text-white text-xl font-semibold px-4 py-2 rounded-md ${style}`}
    >
      {loading && <Spin style={{ color: "#fff" }} size={size} />} {title}
    </button>
  );
};

export default LoadingButton;
