// API Configuration
import {
  API_CONFIG,
  AUTH_CONFIG,
  debugLog,
  debugError,
} from "../src/config/env";
import { toast } from "react-toastify";

let API_BASE_URL = API_CONFIG.BASE_URL;

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }
  return data;
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    ...options,
  };

  // Only set Content-Type for JSON data, not for FormData
  if (!(options.body instanceof FormData)) {
    config.headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };
  } else {
    // For FormData, don't set Content-Type, let browser handle it
    config.headers = {
      ...options.headers,
    };
  }

  // Add authorization token if available
  const token = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    debugLog(`API Request: ${endpoint}`, config);
    const response = await fetch(url, config);
    const result = await handleResponse(response);
    debugLog(`API Response: ${endpoint}`, result);
    return result;
  } catch (error) {
    debugError(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// Authentication API calls
export const authAPI = {
  // Register user
  register: async (userData) => {
    try {
      const result = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      });
      toast.success("Registration successful!");
      return result;
    } catch (error) {
      toast.error(error.message || "Registration failed");
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

     

      // Store token if login successful - check multiple possible token property names
      const token = data.token || data.accessToken || data.authToken;
      if (token) {
        localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, token);
        debugLog("Token stored successfully:", token);
        toast.success("Login successful!");
      } else {
        console.warn(
          "No token found in response. Response keys:",
          Object.keys(data)
        );
        toast.warning("Login successful but no token received");
      }

      return data;
    } catch (error) {
      toast.error(error.message || "Login failed");
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      await apiRequest("/auth/logout", {
        method: "POST",
      });
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    } finally {
      // Always remove token from localStorage
      localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    return await apiRequest("/auth/change-password", {
      method: "POST",
      body: JSON.stringify(passwordData),
    });
  },

  // Forgot password
  forgotPassword: async (email) => {
    return await apiRequest("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  // Reset password
  resetPassword: async (resetData) => {
    try {
      const result = await apiRequest("/auth/reset-password", {
        method: "PUT",
        body: JSON.stringify(resetData),
      });
      toast.success("Password reset successful!");
      return result;
    } catch (error) {
      toast.error(error.message || "Password reset failed");
      throw error;
    }
  },
};

// Projects API calls
export const projectsAPI = {
  // Get all projects
  getAllproject: async () => {
    return await apiRequest("/projects/view");
  },

  // Get project by ID
  getProjectById: async (id) => {
    return await apiRequest(`/projects/${id}`);
  },

  // Create new project
  createproject: async (projectData) => {
    try {
    
      // Check if this is FormData (for file uploads) or regular object
      if (projectData instanceof FormData) {
        const result = await apiRequest("/projects/create", {
          method: "POST",
          headers: {}, // Don't set Content-Type for FormData - let browser set it
          body: projectData,
        });
        
        return result;
      } else {
        
        const result = await apiRequest("/projects/create", {
          method: "POST",
          body: JSON.stringify(projectData),
        });
      
        return result;
      }
    } catch (error) {
      console.error("Failed to create project:", error); // Debug log
      toast.error(error.message || "Failed to create project");
      throw error;
    }
  },

  // Update project
  update: async (id, projectData) => {
    try {
     
      // Check if this is FormData (for file uploads) or regular object
      if (projectData instanceof FormData) {
        const result = await apiRequest(`/projects/update/${id}`, {
          method: "PUT",
          headers: {}, // Don't set Content-Type for FormData - let browser set it
          body: projectData,
        });

        return result;
      } else {
      
        const result = await apiRequest(`/projects/update/${id}`, {
          method: "PUT",
          body: JSON.stringify(projectData),
        });
       
        return result;
      }
    } catch (error) {
      console.error("Failed to update project:", error); // Debug log
      toast.error(error.message || "Failed to update project");
      throw error;
    }
  },

  // Delete project
  delete: async (id) => {
    return await apiRequest(`/projects/${id}`, {
      method: "DELETE",
    });
  },

  // Approve project changes
  approveProjectChanges: async (projectId) => {
    try {
      const result = await apiRequest(`/projects/approve/${projectId}`, {
        method: "PATCH",
      });
      toast.success("Project changes approved!");
      return result;
    } catch (error) {
      toast.error(error.message || "Failed to approve project changes");
      throw error;
    }
  },
};

// File upload API calls
export const uploadAPI = {
  // Upload single file
  uploadFile: async (file, folder = "uploads") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    return await apiRequest("/upload", {
      method: "POST",
      headers: {}, // Don't set Content-Type for FormData
      body: formData,
    });
  },

  // Upload multiple files
  uploadFiles: async (files, folder = "uploads") => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append(`files`, file);
    });
    formData.append("folder", folder);

    return await apiRequest("/upload/multiple", {
      method: "POST",
      headers: {}, // Don't set Content-Type for FormData
      body: formData,
    });
  },

  // Delete file
  deleteFile: async (fileId) => {
    return await apiRequest(`/upload/${fileId}`, {
      method: "DELETE",
    });
  },
};

