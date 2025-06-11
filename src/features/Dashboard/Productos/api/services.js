import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL;
const productsUrl = `${API_URL}/Products`;

export async function getProducts() {
  const response = await axios.get(productsUrl, { withCredentials: true });
  return response.data.products || [];
}

export async function createProduct(data) {
  const response = await axios.post(productsUrl, data, { withCredentials: true });
  return response.data;
}

export async function deleteProduct(id) {
  const response = await axios.delete(`${productsUrl}/${id}`, { withCredentials: true });
  return response.data;
}

export async function getProductById(id) {
  const response = await axios.get(`${productsUrl}/${id}`, { withCredentials: true });
  return response.data.product;
}

export async function updateProduct(id, data) {
  const response = await axios.put(`${productsUrl}/${id}`, data, { withCredentials: true });
  return response.data;
}
