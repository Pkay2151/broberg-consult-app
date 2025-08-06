import { useState, useMemo } from "react";

export const useEmployeeFilters = (employees) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPosition, setFilterPosition] = useState("");

  // Get unique positions for filter dropdown
  const uniquePositions = useMemo(() => {
    return [
      ...new Set(
        (Array.isArray(employees) ? employees : []).map((emp) => emp.position)
      ),
    ];
  }, [employees]);

  // Filter employees based on search and position
  const filteredEmployees = useMemo(() => {
    if (!Array.isArray(employees)) {
      return [];
    }

    let filtered = employees;

    if (searchTerm) {
      filtered = filtered.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterPosition) {
      filtered = filtered.filter((emp) => emp.position === filterPosition);
    }

    return filtered;
  }, [employees, searchTerm, filterPosition]);

  const clearFilters = () => {
    setSearchTerm("");
    setFilterPosition("");
  };

  return {
    searchTerm,
    setSearchTerm,
    filterPosition,
    setFilterPosition,
    uniquePositions,
    filteredEmployees,
    clearFilters,
  };
};
