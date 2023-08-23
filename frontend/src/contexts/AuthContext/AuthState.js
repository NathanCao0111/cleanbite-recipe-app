import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import authService from "../../services/authService";

const AuthState = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    authInfo: {},
  });

  // 1. call API /me => userInfo
  // 2. Update auth state

  const handleLogin = async () => {
    try {
      const response = await authService.getMe();
      const user = response.data.data;
      if (response.status === 200) {
        setAuth({
          isAuthenticated: true,
          authInfo: user,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setAuth({
      isAuthenticated: false,
      authInfo: {},
    });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      handleLogin();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
