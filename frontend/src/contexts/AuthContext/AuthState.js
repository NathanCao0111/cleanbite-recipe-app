import { useState } from "react";
import AuthContext from "./AuthContext";
import authAPI from "../../services/authAPI";

const AuthState = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    authInfo: {},
  });

  // 1. call API /me => userInfo
  // 2. Update auth state

  const handleLogin = async () => {
    try {
      const response = await authAPI.authInfo();
      const user = response.data.data;
      setAuth({
        isAuthenticated: true,
        authInfo: user,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
