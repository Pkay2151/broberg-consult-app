/**
 * Environment configuration utility
 * Provides centralized access to environment variables with fallbacks
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api",
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3001",
  TIMEOUT: 30000, // 30 seconds
};

// Application Configuration
export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || "Project Management System",
  VERSION: import.meta.env.VITE_APP_VERSION || "1.0.0",
  ENVIRONMENT: import.meta.env.VITE_NODE_ENV || "development",
};

// File Upload Configuration
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: parseInt(import.meta.env.VITE_MAX_FILE_SIZE) || 5242880, // 5MB
  ALLOWED_TYPES: import.meta.env.VITE_ALLOWED_FILE_TYPES?.split(",") || [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ],
  MAX_FILE_SIZE_MB: 5,
};

// Default Images
export const IMAGE_CONFIG = {
  DEFAULT_AVATAR:
    import.meta.env.VITE_DEFAULT_AVATAR_URL ||
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  DEFAULT_PROJECT:
    import.meta.env.VITE_DEFAULT_PROJECT_URL ||
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=200&fit=crop",
  DEFAULT_PLACEHOLDER:
    import.meta.env.VITE_DEFAULT_PLACEHOLDER_URL ||
    "https://via.placeholder.com/150x150?text=No+Image",
};

// Authentication Configuration
export const AUTH_CONFIG = {
  TOKEN_KEY: import.meta.env.VITE_TOKEN_STORAGE_KEY || "authToken",
  TOKEN_EXPIRES_HOURS: parseInt(import.meta.env.VITE_TOKEN_EXPIRES_HOURS) || 24,
};

// Debug Configuration
export const DEBUG_CONFIG = {
  ENABLED: import.meta.env.VITE_DEBUG_MODE === "true",
  CONSOLE_LOGS: import.meta.env.VITE_ENABLE_CONSOLE_LOGS === "true",
};

// Helper functions
export const isDevelopment = () => APP_CONFIG.ENVIRONMENT === "development";
export const isProduction = () => APP_CONFIG.ENVIRONMENT === "production";

// Debug logger that respects environment settings
export const debugLog = (...args) => {
  if (DEBUG_CONFIG.ENABLED && DEBUG_CONFIG.CONSOLE_LOGS) {
    console.log("[DEBUG]", ...args);
  }
};

export const debugError = (...args) => {
  if (DEBUG_CONFIG.ENABLED && DEBUG_CONFIG.CONSOLE_LOGS) {
    console.error("[DEBUG ERROR]", ...args);
  }
};

export const debugWarn = (...args) => {
  if (DEBUG_CONFIG.ENABLED && DEBUG_CONFIG.CONSOLE_LOGS) {
    console.warn("[DEBUG WARN]", ...args);
  }
};

// Validate required environment variables
export const validateEnvironment = () => {
  const requiredVars = ["VITE_API_BASE_URL", "VITE_BACKEND_URL"];

  const missing = requiredVars.filter((varName) => !import.meta.env[varName]);

  if (missing.length > 0) {
    console.warn("Missing environment variables:", missing);
    console.warn(
      "Using fallback values. Consider setting these in your .env file."
    );
  }

  debugLog("Environment Configuration:", {
    API_CONFIG,
    APP_CONFIG,
    UPLOAD_CONFIG,
    IMAGE_CONFIG,
    AUTH_CONFIG,
    DEBUG_CONFIG,
  });
};

// Initialize environment validation
validateEnvironment();
