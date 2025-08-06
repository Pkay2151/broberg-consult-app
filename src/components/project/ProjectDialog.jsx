import React, { useState } from "react";
import { X, Save, Camera, CheckCircle, FolderOpen } from "lucide-react";
import { toast } from "react-toastify";
import { validateFile, fileToBase64 } from "../../utils/fileUtils";

const ProjectDialog = ({
  isOpen,
  onClose,
  dialogType,
  selectedProject,
  onSubmit,
  onApprove,
  loading,
  user,
}) => {
  const [formData, setFormData] = useState({
    name: selectedProject?.name || "",
    clientName: selectedProject?.clientName || "",
    description: selectedProject?.description || "",
    startDate: selectedProject?.startDate
      ? selectedProject.startDate.split("T")[0]
      : "",
    endDate: selectedProject?.endDate
      ? selectedProject.endDate.split("T")[0]
      : "",
    imageUrl: selectedProject?.imageUrl || "",
    imageFile: null,
    hasNewImage: false,
  });
  const [imageUploading, setImageUploading] = useState(false);

  // Reset form data when dialog opens/closes or selectedProject changes
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        name: selectedProject?.name || "",
        clientName: selectedProject?.clientName || "",
        description: selectedProject?.description || "",
        startDate: selectedProject?.startDate
          ? selectedProject.startDate.split("T")[0]
          : "",
        endDate: selectedProject?.endDate
          ? selectedProject.endDate.split("T")[0]
          : "",
        imageUrl: selectedProject?.imageUrl || "",
        imageFile: null,
        hasNewImage: false,
      });
    }
  }, [isOpen, selectedProject]);

  // Debug logging for approve button visibility
  console.log("ProjectDialog Debug:", {
    isOpen,
    dialogType,
    selectedProject: selectedProject?.id,
    userIsAdmin: user?.isAdmin,
    shouldShowApprove:
      user?.isAdmin && dialogType === "update" && selectedProject,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.clientName.trim() ||
      !formData.startDate
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate dates
    if (formData.endDate && formData.startDate > formData.endDate) {
      toast.error("End date cannot be before start date");
      return;
    }

    console.log("ProjectDialog - Form submitted with data:", formData);
    console.log("ProjectDialog - Has image file:", !!formData.imageFile);
    console.log("ProjectDialog - Has new image:", formData.hasNewImage);

    setImageUploading(true);
    try {
      await onSubmit(formData);
      console.log("Project submitted successfully, closing dialog");
      onClose(); // Close dialog on success
    } catch (error) {
      console.error("Submit error in dialog:", error);
      toast.error(`Failed to save project: ${error.message || 'Please try again.'}`);
    } finally {
      setImageUploading(false);
    }
  };

  const handleApprove = async () => {
    if (!selectedProject) return;

    setImageUploading(true);
    try {
      await onApprove(selectedProject.id);
      onClose();
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

  const processImageFile = async (file) => {
    console.log("Processing image file:", file.name, file.size, file.type);

    const validation = validateFile(file);

    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

    try {
      const imageUrl = await fileToBase64(file);
      console.log("Image converted to base64, size:", imageUrl.length);

      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imageUrl: imageUrl,
        hasNewImage: true,
      }));

      console.log("Form data updated with new image");
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to process image file");
      console.error("Image processing error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Dialog Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <FolderOpen className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              {dialogType === "create" && "Add New Project"}
              {dialogType === "update" && "Update Project"}
              {dialogType === "view" && "Project Details"}
            </h3>
          </div>
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
            {/* Project Image Upload */}
            <div className="text-center">
              <div
                className="relative inline-block border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors w-full max-w-md"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <img
                  src={
                    formData.imageUrl ||
                    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop"
                  }
                  alt="Project"
                  className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                />
                <label className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={dialogType === "view"}
                  />
                </label>
                {imageUploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Click the camera icon or drag & drop to upload a project image
              </p>
              <p className="text-xs text-gray-400">
                Max file size: 10MB. Supported formats: JPG, PNG, GIF, WebP
              </p>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter project name"
                    disabled={dialogType === "view"}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) =>
                      setFormData({ ...formData, clientName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter client name"
                    disabled={dialogType === "view"}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={dialogType === "view"}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={dialogType === "view"}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter project description..."
                    disabled={dialogType === "view"}
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            {dialogType !== "view" && (
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>

                {/* Approve button - only show for admin users and when updating existing projects that are not approved */}
                {user?.isAdmin &&
                  dialogType === "update" &&
                  selectedProject &&
                  !selectedProject.isApproved && (
                    <button
                      type="button"
                      onClick={handleApprove}
                      disabled={loading || imageUploading}
                      className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>
                        {imageUploading || loading
                          ? "Processing..."
                          : "Approve"}
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
                      ? "Add Project"
                      : "Update Project"}
                  </span>
                </button>
              </div>
            )}

            {/* View Mode Actions */}
            {dialogType === "view" && (
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectDialog;
