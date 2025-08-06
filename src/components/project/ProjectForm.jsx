import React, { useState } from "react";
import { X, Save, Camera, Upload } from "lucide-react";
import { toast } from "react-toastify";
import { validateFile, fileToBase64 } from "../../utils/fileUtils";

const ProjectForm = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
  initialData = null,
}) => {
  // Form state with proper initialization
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    clientName: initialData?.clientName || "",
    description: initialData?.description || "",
    startDate: initialData?.startDate
      ? initialData.startDate.split("T")[0]
      : "",
    endDate: initialData?.endDate ? initialData.endDate.split("T")[0] : "",
    imageUrl: initialData?.imageUrl || "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.imageUrl || "");
  const [hasNewImage, setHasNewImage] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Reset form when dialog opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        name: initialData?.name || "",
        clientName: initialData?.clientName || "",
        description: initialData?.description || "",
        startDate: initialData?.startDate
          ? initialData.startDate.split("T")[0]
          : "",
        endDate: initialData?.endDate ? initialData.endDate.split("T")[0] : "",
        imageUrl: initialData?.imageUrl || "",
      });
      setImageFile(null);
      setImagePreview(initialData?.imageUrl || "");
      setHasNewImage(false);
    }
  }, [isOpen, initialData]);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(`Form field ${name} updated to:`, value);
  };

  // Handle file input change
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log("File selected:", file.name, file.size, file.type);

    const validation = validateFile(file);
    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

    setUploading(true);
    try {
      // Convert to base64 for preview
      const base64Url = await fileToBase64(file);

      setImageFile(file);
      setImagePreview(base64Url);
      setHasNewImage(true);

      console.log("Image processed successfully");
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Image processing error:", error);
      toast.error("Failed to process image file");
    } finally {
      setUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("ProjectForm - Form submitted");
    console.log("ProjectForm - Current formData:", formData);
    console.log("ProjectForm - Image file:", imageFile);
    console.log("ProjectForm - Has new image:", hasNewImage);

    // Validation
    if (!formData.name.trim()) {
      toast.error("Project name is required");
      return;
    }

    if (!formData.clientName.trim()) {
      toast.error("Client name is required");
      return;
    }

    if (!formData.startDate) {
      toast.error("Start date is required");
      return;
    }

    if (!imageFile && !formData.imageUrl) {
      toast.error("Project image is required");
      return;
    }

    // Validate dates
    if (formData.endDate && formData.startDate > formData.endDate) {
      toast.error("End date cannot be before start date");
      return;
    }

    // Prepare submission data
    const submissionData = {
      ...formData,
      imageFile: imageFile,
      hasNewImage: hasNewImage,
    };

    console.log("ProjectForm - Submitting data:", submissionData);

    try {
      await onSubmit(submissionData);
      onClose();

      // Reset form after successful submission
      setFormData({
        name: "",
        clientName: "",
        description: "",
        startDate: "",
        endDate: "",
        imageUrl: "",
      });
      setImageFile(null);
      setImagePreview("");
      setHasNewImage(false);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to save project. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            {initialData ? "Update Project" : "Create New Project"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter project name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Client Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Name *
              </label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                placeholder="Enter client name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter project description"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Upload */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Image *
            </label>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-4">
                <img
                  src={imagePreview}
                  alt="Project preview"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              </div>
            )}

            {/* File Input */}
            <div className="flex items-center space-x-4">
              <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? "Processing..." : "Choose Image"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
              {imageFile && (
                <span className="text-sm text-gray-600">{imageFile.name}</span>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Saving..." : initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
