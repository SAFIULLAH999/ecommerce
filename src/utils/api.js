export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export async function apiFetch(path, options = {}) {
  const {
    method = 'GET',
    headers = {},
    body,
    auth = false,
  } = options;

  const token = localStorage.getItem('authToken');
  const finalHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };
  if (auth && token) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: finalHeaders,
    body,
  });

  let data = null;
  try {
    data = await response.json();
  } catch (_) {
    // ignore non-JSON responses
  }

  if (!response.ok) {
    const message = data?.message || data?.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

