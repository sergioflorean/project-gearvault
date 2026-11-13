import { useEffect, useState, type ReactNode } from "react";
import { ApiError, apiRequest } from "../utils/api";
import { CurrentUserContext, type AuthUser } from "./AuthContext";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("gearvault_token"),
  );

  const [user, setUser] = useState<AuthUser | null>(null);

  const [isLoading, setIsLoading] = useState(() =>
    Boolean(localStorage.getItem("gearvault_token")),
  );

  const [sessionError, setSessionError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    let isActive = true;

    const validateSession = async () => {
      try {
        const data = await apiRequest<{ user: AuthUser }>(
          "/users/me",
          {},
          token,
        );

        if (isActive) {
          setUser(data.user);
          setSessionError(null);
        }
      } catch (err: unknown) {
        if (!isActive) return;

        if (
          err instanceof ApiError &&
          (err.status === 401 || err.status === 404)
        ) {
          localStorage.removeItem("gearvault_token");
          setToken(null);
          setUser(null);
          setSessionError(null);
        } else {
          setUser(null);
          setSessionError("Could not verify your session.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void validateSession();

    return () => {
      isActive = false;
    };
  }, [token]);

  const signIn = (newToken: string) => {
    localStorage.setItem("gearvault_token", newToken);
    setUser(null);
    setSessionError(null);
    setIsLoading(true);
    setToken(newToken);
  };

  const signOut = () => {
    localStorage.removeItem("gearvault_token");
    setToken(null);
    setUser(null);
    setSessionError(null);
    setIsLoading(false);
  };

  return (
    <CurrentUserContext.Provider
      value={{ token, user, isLoading, sessionError, signIn, signOut }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default AuthProvider;