// // Admin API calls
// export const adminAPI = {
//   // Get dashboard stats
//   getDashboardStats: async () => {
//     return await apiRequest("/admin/dashboard");
//   },

//   // Get all users
//   getUsers: async () => {
//     return await apiRequest("/admin/users");
//   },

//   // Update user role
//   updateUserRole: async (userId, role) => {
//     return await apiRequest(`/admin/users/${userId}/role`, {
//       method: "PATCH",
//       body: JSON.stringify({ role }),
//     });
//   },

//   // Delete user
//   deleteUser: async (userId) => {
//     return await apiRequest(`/admin/users/${userId}`, {
//       method: "DELETE",
//     });
//   },
// };

// Utility functions
export const apiUtils = {
  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
    debugLog("Checking authentication, token:", token ? "exists" : "not found");
    return !!token;
  },

  // Get stored token
  getToken: () => {
    const token = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
    debugLog(
      "Getting token:",
      token ? `Found: ${token.substring(0, 20)}...` : "Not found"
    );
    return token;
  },

  // Clear all stored data
  clearAuth: () => {
    localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
    debugLog("Auth token cleared from localStorage");
  },

  // Set API base URL (for different environments)
  setBaseURL: (url) => {
    API_BASE_URL = url;
  },

  // Debug localStorage
  debugLocalStorage: () => {
    debugLog("All localStorage items:");
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      debugLog(`${key}: ${value}`);
    }
  },
};

export const pendingAPI = {
  // Get pending project approvals
  getPendingApprovals: async () => {
    return await apiRequest("/pending-approvals");
  },
  activeEmployees: async () => {
    return await apiRequest("/employees/active-employees");
  },
  totalProjects: async () => {
    return await apiRequest("/projects/total");
  },
};

// User submissions API (for non-admin users)
export const submissionsAPI = {
  // Submit a new request (upload, update, delete)
  submitRequest: async (requestData) => {
    try {
      const result = await apiRequest("/submissions", {
        method: "POST",
        body: JSON.stringify(requestData),
      });
      toast.success("Request submitted successfully! Awaiting admin approval.");
      return result;
    } catch (error) {
      toast.error(error.message || "Failed to submit request");
      throw error;
    }
  },

  // Get user's submissions
  getUserSubmissions: async () => {
    return await apiRequest("/submissions/user");
  },

  // Submit file upload request
  submitFileUpload: async (formData) => {
    try {
      const result = await apiRequest("/submissions/upload", {
        method: "POST",
        headers: {}, // Don't set Content-Type for FormData
        body: formData,
      });
      toast.success("Upload request submitted! Awaiting admin approval.");
      return result;
    } catch (error) {
      toast.error(error.message || "Failed to submit upload request");
      throw error;
    }
  },

  // Get submission status
  getSubmissionStatus: async (submissionId) => {
    return await apiRequest(`/submissions/${submissionId}/status`);
  },
};

// Admin submissions management API
export const adminSubmissionsAPI = {
  // Get all pending submissions
  getAllSubmissions: async (status = "PENDING") => {
    return await apiRequest(`/admin/submissions?status=${status}`);
  },

  // Approve a submission
  approveSubmission: async (submissionId, approvalData = {}) => {
    try {
      const result = await apiRequest(
        `/admin/submissions/${submissionId}/approve`,
        {
          method: "PATCH",
          body: JSON.stringify(approvalData),
        }
      );
      toast.success("Submission approved successfully!");
      return result;
    } catch (error) {
      toast.error(error.message || "Failed to approve submission");
      throw error;
    }
  },

  // Reject a submission
  rejectSubmission: async (submissionId, reason = "") => {
    try {
      const result = await apiRequest(
        `/admin/submissions/${submissionId}/reject`,
        {
          method: "PATCH",
          body: JSON.stringify({ reason }),
        }
      );
      toast.success("Submission rejected");
      return result;
    } catch (error) {
      toast.error(error.message || "Failed to reject submission");
      throw error;
    }
  },

  // Get submission details
  getSubmissionDetails: async (submissionId) => {
    return await apiRequest(`/admin/submissions/${submissionId}`);
  },
};

