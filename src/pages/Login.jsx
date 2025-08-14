import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useLogin";

// ✅ Validation schema
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const {
    onSubmit,
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    handleSnackbarClose,
  } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Container maxWidth="sm">
        <Paper elevation={3} className="p-6 sm:p-8 rounded-2xl">
          <Box className="flex flex-col items-center">
            {/* Logo icon */}
            <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
              <LockOutlined />
            </Avatar>

            {/* Heading */}
            <Typography
              component="h1"
              variant="h5"
              className="text-center font-semibold text-gray-900"
            >
              Sign in to your account
            </Typography>

            {/* Form */}
            <Box
              component="form"
              onSubmit={handleSubmit((data) =>
                onSubmit(data.username, data.password)
              )}
              noValidate
              className="mt-6 w-full"
              sx={{ "& .MuiTextField-root": { mb: 2 } }}
            >
              {/* Username */}
              <TextField
                label="Username"
                type="text"
                fullWidth
                autoComplete="username"
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
              />

              {/* Password */}
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                autoComplete="current-password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((s) => !s)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {/* Submit button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={22} /> : "Sign In"}
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-gray-400 text-sm">or</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Signup link */}
              <Typography variant="body2" className="text-center">
                Don’t have an account?{" "}
                <Link href="/signup" underline="hover">
                  Create one
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
