import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/auth",
  withCredentials: true
});

export const login = (data) => API.post("/login", data);
export const signup = (data) => API.post("/register", data);
export const sendResetOtp = (data) => API.post("/forgot-password", data);
export const verifyOtp = (email, otp) =>
  API.post(`/verify-otp/${email}`, { otp });
export const resetPassword = (email, data) =>
  API.post(`/change-password/${email}`, data);
