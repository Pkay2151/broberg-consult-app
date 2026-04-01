// Project status constants
export const PROJECT_STATUS = {
  APPROVED: "approved",
  PENDING: "pending",
  REJECTED: "rejected",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
};

// Dialog types
export const PROJECT_DIALOG_TYPES = {
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
  VIEW: "view",
};

// API endpoints
export const PROJECT_API_ENDPOINTS = {
  PROJECTS: "/projects",
  PROJECT_VIEW: "/projects/view",
  PROJECT_CREATE: "/projects/create",
  PROJECT_APPROVE: "/project/approve",
};

// File upload constraints for project images
export const PROJECT_FILE_CONSTRAINTS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB for project images
  ALLOWED_TYPES: [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ],
};

// Default images
export const PROJECT_DEFAULT_IMAGES = {
  PROJECT:
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
};

// Project priorities
export const PROJECT_PRIORITIES = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
};
