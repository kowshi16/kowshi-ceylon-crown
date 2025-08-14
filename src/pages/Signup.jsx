import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  Box,
  Link,
  Avatar,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "../hooks/useSignup";

// Define the validation schema
const signupSchema = z.object({
  username: z.string().min(1, "Username is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  iddCode: z.string().min(1, "IDD code is required"),
  nationalNumber: z.string().min(1, "National number is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Signup() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      country: "",
      iddCode: "",
      nationalNumber: "",
      email: "",
      password: "",
    },
  });

  const {
    countries,
    isIddCodeFetched,
    countryValue,
    handleCountryChange,
    onSubmit,
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    handleSnackbarClose,
  } = useSignup();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
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
            <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
              <LockOutlined />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              className="text-center font-semibold text-gray-900"
            >
              Sign up to your account
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit((data) => onSubmit(setValue, data))}
              noValidate
              className="mt-6 w-full"
              sx={{ "& .MuiTextField-root": { mb: 2 } }}
            >
              <TextField
                label="Username"
                fullWidth
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
              <TextField
                label="First Name"
                fullWidth
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
              <TextField
                label="Last Name"
                fullWidth
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
              <TextField
                label="Country"
                select
                fullWidth
                value={countryValue}
                onChange={(e) => handleCountryChange(setValue, e)}
                error={!!errors.country}
                helperText={errors.country?.message}
              >
                {countries.map((c) => (
                  <MenuItem key={c.code} value={c.country}>
                    {c.country}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label={isIddCodeFetched ? "" : "IDD Code"}
                fullWidth
                {...register("iddCode")}
                error={!!errors.iddCode}
                helperText={errors.iddCode?.message}
                disabled={true}
              />
              <TextField
                label="National Number"
                fullWidth
                {...register("nationalNumber")}
                error={!!errors.nationalNumber}
                helperText={errors.nationalNumber?.message}
              />
              <TextField
                label="Email"
                type="email"
                fullWidth
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
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
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={22} /> : "Sign Up"}
              </Button>
              <div className="flex items-center gap-3 my-4">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-gray-400 text-sm">or</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
              <Typography variant="body2" className="text-center">
                Have an account?{" "}
                <Link href="/login" underline="hover">
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
