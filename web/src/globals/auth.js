import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login_user = (userData) => {
    // Perform your login logic, e.g., set user data in state
    setUser(userData);
  };

  const logout_user = () => {
    // Perform your logout logic, e.g., clear user data from state
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