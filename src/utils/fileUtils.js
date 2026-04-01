import { UPLOAD_CONFIG } from "../config/env";

/**
 * Validate file type
 * @param {File} file - File to validate
 * @returns {boolean} True if file type is allowed
 */
export const isValidFileType = (file) => {
  return UPLOAD_CONFIG.ALLOWED_TYPES.includes(file.type);
};

/**
 * Validate file size
 * @param {File} file - File to validate
 * @returns {boolean} True if file size is within limits
 */
export const isValidFileSize = (file) => {
  return file.size <= UPLOAD_CONFIG.MAX_FILE_SIZE;
};

/**
 * Validate file (type and size)
 * @param {File} file - File to validate
 * @returns {Object} Validation result with success flag and error message
 */
export const validateFile = (file) => {
  if (!file) {
    return { isValid: false, error: "No file provided" };
  }

  if (!isValidFileType(file)) {
    return {
      isValid: false,
      error: "Invalid file type. Please select an image file (JPEG, PNG, GIF)",
    };
  }

  if (!isValidFileSize(file)) {
    return {
      isValid: false,
      error: `File size too large. Maximum size is ${UPLOAD_CONFIG.MAX_FILE_SIZE_MB}MB`,
    };
  }

  return { isValid: true, error: null };
};

/**
 * Convert file to base64
 * @param {File} file - File to convert
 * @returns {Promise<string>} Base64 string
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
