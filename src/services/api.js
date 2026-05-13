import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const API = `${backendUrl}/api`;

const api = axios.create({
  baseURL: API,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const registerUser = (data) =>
  api.post("/auth/register", data);

export const verifyOtp = (data) =>
  api.post("/auth/verify-otp", data);

export const loginUser = (data) =>
  api.post("/auth/login", data);

export const forgotPassword = (email) =>
  api.post("/auth/forgot-password", { email });

export const resetPassword = (data) =>
  api.post("/auth/reset-password", data);

export const getDashboard = () =>
  api.get("/auth/me");

export const generateApiKey = () =>
  api.post("/auth/generate-key");

export const getCredits = () =>
  api.get("/auth/credits");

export const createPolicy = (data) =>
  api.post("/policy/create", data);

export const getPolicies = () =>
  api.get("/policy/my");

export const updatePolicy = (id, data) =>
  api.put(`/policy/${id}`, data);

export const deletePolicy = (id) =>
  api.delete(`/policy/${id}`);

export const getLogs = () =>
  api.get("/logs");

export const deleteLog = (id) =>
  api.delete(`/logs/${id}`);