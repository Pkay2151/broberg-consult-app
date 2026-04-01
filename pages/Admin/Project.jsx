import React, { useState } from "react";
import { toast } from "react-toastify";
import { getUserFromToken } from "../../util/auth";
import Sidebar from "../../src/components/Sidebar";
import ProjectHeader from "../../src/components/project/ProjectHeader";
import ProjectFilters from "../../src/components/project/ProjectFilters";
import ProjectTable from "../../src/components/project/ProjectTable";
import ProjectDialog from "../../src/components/project/ProjectDialog";
import DeleteConfirmationDialog from "../../src/components/DeleteConfirmationDialog";
import { useProjects } from "../../src/hooks/useProjects";
import { useProjectFilters } from "../../src/hooks/useProjectFilters";
import { PROJECT_DIALOG_TYPES } from "../../src/constants/project";

const Project = () => {
  // State for dialogs
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  // Get user info
  const user = getUserFromToken();
 

  // Custom hooks for data and filtering
  const {
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
    approveProject,
  } = useProjects();

  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    clientFilter,
    setClientFilter,
    uniqueClients,
    filteredProjects,
  } = useProjectFilters(projects);

  // Dialog management
  const openDialog = (type, project = null) => {
 
    setDialogType(type);
    setSelectedProject(project);

    if (type === PROJECT_DIALOG_TYPES.DELETE) {
      setShowDeleteDialog(true);
    } else {
      setShowDialog(true);
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
    setShowDeleteDialog(false);
    setDialogType("");
    setSelectedProject(null);
  };

  // Event handlers
  const handleAddProject = () => {
    openDialog(PROJECT_DIALOG_TYPES.CREATE);
  };

  const handleEditProject = (project) => {
    openDialog(PROJECT_DIALOG_TYPES.UPDATE, project);
  };

  const handleViewProject = (project) => {
    openDialog(PROJECT_DIALOG_TYPES.VIEW, project);
  };

  const handleDeleteProject = (project) => {
    openDialog(PROJECT_DIALOG_TYPES.DELETE, project);
  };

  const handleSubmit = async (formData) => {
    try {
  
  
      const projectFormData = new FormData();
      projectFormData.append("name", formData.name);
      projectFormData.append("clientName", formData.clientName);
      projectFormData.append("description", formData.description || "");
      projectFormData.append("startDate", formData.startDate);
      projectFormData.append("endDate", formData.endDate || "");

      // Add image file (required for new projects)
      if (formData.imageFile) {
        projectFormData.append("image", formData.imageFile);
      
      }

      // Add user info if available
      if (user?.userId) {
        projectFormData.append("updatedBy", user.userId.toString());
      }
      if (dialogType === PROJECT_DIALOG_TYPES.CREATE) {
        await createProject(projectFormData);
      } else if (dialogType === PROJECT_DIALOG_TYPES.UPDATE) {
        await updateProject(selectedProject.id, projectFormData);
      }

      closeDialog();
      toast.success(
        dialogType === PROJECT_DIALOG_TYPES.CREATE
          ? "Project created successfully!"
          : "Project updated successfully!"
      );

      closeDialog();
    } catch (error) {
      // Error handling is done in the custom hook
      console.error("Submit error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProject(selectedProject.id);
      closeDialog();
    } catch (error) {
      // Error handling is done in the custom hook
      console.error("Delete error:", error);
    }
  };

  const handleApprove = async (projectId) => {
    try {
      await approveProject(projectId);
      closeDialog();
    } catch (error) {
      // Error handling is done in the custom hook
      console.error("Approve error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="lg:ml-16 transition-all duration-300">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:pt-6 pt-16">
          {/* Header */}
          <ProjectHeader onAddProject={handleAddProject} />

          {/* Filters */}
          <ProjectFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            clientFilter={clientFilter}
            onClientFilterChange={setClientFilter}
            clients={uniqueClients}
          />

          {/* Project Table */}
          <ProjectTable
            projects={filteredProjects}
            loading={loading}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
            onViewProject={handleViewProject}
          />

          {/* Dialogs */}
          <ProjectDialog
            isOpen={showDialog}
            onClose={closeDialog}
            dialogType={dialogType}
            selectedProject={selectedProject}
            onSubmit={handleSubmit}
            onApprove={handleApprove}
            loading={loading}
            user={user}
          />

          <DeleteConfirmationDialog
            isOpen={showDeleteDialog}
            onClose={closeDialog}
            onConfirm={handleDelete}
            loading={loading}
            title="Delete Project"
            message="Are you sure you want to delete this project?"
            itemName={selectedProject?.name}
            confirmText="Delete Project"
          />
        </div>
      </div>
    </div>
  );
};

export default Project;
