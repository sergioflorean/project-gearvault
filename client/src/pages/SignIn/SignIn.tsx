import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { apiRequest } from "../../utils/api";

type SignInResponse = {
  token: string;
  user: {
    userId: string;
    email: string;
    name: string;
  };
};

const SignIn = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const data = await apiRequest<SignInResponse>("/signin", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      signIn(data.token);

      navigate("/my-collection");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Stack spacing={3}>
        <Typography component="h1" variant="h4">
          Sign In
        </Typography>

        <Typography color="text.secondary">
          Sign in to manage your GearVault collection.
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            {error && <Alert severity="error">{error}</Alert>}

            <Button type="submit" variant="contained" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default SignIn;
