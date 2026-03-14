import React, { createContext, useContext, useMemo, useState } from "react";
import { storage } from "../utils/storage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(storage.getUser());
  const [token, setToken] = useState(storage.getToken());

  const login = ({ token, user }) => {
    setToken(token);
    setUser(user);
    storage.setToken(token);
    storage.setUser(user);
  };

  const logout = () => {
    setToken("");
    setUser(null);
    storage.clearAll();
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!token,
      login,
      logout,
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);