import React from "react";
import { Edit, Trash2, Eye, Calendar, User } from "lucide-react";
import Avatar from "../ui/Avatar";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { formatDate } from "../../utils/dateUtils";
import { getImageUrlWithFallback } from "../../utils/imageUtils";

const ProjectCard = ({ project, onEdit, onDelete, onView }) => {
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
            src={getImageUrlWithFallback(project.imageUrl, "project")}
            alt={project.name}
            size="md"
          />
          <div className="min-w-0 flex-1">
            <p className="font-medium text-gray-900 truncate">{project.name}</p>
            <p className="text-sm text-gray-500 truncate">ID: {project.id}</p>
          </div>
        </div>
      </td>
      <td className="px-3 py-4">
        <div className="flex items-center space-x-2 min-w-0">
          <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-gray-900 truncate">{project.clientName}</span>
        </div>
      </td>
      <td className="px-3 py-4">
        <Badge variant={getStatusVariant(project.isApproved)}>
          {getStatusText(project.isApproved)}
        </Badge>
      </td>
      <td className="px-3 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 min-w-0">
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{formatDate(project.startDate)}</span>
        </div>
      </td>
      <td className="px-3 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 min-w-0">
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">
            {project.endDate ? formatDate(project.endDate) : "Ongoing"}
          </span>
        </div>
      </td>
      <td className="px-3 py-4 text-gray-900">
        <span className="text-sm">{formatDate(project.createdAt)}</span>
      </td>
      <td className="px-3 py-4">
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="sm"
            icon={Eye}
            onClick={() => onView(project)}
            className="p-2 text-gray-600 hover:bg-gray-100"
            title="View Project"
          />
          <Button
            variant="outline"
            size="sm"
            icon={Edit}
            onClick={() => onEdit(project)}
            className="p-2 text-blue-600 hover:bg-blue-100"
            title="Edit Project"
          />
          <Button
            variant="outline"
            size="sm"
            icon={Trash2}
            onClick={() => onDelete(project)}
            className="p-2 text-red-600 hover:bg-red-100"
            title="Delete Project"
          />
        </div>
      </td>
    </>
  );
};

export default ProjectCard;
