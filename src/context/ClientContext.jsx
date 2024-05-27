import { createContext, useContext, useState, useEffect } from "react";
import UserApi from "../services/Api/UserApi.js";

export const ClientStateContext = createContext({
  user: {},
  isAdmin: false,
  authenticated: false,
  setUser: () => {},
  logout: () => {},
  login: (email, password) => {},
  checkAuth: () => {},
  setAuthenticated: () => {},
  setToken: () => {},
});

export default function ClientContext({ children }) {
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [authenticated, _setAuthenticated] = useState(
    "true" === window.localStorage.getItem("AUTHENTICATED")
  );

  useEffect(() => {
    if (authenticated) {
      checkAuth();
    }
  }, [authenticated]);

  const login = async (email, password) => {
    return UserApi.login(email, password);
  };

  const logout = () => {
    setUser({});
    setIsAdmin(false);
    setAuthenticated(false);
  };

  const setAuthenticated = (isAuthenticated) => {
    _setAuthenticated(isAuthenticated);
    window.localStorage.setItem("AUTHENTICATED", isAuthenticated);
  };

  const setToken = (token) => {
    window.localStorage.setItem("token", token);
  };

  const checkAuth = async () => {
    try {
      const { data } = await UserApi.getUserInfo();
      setUser(data);
      setIsAdmin(data.role === 'admin');
      setAuthenticated(true);
    } catch (error) {
      console.error("Error checking authentication status:", error);
      setAuthenticated(false);
    }
  };

  return (
    <ClientStateContext.Provider
      value={{
        user,
        isAdmin,
        login,
        logout,
        setUser,
        authenticated,
        setAuthenticated,
        setToken,
        checkAuth,
      }}
    >
      {children}
    </ClientStateContext.Provider>
  );
}

export const useUserContext = () => useContext(ClientStateContext);
