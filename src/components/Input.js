import { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const Input = ({ type, name, value, handler, isLabel = true }) => {
  const [eyeToggler, setEyeToggler] = useState(false);
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
          id={name}
          type={eyeToggler ? "text" : type}
          name={name}
          placeholder={`Enter your ${name}`}
          className="m-0 rounded-md px-2 py-3 border-solid border-2 border-indigo-600 outline-none w-full"
          required
          value={value}
          onChange={handler}
          autoComplete="off"
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
