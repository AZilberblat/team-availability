// src/utils/auth.js
export const saveAuthToLocalStorage = (token, username) => {
  localStorage.setItem('access_token', token);
  localStorage.setItem('username', username);
};

export const getUsername = () => localStorage.getItem('username');
export const getToken = () => localStorage.getItem('access_token');
export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('username');
};
