import axios from "axios";
const API_BASE_URL = "/api/users";

//handle user registration
const register = async (regData) => {
  const response = await axios.post(API_BASE_URL + "/register", regData);

  return response.data;
};

//handle user login
const login = async (loginData) => {
  const response = await axios.post(API_BASE_URL + "/login", loginData);
  if (response.data) {
    const { id } = response.data.user;
    localStorage.setItem("token", JSON.stringify(response.data.token));
    localStorage.setItem("user", JSON.stringify({ id }));
  }

  return response.data;
};

//handle fetching user profile
const getUserProfile = async () => {
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(API_BASE_URL + "/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

//handle user profile update
const updateProfile = async (updateData) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.put(API_BASE_URL + "/profile", updateData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

//handle user logout
const logOut = async () => {
  return (() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  })();
};

const authServices = { register, login, getUserProfile, updateProfile, logOut };

export default authServices;
