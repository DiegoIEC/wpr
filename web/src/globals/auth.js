import axios from 'axios';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login_user = async (userData) => {
    // Perform your login logic, e.g., set user data in state
    setUser(userData);
    if (userData.role == "ED" || userData.role == "deskundige"){
        const response = await axios.get(`http://20.199.89.238:8088/api/deskundige/${userData.userId}`)
        .then(response => {
        const data = response.data
        console.log(data)
      })
      .catch(error => {
        console.log(error)
      });

    }
    else if (userData.role == "ORG"){
        
    }
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