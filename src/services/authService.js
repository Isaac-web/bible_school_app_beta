import jwtDecode from "jwt-decode";

export const storeToken = (token) => {
  localStorage.setItem("token", token);
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("token");

  if (token) return jwtDecode(token);

  return null;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const clear = () => {
  localStorage.clear();
};
