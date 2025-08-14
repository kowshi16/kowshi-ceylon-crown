import { useState, useEffect } from "react";
import { api } from "../api/api";

export const useProfile = () => {
  const [user, setUser] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState("/image-placeholder.png");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const username = sessionStorage.getItem("username");
  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const data = await api.getProfile(username, token);
        setUser(data?.profile);
        if (data.profilePhoto) {
          setProfilePhoto(data.profilePhoto);
        }
      } catch (err) {
        setError("Failed to fetch profile details.");
        console.error("Profile fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [username, token]);

  const handleImageChange = async (event, setValue) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);

    try {
      const updatedData = await api.updateProfileImage(username, token, file);
      setProfilePhoto(URL.createObjectURL(file));
      setUser((prev) => ({
        ...prev,
        profilePhoto: updatedData.profilePhoto || profilePhoto,
      }));
      setValue("profilePhoto", updatedData.profilePhoto || profilePhoto); // Update form if needed
      setSnackbarMessage("Profie image updated successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage(
        err?.response?.data?.message || "Failed to update profile image."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return {
    user,
    profilePhoto,
    isLoading,
    isUploading,
    handleImageChange,
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    handleSnackbarClose,
  };
};
