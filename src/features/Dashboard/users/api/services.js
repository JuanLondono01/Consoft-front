import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL;
const usersUrl = `${API_URL}/Users`;

export async function getUsers() {
  const response = await axios.get(usersUrl, { withCredentials: true });
  return response.data.users || [];
}

export async function createUser(data) {
  const response = await axios.post(usersUrl, data, { withCredentials: true });
  return response.data;
}

export async function deleteUser(id) {
  const response = await axios.delete(`${usersUrl}/${id}`, { withCredentials: true });
  return response.data;
}

export async function getUserById(id) {
  const response = await axios.get(`${usersUrl}/${id}`, { withCredentials: true });
  return response.data.user;
}

export async function updateUser(id, data) {
  const response = await axios.put(`${usersUrl}/${id}`, data, { withCredentials: true });
  return response.data;
}
