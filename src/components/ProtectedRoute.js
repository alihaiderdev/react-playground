import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthAndCartContext } from '../context';

// https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c
// export const ProtectedRoute = ({ Component }) => {
//   const [user, _] = useState(JSON.parse(localStorage.getItem('user')));
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!Object.keys(user || {}).length > 0) {
//       navigate(`/auth/login`);
//     }
//   }, []);

//   return <Component />;
// };

// better approach
export const ProtectedRoutes = () => {
  const { user } = useAuthAndCartContext();

  return Object.keys(user || {}).length > 0 ? (
    <Outlet />
  ) : (
    <Navigate to='/auth/login' />
  );
};
