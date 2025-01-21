import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../helpers/axiosApiToken';
type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  loggedInUser: LoggedInUser | null;
};
type LoggedInUser = {
  name: string;
  lastName: string;
  userKeeps: string[];
  _id: string;
  email: string;
};
type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  // const [token, setToken] = useState(null);

  useEffect(() => {
    if (token) {
      setToken(token);
      localStorage.setItem('token', token);
      fetchUser();
    } else {
      setLoggedInUser(null);
      navigate('/login');
    }
  }, [token, navigate]);

  async function fetchUser() {
    try {
      const res = await api.get('/users/getUser');
      console.log('res user: ', res.data.user);
      setLoggedInUser(res.data.user);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  const login = (newToken: string) => {
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
