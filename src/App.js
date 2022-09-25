import { BrowserRouter, Route, Routes } from "react-router-dom";
// import ArtScreen from './screens/CreateArtScreen';
// import ArtsScreen from './screens/ArtsScreen';
// import CreateArtScreen from './screens/CreateArtScreen';
// import Art from './screens/Art';
// import Home from './screens/Home';
import SearchScreen from "./screens/SearchScreen";
import UsersScreen from "./screens/UsersScreen";
// import ChangePassword from './screens/Auth/ChangePassword';
import axios from "axios";
import { useEffect } from "react";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./screens/Auth/Login";
import Signup from "./screens/Auth/Signup";
import Dashboard from "./screens/Dashboard";
import PageNotFound from "./screens/PageNotFound";
import Product from "./screens/Product";
import Products from "./screens/Products";
import QuestionsScreen from "./screens/QuestionsScreen";
import StrapiCrud from "./screens/StrapiCrud";

const App = () => {
  // const { pathname } = useLocation();
  // console.log(pathname);
  // const dispatch = useDispatch();

  useEffect(() => {}, [localStorage.getItem("random")]);

  // useEffect(() => {
  //   const jwtToken = localStorage.getItem("jwt");
  //   if (jwtToken) {
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  //   }
  // }, [localStorage.getItem("jwt")]);

  axios.defaults.baseURL =
    process.env.REACT_APP_SERVER_URL || "http://localhost:1337";
  axios.defaults.headers.post["Content-Type"] = "application/json";

  return (
    <BrowserRouter>
      {/* <nav className='header'>
        <ul>
          <li>
            <NavLink to={'/'}>Home</NavLink>
          </li>
          <li>
            <NavLink to={'/questions'}>Questions</NavLink>
          </li>
          <li>
            <NavLink to={'/auth/register'}>Signup</NavLink>
          </li>
          <li>
            <NavLink to={'/auth/login'}>Login</NavLink>
          </li>
          <li>
            <NavLink to={'/form'}>Form</NavLink>
          </li>
          <li>
            <NavLink to={'/users'}>Users</NavLink>
          </li>

          <li>
            <NavLink to={'/arts'}>Arts</NavLink>
          </li>

          <li>
            <NavLink to={'/form'}>Form</NavLink>
          </li>
        </ul>
      </nav> */}

      <Layout>
        <Routes>
          {/* <Route
          path='/'
          element={
            <TodosContextProvider>
              <HomeScreen />
            </TodosContextProvider>
          }
        /> */}
          {/* <Route path="/auth/change-password" element={<ChangePassword />} />
          <Route path="/form" element={<FormScreen />} />
          <Route path="/" element={<Home />} />
          <Route path="/" element={<CreateArtScreen />} />
          <Route path="/arts" element={<ArtsScreen />} />
          <Route path="/art" element={<Art />} />
          <Route path="/arts/:artId" element={<ArtScreen />} /> */}

          <Route path="/auth/register" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />

          <Route path="/" element={<UsersScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/questions" element={<QuestionsScreen />} />
          <Route path="/strapi" element={<StrapiCrud />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute Component={Dashboard} />}
          />
          <Route path="/products/:id" element={<Product />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
