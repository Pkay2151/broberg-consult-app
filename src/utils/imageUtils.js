/**
 * Utility functions for handling image URLs and file operations
 */
import { API_CONFIG, IMAGE_CONFIG } from "../config/env";

/**
 * Constructs a proper image URL for display
 * Handles various imageUrl formats and ensures proper protocol
 * @param {string} imageUrl - The image URL from the backend
 * @param {string} fallback - Optional fallback image URL
 * @returns {string} - Properly formatted image URL
 */
export const getImageUrl = (imageUrl, fallback = null) => {
  // If no imageUrl provided, return fallback or null
  if (!imageUrl) {
    return fallback;
  }

  // If imageUrl already includes the full URL (starts with http), use as-is
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // If imageUrl starts with a slash, it's already properly formatted for backend
  if (imageUrl.startsWith("/")) {
    return `${API_CONFIG.BACKEND_URL}${imageUrl}`;
  }

  // If imageUrl doesn't start with a slash, add one
  return `${API_CONFIG.BACKEND_URL}/${imageUrl}`;
};

/**
 * Validates if an image URL is accessible
 * @param {string} imageUrl - The image URL to validate
 * @returns {Promise<boolean>} - True if image is accessible
 */
export const validateImageUrl = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.warn("Image validation failed:", error);
    return false;
  }
};

/**
 * Gets a default placeholder image URL
 * @param {string} type - Type of placeholder ('avatar', 'project', etc.)
 * @returns {string} - Placeholder image URL
 */
export const getPlaceholderImage = (type = "avatar") => {
  const placeholders = {
    avatar: IMAGE_CONFIG.DEFAULT_AVATAR,
    project: IMAGE_CONFIG.DEFAULT_PROJECT,
    default: IMAGE_CONFIG.DEFAULT_PLACEHOLDER,
  };

  return placeholders[type] || placeholders.default;
};

/**
 * Enhanced image URL getter with fallback to placeholder
 * @param {string} imageUrl - The image URL from the backend
 * @param {string} type - Type for placeholder selection
 * @returns {string} - Image URL or placeholder
 */
export const getImageUrlWithFallback = (imageUrl, type = "avatar") => {
  const properUrl = getImageUrl(imageUrl);
  return properUrl || getPlaceholderImage(type);
};
