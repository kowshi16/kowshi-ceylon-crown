import {
  Alert,
  Avatar,
  Button,
  CircularProgress,
  Container,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Public as PublicIcon,
  Phone as PhoneIcon,
  Badge as BadgeIcon,
} from "@mui/icons-material";
import { useProfile } from "../hooks/useProfile";

export default function ProfileView() {
  const username = sessionStorage.getItem("username");
  const token = sessionStorage.getItem("accessToken");

  const {
    user,
    profilePhoto,
    isUploading,
    handleImageChange,
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    handleSnackbarClose,
  } = useProfile(username, token);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-100 p-4">
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
      <Container maxWidth="md">
        <Paper
          elevation={6}
          className="rounded-2xl overflow-hidden shadow-xl flex flex-col lg:flex-row"
        >
          {/* Left: Profile Photo */}
          <div className="lg:w-1/3 bg-gradient-to-b from-blue-600 to-blue-800 flex flex-col items-center justify-center p-8 relative">
            <Avatar
              src={profilePhoto}
              sx={{ width: 140, height: 140 }}
              className="border-4 border-white shadow-lg"
            />
            <label className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600 transition">
              {isUploading ? "Uploading..." : "Change Photo"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <Typography variant="body2" className="text-white mt-2 opacity-75">
              PNG/JPG up to 5MB
            </Typography>
          </div>

          {/* Right: Profile Details */}
          <div className="lg:w-2/3 p-8 bg-white/70 backdrop-blur-md">
            <Typography
              variant="h4"
              className="font-semibold text-gray-800 mb-6"
            >
              My Profile
            </Typography>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <PersonIcon className="text-blue-500" />
                <Typography className="font-medium text-gray-800">
                  {username || "-"}
                </Typography>
              </div>

              <div className="flex items-center gap-3">
                <BadgeIcon className="text-blue-500" />
                <Typography className="font-medium text-gray-800">
                  {user?.firstName || "-"}{" "}
                  {user?.lastName === "n/a" ? "" : user?.lastName}
                </Typography>
              </div>

              <div className="flex items-center gap-3">
                <PublicIcon className="text-blue-500" />
                <Typography className="font-medium text-gray-800">
                  {user?.country || "-"}
                </Typography>
              </div>

              <div className="flex items-center gap-3">
                <PhoneIcon className="text-blue-500" />
                <Typography className="font-medium text-gray-800">
                  {user?.mobileNumber || "-"}
                </Typography>
              </div>

              <div className="flex items-center gap-3">
                <EmailIcon className="text-blue-500" />
                <Typography className="font-medium text-gray-800">
                  {user?.email || "-"}
                </Typography>
              </div>
            </div>

            {/* Save Button */}
            <Button
              variant="contained"
              size="large"
              className="mt-8 bg-blue-600 hover:bg-blue-700"
              fullWidth
              disabled={isUploading}
            >
              {isUploading ? (
                <CircularProgress size={22} sx={{ color: "white" }} />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </Paper>
      </Container>
    </div>
  );
}
