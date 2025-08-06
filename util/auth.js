// utils/auth.js
import { jwtDecode } from "jwt-decode";

// Get user info from token
export const getUserFromToken = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return {
      userId: decoded.userId,
      email: decoded.email,
      name: decoded.name || decoded.email.split("@")[0], // Use name from token or extract from email
      isAdmin: decoded.isAdmin,
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// Check if current user is admin
export const isUserAdmin = () => {
  const user = getUserFromToken();
  console.log(user.isAdmin);
  return user?.isAdmin || false;
};

// Check if token is expired
export const isTokenExpired = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    return Date.now() >= decoded.exp * 1000;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};

// Get token for password reset
export const getTokenForPasswordReset = () => {
  const token = localStorage.getItem("resetToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
