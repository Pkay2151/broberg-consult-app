import { useState, useMemo } from "react";

export const useProjectFilters = (projects) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [clientFilter, setClientFilter] = useState("");

  // Get unique clients for filter dropdown
  const uniqueClients = useMemo(() => {
    return [
      ...new Set(
        (Array.isArray(projects) ? projects : []).map(
          (project) => project.clientName
        )
      ),
    ];
  }, [projects]);

  // Helper function to check if project is overdue
  const isProjectOverdue = (project) => {
    if (!project.endDate || project.isApproved) return false;
    return new Date(project.endDate) < new Date();
  };

  // Filter projects based on search, status, and client
  const filteredProjects = useMemo(() => {
    if (!Array.isArray(projects)) {
      return [];
    }

    let filtered = projects;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (project.description &&
            project.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter((project) => {
        switch (statusFilter) {
          case "approved":
            return project.isApproved;
          case "pending":
            return !project.isApproved && !isProjectOverdue(project);
          case "overdue":
            return isProjectOverdue(project);
          default:
            return true;
        }
      });
    }

    // Client filter
    if (clientFilter) {
      filtered = filtered.filter(
        (project) => project.clientName === clientFilter
      );
    }

    return filtered;
  }, [projects, searchTerm, statusFilter, clientFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setClientFilter("");
  };

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    clientFilter,
    setClientFilter,
    uniqueClients,
    filteredProjects,
    clearFilters,
  };
};
