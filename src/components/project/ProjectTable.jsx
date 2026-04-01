import React from "react";
import ProjectCard from "./ProjectCard";
import LoadingSpinner from "../ui/LoadingSpinner";

const ProjectTable = ({
  projects,
  loading,
  onEditProject,
  onDeleteProject,
  onViewProject,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner text="Loading projects..." />
      </div>
    );
  }

  if (!Array.isArray(projects) || projects.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📁</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No projects found
          </h3>
          <p className="text-gray-500">
            Get started by creating your first project.
          </p>
        </div>
      </div>
    );
  }


  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Mobile Card View - Hidden on larger screens */}
      <div className="block lg:hidden">
        <div className="space-y-4 p-4">
          {projects.map((project, id) => (
            <div
              key={id}
              className="bg-gray-50 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 truncate">
                  {project.name}
                </h3>
                <span className="text-xs text-gray-500">ID: {project.id}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Client:</span>
                  <p className="font-medium truncate">{project.clientName}</p>
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>
                  <p className="font-medium">{project.status}</p>
                </div>
                <div>
                  <span className="text-gray-500">Start:</span>
                  <p className="font-medium">
                    {new Date(project.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">End:</span>
                  <p className="font-medium">
                    {project.endDate
                      ? new Date(project.endDate).toLocaleDateString()
                      : "Ongoing"}
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-2 border-t border-gray-200">
                <button
                  onClick={() => onViewProject(project)}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                >
                  View
                </button>
                <button
                  onClick={() => onEditProject(project)}
                  className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteProject(project)}
                  className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full min-w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-3 py-4 font-medium text-gray-900 min-w-[200px]">
                Project
              </th>
              <th className="text-left px-3 py-4 font-medium text-gray-900 min-w-[150px]">
                Client
              </th>
              <th className="text-left px-3 py-4 font-medium text-gray-900 min-w-[120px]">
                Status
              </th>
              <th className="text-left px-3 py-4 font-medium text-gray-900 min-w-[120px]">
                Start Date
              </th>
              <th className="text-left px-3 py-4 font-medium text-gray-900 min-w-[120px]">
                End Date
              </th>
              <th className="text-left px-3 py-4 font-medium text-gray-900 min-w-[120px]">
                Created
              </th>
              <th className="text-left px-3 py-4 font-medium text-gray-900 min-w-[150px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {projects.map((project, id) => (
              <tr key={id} className="group hover:bg-gray-50">
                <ProjectCard
                  project={project}
                  onEdit={onEditProject}
                  onDelete={onDeleteProject}
                  onView={onViewProject}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTable;