export const employeeAPI = {
  // Get all employees
  getAllEmployees: async () => {
    try {
     
      const result = await apiRequest("/employees/view");
     
      return result;
    } catch (error) {
      console.error("Failed to fetch employees:", error); // Debug log
      toast.error("Failed to fetch employees");
      throw error;
    }
  },

  // Get employee by ID
  getEmployeeById: async (employeeId) => {
    try {
      return await apiRequest(`/employee/${employeeId}`);
    } catch (error) {
      toast.error("Failed to fetch employee details");
      throw error;
    }
  },

  // Create new employee with proper FormData for Multer
  createEmployee: async (employeeData) => {
    try {
    
      // Check if this is FormData (for file uploads) or regular object
      if (employeeData instanceof FormData) {
        // Log FormData contents for debugging
      

        const result = await apiRequest("/employees/create", {
          method: "POST",
          headers: {}, // Don't set Content-Type for FormData - let browser set it
          body: employeeData,
        });
      
      } else {
       
        const result = await apiRequest("/employees/create", {
          method: "POST",
          body: JSON.stringify(employeeData),
        });
       
        return result;
      }
    } catch (error) {
      console.error("Failed to create employee:", error); // Debug log
      toast.error(error.message || "Failed to create employee");
      throw error;
    }
  },

  // Create new employee with image (using FormData for Multer)
  createEmployeeWithImage: async (formData) => {
    try {
      const result = await apiRequest("/employees/create-with-image", {
        method: "POST",
        headers: {}, // Don't set Content-Type for FormData
        body: formData,
      });
      return result;
    } catch (error) {
      toast.error(error.message || "Failed to create employee");
      throw error;
    }
  },

  // Update employee with proper FormData for Multer
  updateEmployee: async (employeeId, employeeData) => {
    try {
    
      // Check if this is FormData (for file uploads) or regular object
      if (employeeData instanceof FormData) {
       
        const result = await apiRequest(`/employees/update/${employeeId}`, {
          method: "PUT",
          headers: {}, // Don't set Content-Type for FormData - let browser set it
          body: employeeData,
        });
      
        return result;
      } else {
       
        const result = await apiRequest(`/employees/update/${employeeId}`, {
          method: "PUT",
          body: JSON.stringify(employeeData),
        });
      
        return result;
      }
    } catch (error) {
      console.error("Failed to update employee:", error); // Debug log
      toast.error(error.message || "Failed to update employee");
      throw error;
    }
  },

  // Update employee with image (using FormData for Multer)
  updateEmployeeWithImage: async (employeeId, formData) => {
    try {
      const result = await apiRequest(
        `/employees/update-with-image/${employeeId}`,
        {
          method: "PUT",
          headers: {}, // Don't set Content-Type for FormData
          body: formData,
        }
      );
      return result;
    } catch (error) {
      toast.error(error.message || "Failed to update employee");
      throw error;
    }
  },

  // Delete employee
  deleteEmployee: async (employeeId) => {
    try {
      const result = await apiRequest(`/employees/delete/${employeeId}`, {
        method: "DELETE",
      });
      // Remove duplicate toast - handled in component
      return result;
    } catch (error) {
      toast.error(error.message || "Failed to delete employee");
      throw error;
    }
  },

  // Upload employee profile image
  uploadEmployeeImage: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const result = await apiRequest("/upload/employee-image", {
        method: "POST",
        headers: {}, // Don't set Content-Type for FormData
        body: formData,
      });
      toast.success("Profile image uploaded successfully!");
      return result; // Should return { imageUrl: "uploaded_image_url" }
    } catch (error) {
      toast.error(error.message || "Failed to upload image");
      throw error;
    }
  }, // Get pending employee changes (for approval system)
  getPendingEmployeeChanges: async () => {
    try {
      return await apiRequest("/employees/pending");
    } catch (error) {
      toast.error("Failed to fetch pending changes");
      throw error;
    }
  },

  // Approve employee changes
  approveEmployeeChanges: async (employeeId) => {
    try {
      const result = await apiRequest(`/employees/approve/${employeeId}`, {
        method: "PATCH",
      });
      toast.success("Employee changes approved!");
      return result;
    } catch (error) {
      toast.error(error.message || "Failed to approve changes");
      throw error;
    }
  },
};

// Default export for convenience
export default {
  auth: authAPI,
  projects: projectsAPI,
  upload: uploadAPI,
  utils: apiUtils,
  pending: pendingAPI,
  submissions: submissionsAPI,
  adminSubmissions: adminSubmissionsAPI,
  employee: employeeAPI,
};
