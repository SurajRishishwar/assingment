import { createContext, useContext, useState } from "react";

const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const tokenFromLocalStorage = localStorage.getItem("token");
  const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  const [token, setToken] = useState(tokenFromLocalStorage);
  const [user, setUser] = useState(userFromLocalStorage ?? {});
  const [authLoading, setAuthLoading] = useState(false);

  const loginUser = async (credential) => {
    try {
      setAuthLoading(true);
      const res = await fetch(
        "https://videorecorder-backend-api.onrender.com/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credential),
        }
      );
      const { username, email, id, token } = await res.json();
      setToken(token);
      setUser({ username, email, id });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ username, email, id }));
    } catch (error) {
      console.error(error);
    } finally {
      setAuthLoading(false);
    }
  };

  const logoutUser = () => {
    setToken("");
    setUser({});
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <authContext.Provider
      value={{
        loginUser,
        token,
        user,
        authLoading,
        setToken,
        setUser,
        logoutUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
