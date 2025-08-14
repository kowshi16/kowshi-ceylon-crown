import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  const onSubmit = async (username, password) => {
    setSnackbarOpen(false);

    try {
      const response = await api.login(username, password);
      if (response.isSuccess) {
        setSnackbarMessage("Login successful!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setTimeout(() => navigate("/profile"), 1000);
        if (response.accessToken) {
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("accessToken", response.accessToken);
        }
      } else {
        setSnackbarMessage(
          response?.errorDescription || "Invalid username or password."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (err) {
      setSnackbarMessage(
        response?.errorDescription ||
          "Something went wrong during login. Please try again."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return {
    onSubmit,
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    handleSnackbarClose,
  };
};
