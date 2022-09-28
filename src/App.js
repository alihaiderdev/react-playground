import axios from "axios";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { constant } from "./constants";
import { useAuthAndCartContext } from "./context";
import Login from "./screens/Auth/Login";
import Signup from "./screens/Auth/Signup";
import Dashboard from "./screens/Dashboard";
import PageNotFound from "./screens/PageNotFound";
import Product from "./screens/Product";
import Products from "./screens/Products";
import AuthVerify from "./utilities";

const App = () => {
  // const { pathname } = useLocation();

  const { logout, user } = useAuthAndCartContext();

  // useEffect(() => {
  //   if (Object.keys(user || {}).length > 0) {
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${user?.jwt}`;
  //   }
  // }, [Object.keys(user || {}).length]);

  axios.defaults.baseURL = constant.SERVER_BASE_URL;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  axios.interceptors.request.use(
    (request) => {
      // Do something before request is sent

      const methods = ["post", "put", "delete"];

      if (methods.includes(request.method)) {
        request.headers = {
          ...request.headers,
          Authorization: `Bearer ${constant.TOKEN}`,
        };
      }

      return request;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // axios.interceptors.response.use(
  //   (response) => {
  //     // Any status code that lie within the range of 2xx cause this function to trigger
  //     console.log({ response });
  //     return response;
  //   },
  //   (error) => {
  //     // Any status codes that falls outside the range of 2xx cause this function to trigger
  //     return Promise.reject(error);
  //   }
  // );

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<Products />} />
          <Route path="/auth/register" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute Component={Dashboard} />}
          />
          <Route path="/products/:id" element={<Product />} />

          {/* if user go to any route from URl that does not exists then its your choice either show him a 404 not found page or simply redirect to website home page  */}
          <Route path="*" element={<PageNotFound />} />

          {/* OR  */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
        <AuthVerify logout={logout} />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
