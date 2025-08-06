import React, { useState } from "react";
import { getUserFromToken } from "../../util/auth";
import EmployeeHeader from "../../src/components/employee/EmployeeHeader";
import EmployeeFilters from "../../src/components/employee/EmployeeFilters";
import EmployeeTable from "../../src/components/employee/EmployeeTable";
import EmployeeDialog from "../../src/components/EmployeeDialog";
import DeleteConfirmationDialog from "../../src/components/DeleteConfirmationDialog";
import { useEmployees } from "../../src/hooks/useEmployees";
import { useEmployeeFilters } from "../../src/hooks/useEmployeeFilters";
import { DIALOG_TYPES } from "../../src/constants/employee";

const Employee = () => {
  // State for dialogs
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Get user info
  const user = getUserFromToken();
  console.log("Current user:", user);

  // Custom hooks for data and filtering
  const {
    employees,
    loading,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    approveEmployee,
  } = useEmployees();

  const {
    searchTerm,
    setSearchTerm,
    filterPosition,
    setFilterPosition,
    uniquePositions,
    filteredEmployees,
  } = useEmployeeFilters(employees);

  // Dialog management
  const openDialog = (type, employee = null) => {
    console.log("Opening dialog:", {
      type,
      employee,
      userIsAdmin: user?.isAdmin,
    });
    setDialogType(type);
    setSelectedEmployee(employee);

    if (type === DIALOG_TYPES.DELETE) {
      setShowDeleteDialog(true);
    } else {
      setShowDialog(true);
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
    setShowDeleteDialog(false);
    setDialogType("");
    setSelectedEmployee(null);
  };

  // Event handlers
  const handleAddEmployee = () => {
    openDialog(DIALOG_TYPES.CREATE);
  };

  const handleEditEmployee = (employee) => {
    openDialog(DIALOG_TYPES.UPDATE, employee);
  };

  const handleDeleteEmployee = (employee) => {
    openDialog(DIALOG_TYPES.DELETE, employee);
  };

  const handleSubmit = async (formData) => {
    try {
      // Check if we have a new image file to upload
      if (formData.imageFile && formData.hasNewImage) {
        console.log("Creating FormData for file upload...");

        // Create FormData object for Multer
        const employeeFormData = new FormData();
        employeeFormData.append("name", formData.name);
        employeeFormData.append("position", formData.position);
        employeeFormData.append("image", formData.imageFile);

        if (user?.userId) {
          employeeFormData.append("updatedBy", user.userId.toString());
        }

        if (dialogType === DIALOG_TYPES.CREATE) {
          await createEmployee(employeeFormData);
        } else if (dialogType === DIALOG_TYPES.UPDATE) {
          await updateEmployee(selectedEmployee.id, employeeFormData);
        }
      } else {
        console.log("No new image, sending JSON data...");

        // No new image, send as JSON with existing image URL or default
        let finalImageUrl = formData.imageUrl;

        if (!finalImageUrl) {
          finalImageUrl =
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face";
        }

        const employeeData = {
          name: formData.name,
          position: formData.position,
          imageUrl: finalImageUrl,
          updatedBy: user?.userId,
        };

        if (dialogType === DIALOG_TYPES.CREATE) {
          await createEmployee(employeeData);
        } else if (dialogType === DIALOG_TYPES.UPDATE) {
          await updateEmployee(selectedEmployee.id, employeeData);
        }
      }

      closeDialog();
    } catch (error) {
      // Error handling is done in the custom hook
      console.error("Submit error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEmployee(selectedEmployee.id);
      closeDialog();
    } catch (error) {
      // Error handling is done in the custom hook
      console.error("Delete error:", error);
    }
  };

  const handleApprove = async (employeeId) => {
    try {
      await approveEmployee(employeeId);
      closeDialog();
    } catch (error) {
      // Error handling is done in the custom hook
      console.error("Approve error:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex-1 p-6">
        {/* Header */}
        <EmployeeHeader onAddEmployee={handleAddEmployee} />

        {/* Filters */}
        <EmployeeFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterPosition={filterPosition}
          onFilterChange={setFilterPosition}
          positions={uniquePositions}
        />

        {/* Employee Table */}
        <EmployeeTable
          employees={filteredEmployees}
          loading={loading}
          onEditEmployee={handleEditEmployee}
          onDeleteEmployee={handleDeleteEmployee}
        />

        {/* Dialogs */}
        <EmployeeDialog
          isOpen={showDialog}
          onClose={closeDialog}
          dialogType={dialogType}
          selectedEmployee={selectedEmployee}
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
          title="Delete Employee"
          message="Are you sure you want to delete this employee?"
          itemName={selectedEmployee?.name}
          confirmText="Delete Employee"
        />
      </div>
    </div>
  );
};

export default Employee;
