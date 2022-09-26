import { Dropdown, Menu, Space } from "antd";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../context/CartContext";
import { authActions } from "../store/Slices/authSlice";

const Header = () => {
  const { openCart, cartQuantity } = useShoppingCart();
  const { user: auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [user] = useState(JSON.parse(localStorage.getItem("user")));

  const menu = useMemo(
    () => (
      <Menu
        items={[
          {
            label: <Link to="/dashboard">Dashboard</Link>,
            key: "0",
          },
          {
            type: "divider",
          },
          {
            label: (
              <span onClick={() => dispatch(authActions.logout())}>Logout</span>
            ),
            key: "2",
          },
        ]}
      />
    ),
    []
  );
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to={`/`}
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl text-indigo-600">AJ - Ecommerce</span>
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <Link to={`/products`} className="mr-5 hover:text-gray-900">
            Products
          </Link>
        </nav>

        {Object.keys(user || {})?.length > 0 ? (
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            placement="bottomLeft"
            className="mx-6"
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space className="capitalize text-indigo-600">
                {user?.user.username}
              </Space>
            </a>
          </Dropdown>
        ) : (
          <>
            <Link
              to={`/auth/register`}
              className="px-4 py-2 font-semibold rounded bg-indigo-600 text-white hover:text-white"
            >
              Register
            </Link>
            <Link
              to={`/auth/login`}
              className="mx-6 px-4 py-2 font-semibold rounded bg-indigo-600 text-white hover:text-white"
            >
              Login
            </Link>
          </>
        )}

        {/* <button className="mx-6 px-4 py-2 font-semibold rounded bg-indigo-600 text-white">
          Login
        </button> */}
        {cartQuantity ? (
          <button
            onClick={openCart}
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 text-base mt-4 md:mt-0 relative rounded-full w-12 h-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              fill="currentColor"
            >
              <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
            </svg>

            <div
              className="rounded-full bottom-0 right-0 bg-indigo-600 w-6 h-6 absolute text-white flex justify-center items-center text-sm"
              style={{
                transform: "translate(25%, 25%)",
              }}
            >
              {cartQuantity}
            </div>
          </button>
        ) : null}
      </div>
    </header>
  );
};

export default Header;