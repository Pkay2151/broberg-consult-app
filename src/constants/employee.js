// Employee status constants
export const EMPLOYEE_STATUS = {
  APPROVED: "approved",
  PENDING: "pending",
  REJECTED: "rejected",
};

// Dialog types
export const DIALOG_TYPES = {
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
};

// API endpoints
export const API_ENDPOINTS = {
  EMPLOYEES: "/employees",
  EMPLOYEE_VIEW: "/employees/view",
  EMPLOYEE_CREATE: "/employees/create",
  EMPLOYEE_APPROVE: "/employee/approve",
};

// File upload constraints
export const FILE_CONSTRAINTS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ["image/jpeg", "image/jpg", "image/png", "image/gif"],
};

// Default images
export const DEFAULT_IMAGES = {
  EMPLOYEE:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
};
