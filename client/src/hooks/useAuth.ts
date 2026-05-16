import { useState, useEffect } from "react";

export interface AuthUser {
  id: number;
  openId: string;
  email?: string | null;
  name?: string | null;
  role: "user" | "admin";
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 模拟获取认证状态
    const checkAuth = async () => {
      try {
        // 这里应该调用真实的 API 来检查用户认证状态
        // 暂时使用 localStorage 中的模拟数据
        const storedUser = localStorage.getItem("auth_user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem("auth_user");
    setUser(null);
    setIsAuthenticated(false);
  };

  const login = (userData: AuthUser) => {
    localStorage.setItem("auth_user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    logout,
    login,
  };
}
