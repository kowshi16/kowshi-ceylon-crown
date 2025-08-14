import axios from "axios";

const createFormData = (data) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value || "");
  }
  return formData;
};

export const api = {
  login: (username, password) =>
    axios
      .post(
        "https://apis.mavicsoft.com/endpoints/ccc-hr-25-f/Login",
        createFormData({ username, password }),
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => res.data),

  getCountryList: () =>
    axios
      .get("https://apis.mavicsoft.com/endpoints/common/GetCountryList")
      .then((res) => res.data?.countryList || []),

  getIddCode: (country) => {
    const formData = new FormData();
    formData.append("country", country);
    return axios
      .post(
        "https://apis.mavicsoft.com/endpoints/common/GetCountryIDDCode",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => res.data?.countryCode || "");
  },

  validateMobileNumber: (data) =>
    axios
      .post(
        "https://apis.mavicsoft.com/endpoints/common/ValidateMobileNumber",
        createFormData({
          iddCode: data.iddCode,
          nationalNumber: data.nationalNumber,
          userName: "",
        }),
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => res.data),

  validateEmail: (data) =>
    axios
      .post(
        "https://apis.mavicsoft.com/endpoints/common/ValidateEmail",
        createFormData({ email: data.email }),
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => res.data),

  register: (data) =>
    axios
      .post(
        "https://apis.mavicsoft.com/endpoints/ccc-hr-25-f/Register",
        createFormData({
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName || "",
          country: data.country,
          iddCode: data.iddCode,
          nationalNumber: data.nationalNumber,
          email: data.email,
          password: data.password,
          confirmPassword: data.password,
        }),
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => res.data),

  getProfile: (username, token) =>
    axios
      .post(
        "https://apis.mavicsoft.com/endpoints/ccc-hr-25-f/GetProfile",
        createFormData({ username, token }),
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => res.data),

  updateProfileImage: (data) => {
    return axios
      .post(
        "https://apis.mavicsoft.com/endpoints/ccc-hr-25-f/UpdateProfileImage",
        createFormData({
          username: data.username,
          token: data.token,
          profileImage: data.profileImage,
        }),
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => res.data);
  },
};
