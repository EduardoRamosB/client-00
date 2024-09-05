import { createContext, useContext, useMemo, ReactNode } from "react";
import { useLocalStorage } from "./useLocalStorage.ts";

interface AuthContextType {
  user_id: string | null;
  jwt: string | null;
  refresh_token: string | null;
  login: (data: { tokens: { access: string; refresh: string }; id: string }) => void;
  logout: () => void;
  forceLogout: (error: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user_id, setUserId] = useLocalStorage<string | null>("user_id", null);
  const [jwt, setJwt] = useLocalStorage<string | null>("jwt", null);
  const [refresh_token, setRefreshToken] = useLocalStorage<string | null>("refresh_token", null);

  const login = async (data: { tokens: { access: string; refresh: string }; id: string }) => {
    setJwt(data.tokens.access);
    setRefreshToken(data.tokens.refresh);
    setUserId(data.id);
  };

  const logout = () => {
    setUserId(null);
    setJwt(null);
    setRefreshToken(null);
  };

  const forceLogout = (error: any) => {
    if (error.response?.status === 401) {
      logout();
    }
  };

  const value = useMemo(
    () => ({
      user_id,
      jwt,
      refresh_token,
      login,
      logout,
      forceLogout,
    }),
    [user_id, jwt, refresh_token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
