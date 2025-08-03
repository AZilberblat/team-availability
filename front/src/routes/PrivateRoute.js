import { isTokenExpired } from '../utils/token';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');
  console.log('🔐 Token from storage:', token);

  const expired = token ? isTokenExpired(token) : true;
  console.log('⏰ Is token expired?', expired);

  if (!token || expired) {
    console.log('🚫 Removing token & redirecting');
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
