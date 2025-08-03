// src/services/userService.js
import { getToken } from '../utils/auth';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const getUsers = async () => {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }

  return res.json();
};

export const updateUserStatus = async (username, status) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/users/${username}/status`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Status update failed');
  }

  return res.json();
};
