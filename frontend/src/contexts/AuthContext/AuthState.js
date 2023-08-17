import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    authInfo: {},
  });

  // 1. call API /me => userInfo
  // 2. Update auth state

  const handleLogin = async () => {
   try {

   } catch (error) {
    
   }
  }

  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
};

export default AuthState;
