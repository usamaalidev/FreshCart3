import { createContext, useState } from "react";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  function logOut() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, logOut }}>
      {children}
    </UserContext.Provider>
  );
}
