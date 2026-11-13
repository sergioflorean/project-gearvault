import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Alert, Box, CircularProgress } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading, sessionError } = useAuth();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (sessionError) {
    return (
      <Box sx={{ maxWidth: 500, mx: "auto", p: 4 }}>
        <Alert severity="error">
          {sessionError} Please refresh the page to try again.
        </Alert>
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
