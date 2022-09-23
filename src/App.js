import { BrowserRouter, Route, Routes } from "react-router-dom";
// import ArtScreen from './screens/CreateArtScreen';
// import ArtsScreen from './screens/ArtsScreen';
// import CreateArtScreen from './screens/CreateArtScreen';
// import Art from './screens/Art';
// import Home from './screens/Home';
import SearchScreen from "./screens/SearchScreen";
import UsersScreen from "./screens/UsersScreen";
// import ChangePassword from './screens/Auth/ChangePassword';
// import Signup from './screens/Auth/Signup';
// import Login from './screens/Auth/Login';
// import axios from 'axios';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import QuestionsScreen from "./screens/QuestionsScreen";
import StrapiCrud from "./screens/StrapiCrud";
import { fetchQuestions } from "./store/Slices/questionsSlice";

const App = () => {
  // const { pathname } = useLocation();
  // console.log(pathname);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);

  // useEffect(() => {
  //   axios.defaults.baseURL = 'http://localhost:1337';
  //   axios.defaults.headers.post['Content-Type'] = 'application/json';
  //   const jwtToken = localStorage.getItem('jwt');
  //   if (jwtToken) {
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
  //   }
  // }, [localStorage.getItem('jwt')]);

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
      <Routes>
        {/* <Route
          path='/'
          element={
            <TodosContextProvider>
              <HomeScreen />
            </TodosContextProvider>
          }
        /> */}
        {/* 
        <Route path='/auth/register' element={<Signup />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/change-password' element={<ChangePassword />} />
        */}
        <Route path="/" element={<UsersScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/questions" element={<QuestionsScreen />} />
        {/* <Route path="/form" element={<FormScreen />} /> */}
        <Route path="/strapi" element={<StrapiCrud />} />

        {/* <Route path='/' element={<Home />} /> */}
        {/* <Route path='/' element={<CreateArtScreen />} /> */}
        {/* <Route path='/arts' element={<ArtsScreen />} />
        {/* <Route path='/art' element={<Art />} /> */}
        {/* <Route path='/arts/:artId' element={<ArtScreen />} />
         */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
