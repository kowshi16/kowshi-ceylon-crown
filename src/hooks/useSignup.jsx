import { useState, useEffect } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [countries, setCountries] = useState([]);
  const [isIddCodeFetched, setIsIddCodeFetched] = useState(false);
  const [countryValue, setCountryValue] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    api
      .getCountryList()
      .then((data) => {
        if (mounted) setCountries(data);
      })
      .catch((error) => {
        if (mounted) console.error("Failed to fetch countries:", error);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const fetchIddCode = async (country) => {
    if (!country) {
      setIsIddCodeFetched(false);
      return "";
    }
    try {
      const iddCode = await api.getIddCode(country);
      setIsIddCodeFetched(!!iddCode);
      return iddCode;
    } catch (error) {
      console.error("Failed to fetch IDD code:", error);
      return "";
    }
  };

  const handleCountryChange = (setValue, event) => {
    const selectedCountry = event.target.value;
    setCountryValue(selectedCountry);
    setValue("country", selectedCountry);
    fetchIddCode(selectedCountry).then((code) => {
      setValue("iddCode", code);
    });
  };

  const onSubmit = async (setValue, data) => {
    setSnackbarOpen(false);
    try {
      const mobileCheck = await api.validateMobileNumber(data);
      if (!mobileCheck.isSuccess) {
        setSnackbarMessage(mobileCheck.errorDescription || "Mobile number validation failed.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      const emailCheck = await api.validateEmail(data);
      if (!emailCheck.isSuccess) {
        setSnackbarMessage("Email address is already in use.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      const signupCheck = await api.register(data);
      if (!signupCheck.isSuccess) {
        setSnackbarMessage(
          signupCheck.errorDescription || "Signup failed. Please try again."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      } else {
        setSnackbarMessage("Signup successful! Please log in.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (error) {
      setSnackbarMessage(
        error?.response?.data?.message || "Something went wrong."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return {
    countries,
    isIddCodeFetched,
    countryValue,
    handleCountryChange,
    onSubmit,
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    handleSnackbarClose,
  };
};
