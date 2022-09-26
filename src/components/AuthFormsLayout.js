import React from "react";

const AuthFormsLayout = ({ title, submitHandler, children }) => {
  return (
    <section className="flex justify-center items-center h-full w-full">
      <div className="w-1/2 text-center shadow-xl shadow-zinc-400 rounded-lg p-5">
        <h4 className="m-0 font-black text-indigo-600 text-3xl">{title}</h4>
        <div className="mt-8">{children}</div>
        {/* <form
          onSubmit={submitHandler}
          autoComplete="off"
          autoCapitalize="off"
          className="mt-8"
        >
          {children}
          <div>
            <button
              type="submit"
              className="bg-indigo-600 py-3 px-8 text-white rounded-md ml-auto block"
            >
              {title}
            </button>
          </div>
        </form> */}
      </div>
    </section>
  );
};

export default AuthFormsLayout;
