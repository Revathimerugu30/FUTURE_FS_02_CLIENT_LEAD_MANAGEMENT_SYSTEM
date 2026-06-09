import axios from 'axios';

const fallbackBackend = 'https://future-fs-02-client-lead-management.onrender.com/api';

const normalizeApiUrl = (url) => {
  if (!url) return '';
  const trimmed = url.replace(/\/+$|\s+/g, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed.replace(/\/+$/, '')}/api`;
};

const rawApiUrl = import.meta.env.VITE_API_URL;
const baseURL = rawApiUrl
  ? normalizeApiUrl(rawApiUrl)
  : import.meta.env.MODE === 'production'
  ? fallbackBackend
  : '/api';

if (!rawApiUrl && import.meta.env.MODE === 'production') {
  console.error(
    `VITE_API_URL is not set in production. Falling back to ${fallbackBackend}. Configure Vercel env vars to avoid this.`
  );
}

const API = axios.create({
  baseURL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('crm_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect to login on 401 for protected routes, NOT for login/register attempts
    // This allows AuthContext to handle login/auth errors with demo fallback
    if (error.response?.status === 401 && !error.config?.url?.includes('/auth/login') && !error.config?.url?.includes('/auth/register')) {
      localStorage.removeItem('crm_token');
      localStorage.removeItem('crm_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);
export const getMe = () => API.get('/auth/me');
export const updateProfile = (data) => API.put('/auth/profile', data);
export const updatePassword = (data) => API.put('/auth/password', data);

// Leads
export const getLeads = (params) => API.get('/leads', { params });
export const getLead = (id) => API.get(`/leads/${id}`);
export const createLead = (data) => API.post('/leads', data);
export const updateLead = (id, data) => API.put(`/leads/${id}`, data);
export const deleteLead = (id) => API.delete(`/leads/${id}`);
export const updateLeadStatus = (id, status) => API.patch(`/leads/status/${id}`, { status });
export const addNote = (id, data) => API.post(`/leads/${id}/notes`, data);
export const deleteNote = (id, noteId) => API.delete(`/leads/${id}/notes/${noteId}`);

// Analytics
export const getAnalytics = () => API.get('/leads/analytics');

export default API;
