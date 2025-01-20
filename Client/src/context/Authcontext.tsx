import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../helpers/axiosApiToken';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState();
  const [token, setToken] = useState(localStorage.getItem('token'));
  // const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if token exists in localStorage when component mounts
    if (token) {
      setToken(token);
      fetchUser();
    } else {
      navigate('/login');
    }
    // type script ask me to add navigate to the dependency array
  }, [navigate, token]);

  async function fetchUser() {
    const res = await api.get('/users/getUser');
    console.log('res: ', res.data.user);
    setLoggedInUser(res.data.user);
  }

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};
