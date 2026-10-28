import { createContext, useContext } from "react";

export type AuthUser = {
  userId: string;
  email: string;
  name: string;
};

export type AuthContextValue = {
  token: string | null;
  user: AuthUser | null;
  isLoading: boolean;
  sessionError: string | null;
  signIn: (token: string) => void;
  signOut: () => void;
};

export const CurrentUserContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const context = useContext(CurrentUserContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
