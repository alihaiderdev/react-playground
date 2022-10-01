import { Spin } from "antd";

const Spinner = ({ size = "large" }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spin size={size} />
    </div>
  );
};

export default Spinner;
