import React, { useState } from "react";
import { X, Save, Camera, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

const EmployeeDialog = ({
  isOpen,
  onClose,
  dialogType,
  selectedEmployee,
  onSubmit,
  onApprove,
  loading,
  user,
}) => {
  const [formData, setFormData] = useState({
    name: selectedEmployee?.name || "",
    position: selectedEmployee?.position || "",
    imageUrl: selectedEmployee?.imageUrl || "",
    imageFile: null,
    hasNewImage: false,
  });
  const [imageUploading, setImageUploading] = useState(false);

  // Reset form data when dialog opens/closes or selectedEmployee changes
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        name: selectedEmployee?.name || "",
        position: selectedEmployee?.position || "",
        imageUrl: selectedEmployee?.imageUrl || "",
        imageFile: null,
        hasNewImage: false,
      });
    }
  }, [isOpen, selectedEmployee]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.position.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Check if we need an image for a new employee
    if (
      dialogType === "create" &&
      !formData.hasNewImage &&
      !formData.imageUrl
    ) {
      toast.error("Please upload an image for the new employee");
      return;
    }

 
    setImageUploading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Submit error in dialog:", error);
    } finally {
      setImageUploading(false);
    }
  };

  const handleApprove = async () => {
    if (!selectedEmployee) return;

    setImageUploading(true);
    try {
      await onApprove(selectedEmployee.id);
      onClose(); // Close dialog after approval
    } catch (error) {
      console.error("Approve error in dialog:", error);
    } finally {
      setImageUploading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      processImageFile(file);
    }
  };

  const processImageFile = (file) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Store the file and create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData({
        ...formData,
        imageFile: file,
        imageUrl: e.target.result, // For preview only
        hasNewImage: true, // Flag to indicate a new image was uploaded
      });
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  // Debug logging for approve button visibility
 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Dialog Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            {dialogType === "create" && "Add New Employee"}
            {dialogType === "update" && "Update Employee"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dialog Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="text-center">
              <div
                className="relative inline-block border-2 border-dashed border-gray-300 rounded-full p-1 hover:border-blue-400 transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <img
                  src={
                    formData.imageUrl ||
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  }
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                />
                <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {imageUploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Click the camera icon or drag & drop to upload a profile picture
              </p>
              <p className="text-xs text-gray-400">
                Max file size: 5MB. Supported formats: JPG, PNG, GIF
              </p>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter employee name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position *
                </label>
                <input
                  type="text"
                  required
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Senior Developer, Project Manager"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>

              {/* Approve button - only show for admin users and when updating existing employees that are not approved */}
              {user?.isAdmin &&
                dialogType === "update" &&
                selectedEmployee &&
                !selectedEmployee.isApproved && (
                  <button
                    type="button"
                    onClick={handleApprove}
                    disabled={loading || imageUploading}
                    className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>
                      {imageUploading || loading ? "Processing..." : "Approve"}
                    </span>
                  </button>
                )}

              <button
                type="submit"
                disabled={loading || imageUploading}
                className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>
                  {imageUploading
                    ? "Uploading Image..."
                    : loading
                    ? "Saving..."
                    : dialogType === "create"
                    ? "Add Employee"
                    : "Update Employee"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDialog;