import jwtDecode from "jwt-decode";

export const storeToken = (token) => {
  localStorage.setItem("token", token);
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  return jwtDecode(token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};
