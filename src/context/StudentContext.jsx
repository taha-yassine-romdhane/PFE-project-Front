import {createContext, useContext, useState} from "react";
import ClienttApi from "../services/Api/ClientApi.js";

export const ClientStateContext = createContext({
  user: {},
  authenticated: false,
  setUser: () => {
  },
  logout: () => {
  },
  login: (email, password) => {
  },
  setAuthenticated: () => {
  },
  setToken: () => {
  },
})
export default function ClientContext({children}) {
  const [user, setUser] = useState({})
  const [authenticated, _setAuthenticated] = useState('true' === window.localStorage.getItem('AUTHENTICATED'))

  const login = async (email, password) => {
    return ClienttApi.login(email, password)
  }
  const logout = () => {
    setUser({})
    setAuthenticated(false)
  }

  const setAuthenticated = (isAuthenticated) => {
    _setAuthenticated(isAuthenticated)
    window.localStorage.setItem('AUTHENTICATED', isAuthenticated)
  }

  const setToken = (token) => {
    window.localStorage.setItem('token', token)
  }

  return <>
    <ClientStateContext.Provider value={{
      user,
      login,
      logout,
      setUser,
      authenticated,
      setAuthenticated,
      setToken
    }}>
      {children}
    </ClientStateContext.Provider>
  </>
}
export const useUserContext = () => useContext(ClientStateContext)
