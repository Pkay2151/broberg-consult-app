import React from "react";
import { Plus } from "lucide-react";
import Button from "../ui/Button";

const ProjectHeader = ({ onAddProject }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Projects
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your projects and clients
          </p>
        </div>
        {onAddProject && (
          <div className="flex-shrink-0">
            <Button
              variant="primary"
              icon={Plus}
              onClick={onAddProject}
              className="w-full sm:w-auto"
            >
              <span className="hidden sm:inline">Add Project</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectHeader;
