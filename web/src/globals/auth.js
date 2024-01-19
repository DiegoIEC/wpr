import { createContext, useContext, useState, useEffect} from 'react';

const setCookie = (name, value, options = {}) => {
  const { path = '/' } = options;
  const serializedValue = JSON.stringify(value);
  document.cookie = `${name}=${encodeURIComponent(serializedValue)}; path=${path}`;
};

const removeCookie = (name, options = {}) => {
  const { path = '/' } = options;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login_user = async (userData) => {
    userData.password = "";
    setUser(userData);
    setCookie("user", userData, { path: "/" });
    setLoading(false);
  };

  const logout_user = () => {
    setUser(null);
    removeCookie("user", { path: "/" });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login_user, logout_user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const getCookie = (name) => {
  const cookieArray = document.cookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
};