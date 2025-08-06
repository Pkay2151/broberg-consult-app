import React from "react";
import EmployeeCard from "./EmployeeCard";
import LoadingSpinner from "../ui/LoadingSpinner";

const EmployeeTable = ({
  employees,
  loading,
  onEditEmployee,
  onDeleteEmployee,
}) => {
  if (loading) {
    return <LoadingSpinner text="Loading employees..." />;
  }

  if (!Array.isArray(employees) || employees.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          No employees found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Mobile Card View - Hidden on larger screens */}
      <div className="block lg:hidden">
        <div className="space-y-4 p-4">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="bg-gray-50 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 truncate">
                  {employee.name}
                </h3>
                <span className="text-xs text-gray-500">ID: {employee.id}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Position:</span>
                  <p className="font-medium truncate">{employee.position}</p>
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>
                  <p className="font-medium">{employee.status}</p>
                </div>
                <div>
                  <span className="text-gray-500">Created:</span>
                  <p className="font-medium">
                    {new Date(employee.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Updated:</span>
                  <p className="font-medium">
                    {new Date(employee.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-2 border-t border-gray-200">
                <button
                  onClick={() => onEditEmployee(employee)}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteEmployee(employee)}
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
                Employee
              </th>
              <th className="text-left px-3 py-4 font-medium text-gray-900 min-w-[150px]">
                Position
              </th>
              <th className="text-left px-3 py-4 font-medium text-gray-900 min-w-[100px]">
                Status
              </th>
              <th className="text-left px-3 py-4 font-medium text-gray-900 min-w-[120px]">
                Created Date
              </th>
              <th className="text-left px-3 py-4 font-medium text-gray-900 min-w-[120px]">
                Last Updated
              </th>
              <th className="text-left px-3 py-4 font-medium text-gray-900 min-w-[120px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <EmployeeCard
                  employee={employee}
                  onEdit={onEditEmployee}
                  onDelete={onDeleteEmployee}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
