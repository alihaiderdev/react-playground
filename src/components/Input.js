import { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";

const Input = ({
  type,
  name,
  value,
  handler,
  isLabel = true,
  ...restProps
}) => {
  const [eyeToggler, setEyeToggler] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="mb-4">
      {isLabel && (
        <label
          className="m-0 text-lg capitalize font-black text-indigo-600 text-left block"
          htmlFor={name}
        >
          {name}:{" "}
        </label>
      )}
      <div className="relative">
        <input
          disabled={
            (name === "username" || name === "email") &&
            pathname !== "/auth/register"
              ? true
              : false
          }
          id={name}
          type={eyeToggler ? "text" : type}
          name={name}
          placeholder={`Enter your ${name}`}
          className="m-0 rounded-md px-2 py-3 border-solid border-2 border-indigo-600 outline-none w-full"
          required
          value={value}
          onChange={handler}
          autoComplete="off"
          {...restProps}
        />
        {type === "password" ? (
          eyeToggler ? (
            <BsEyeFill
              className="text-3xl text-indigo-600 absolute top-3 right-3 cursor-pointer"
              onClick={() => setEyeToggler(!eyeToggler)}
            />
          ) : (
            <BsEyeSlashFill
              className="text-3xl text-indigo-600 absolute top-3 right-3 cursor-pointer"
              onClick={() => setEyeToggler(!eyeToggler)}
            />
          )
        ) : null}
      </div>
    </div>
  );
};
export default Input;
