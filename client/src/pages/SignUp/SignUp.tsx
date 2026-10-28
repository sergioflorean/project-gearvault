import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
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

type SignUpResponse = {
  userId: string;
  email: string;
  name: string;
};

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      await apiRequest<SignUpResponse>("/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });

      navigate("/signin");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Could not create account.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Stack spacing={3}>
        <Typography component="h1" variant="h4">
          Create Account
        </Typography>

        <Typography color="text.secondary">
          Create your GearVault account.
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

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
              autoComplete="new-password"
              required
              slotProps={{ htmlInput: { minLength: 8 } }}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            {error && <Alert severity="error">{error}</Alert>}

            <Button type="submit" variant="contained" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </Stack>
        </Box>

        <Button
          component={Link}
          to="/signin"
          variant="text"
          sx={{ alignSelf: "flex-start", textTransform: "none" }}
        >
          Already have an account? Sign In
        </Button>
      </Stack>
    </Container>
  );
};

export default SignUp;
