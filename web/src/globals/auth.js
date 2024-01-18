import { createContext, useContext, useState, useEffect} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log(JSON.parse(storedUser));
      setUser(storedUser);
    }
    
  }, []);

  const login_user = async (userData) => {
    setUser(userData);
  };

  const logout_user = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login_user, logout_user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};