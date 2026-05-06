import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    const { data } = await api.get("/auth/me");
    setUser(data.user);
    return data.user;
  };

  useEffect(() => {
    const bootstrapSession = async () => {
      try {
        await fetchCurrentUser();
      } catch {
        try {
          await api.post("/auth/refresh");
          await fetchCurrentUser();
        } catch {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    bootstrapSession();
  }, []);

  const register = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    setUser(data.user);
    toast.success(data.message || "Account created");
    return data.user;
  };

  const login = async (payload) => {
    const { data } = await api.post("/auth/login", payload);
    setUser(data.user);
    toast.success(data.message || "Welcome back");
    return data.user;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      toast.success("Logged out securely");
    } finally {
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === "admin",
      register,
      login,
      logout,
      refreshUser: fetchCurrentUser
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
