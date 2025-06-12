import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL;
const rolesUrl = `${API_URL}/roles`;

console.log('API_URL:', API_URL);

export async function getRoles() {
    const response = await axios.get(rolesUrl, { withCredentials: true });
    return response.data.roles || [];
}

export async function createRole(data) {
    const response = await axios.post(rolesUrl, data, { withCredentials: true });
    return response.data;
}

export async function deleteRole(id) {
    const response = await axios.delete(`${rolesUrl}/${id}`, { withCredentials: true });    
    return response.data;
}

export async function getRoleById(id) {
    const response = await axios.get(`${rolesUrl}/${id}`, { withCredentials: true });
    return response.data.rol;
}

export async function updateRole(id, data) {
    const response = await axios.put(`${rolesUrl}/${id}`, data, { withCredentials: true });
    return response.data;
}
