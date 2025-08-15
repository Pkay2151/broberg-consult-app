import React from "react";
import { Search, Filter, Calendar } from "lucide-react";
import Input from "../ui/Input";

const ProjectFilters = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  clientFilter,
  onClientFilterChange,
  clients,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Search */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            icon={Search}
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-sm sm:text-base"
          >
            <option value="">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending Approval</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        {/* Client Filter */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          <select
            value={clientFilter}
            onChange={(e) => onClientFilterChange(e.target.value)}
            className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-sm sm:text-base"
          >
            <option value="">All Clients</option>
            {clients.map((client, id) => (
              <option key={id} value={client}>
                {client}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilters;
