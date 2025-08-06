import React from "react";
import { Edit, Trash2 } from "lucide-react";
import Avatar from "../ui/Avatar";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { getImageUrlWithFallback } from "../../utils/imageUtils";

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  const getStatusVariant = (isApproved) => {
    return isApproved ? "success" : "warning";
  };

  const getStatusText = (isApproved) => {
    return isApproved ? "Approved" : "Pending Approval";
  };

  return (
    <>
      <td className="px-3 py-4">
        <div className="flex items-center space-x-3">
          <Avatar
            src={getImageUrlWithFallback(employee.imageUrl, "avatar")}
            alt={employee.name}
            size="md"
          />
          <div className="min-w-0 flex-1">
            <p className="font-medium text-gray-900 truncate">
              {employee.name}
            </p>
            <p className="text-sm text-gray-500 truncate">ID: {employee.id}</p>
          </div>
        </div>
      </td>
      <td className="px-3 py-4">
        <Badge variant="primary">{employee.position}</Badge>
      </td>
      <td className="px-3 py-4">
        <Badge variant={getStatusVariant(employee.isApproved)}>
          {getStatusText(employee.isApproved)}
        </Badge>
      </td>
      <td className="px-3 py-4 text-gray-900">
        <span className="text-sm">
          {new Date(employee.createdAt).toLocaleDateString()}
        </span>
      </td>
      <td className="px-3 py-4 text-gray-900">
        <span className="text-sm">
          {new Date(employee.updatedAt).toLocaleDateString()}
        </span>
      </td>
      <td className="px-3 py-4">
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="sm"
            icon={Edit}
            onClick={() => onEdit(employee)}
            className="p-2 text-blue-600 hover:bg-blue-100"
            title="Edit Employee"
          />
          <Button
            variant="outline"
            size="sm"
            icon={Trash2}
            onClick={() => onDelete(employee)}
            className="p-2 text-red-600 hover:bg-red-100"
            title="Delete Employee"
          />
        </div>
      </td>
    </>
  );
};

export default EmployeeCard;
