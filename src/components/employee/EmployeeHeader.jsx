import React from "react";
import { Plus } from "lucide-react";
import Button from "../ui/Button";

const EmployeeHeader = ({ onAddEmployee }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Employee Management
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your team members and their information
          </p>
        </div>
        <div className="flex-shrink-0">
          <Button
            variant="primary"
            icon={Plus}
            onClick={onAddEmployee}
            className="w-full sm:w-auto"
          >
            <span className="hidden sm:inline">Add Employee</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHeader;
