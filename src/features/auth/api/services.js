// src/services/authService.js
import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

// Registro de usuario
export async function registerUser(userData) {
  const response = await axios.post(`${API_URL}/auth/register`, userData, {
    withCredentials: true,
  });
  return response.data;
}

// Login de usuario
export async function loginUser(credentials) {
  const response = await axios.post(`${API_URL}/auth/login`, credentials, {
    withCredentials: true,
  });

  // Si necesitas guardar el token:
  const { token } = response.data;
  localStorage.setItem("token", token);

  return response.data;
}
