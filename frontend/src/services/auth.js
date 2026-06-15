import api from './api';

/**
 * Maps the backend user role to the frontend expected role.
 * Backend standard user role: 'user' -> mapped to 'customer'
 * Backend admin role: 'admin' -> remains 'admin'
 */
export function mapBackendUserToFrontend(backendUser, token) {
  return {
    id: backendUser.id,
    nama: backendUser.nama,
    email: backendUser.email,
    role: backendUser.role === 'user' ? 'customer' : backendUser.role,
    token: token,
  };
}

export async function login(email, password) {
  const response = await api.post('/auth/login', { email, password });
  const { user, token } = response.data;
  return mapBackendUserToFrontend(user, token);
}

export async function register(nama, email, password) {
  const response = await api.post('/auth/register', { nama, email, password });
  return response.data;
}
