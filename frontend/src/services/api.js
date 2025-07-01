import axios from 'axios';

//const API_URL = 'http://localhost:5000/api';
const API_URL = 'https://real-trust-2dts.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

export async function fetchProjects() {
  const res = await api.get('/projects');
  return res.data;
}

export async function fetchClients() {
  const res = await api.get('/clients');
  return res.data;
}

export async function submitContact(data) {
  const res = await api.post('/contacts', data);
  return res.data;
}

export async function subscribeNewsletter(email) {
  const res = await api.post('/subscriptions', { email });
  return res.data;
}

export async function adminLogin(username, password) {
  const res = await api.post('/admin/login', { username, password });
  return res.data;
}

// Admin panel functions (require JWT)
export async function fetchAdminProjects(token) {
  const res = await api.get('/projects', { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
}
export async function addProject(data, token) {
  const res = await api.post('/projects', data, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
}
export async function deleteProject(id, token) {
  const res = await api.delete(`/projects/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
}
export async function fetchAdminClients(token) {
  const res = await api.get('/clients', { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
}
export async function addClient(data, token) {
  const res = await api.post('/clients', data, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
}
export async function deleteClient(id, token) {
  const res = await api.delete(`/clients/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
}
export async function fetchContacts(token) {
  const res = await api.get('/contacts', { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
}
export async function fetchSubscribers(token) {
  const res = await api.get('/subscriptions', { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
}

// Add more functions for admin panel as needed... 