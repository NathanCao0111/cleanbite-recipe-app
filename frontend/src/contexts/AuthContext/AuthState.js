import { message } from "antd";
import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import authService from "../../services/authService";

const AuthState = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: {},
  });

  // 1. call API /me => userInfo
  // 2. Update auth state

  const fetchCurrentUser = async () => {
    try {
      const response = await authService.getMe();
      const user = response.data.data;
      setAuth({
        isAuthenticated: true,
        user: user,
      });
    } catch (error) {
      // message.error(error?.response?.data?.message || "Error");
    }
  };

  const handleLogin = async () => {
    await fetchCurrentUser();
  };

  const handleLogout = () => {
    setAuth({
      isAuthenticated: false,
      user: {},
    });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      fetchCurrentUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, fetchCurrentUser, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
