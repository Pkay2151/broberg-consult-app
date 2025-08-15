import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";
import { getUserFromToken } from "../../util/auth";
import { employeeAPI } from "../../util/api";
import { toast } from "react-toastify";
import Sidebar from "../../src/components/Sidebar";
import EmployeeDialog from "../../src/components/EmployeeDialog";
import DeleteConfirmationDialog from "../../src/components/DeleteConfirmationDialog";
import { getImageUrlWithFallback } from "../../src/utils/imageUtils";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [dialogType, setDialogType] = useState(""); // 'create', 'update'
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [loading, setLoading] = useState(false);

  const user = getUserFromToken();
 
  // Fetch employees from API
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const employeesData = await employeeAPI.getAllEmployees();
     
        // Ensure we have an array and it's not empty
        const employeeArray =
          Array.isArray(employeesData) && employeesData.length > 0
            ? employeesData
            : [];

        if (employeeArray.length === 0) {
          // Use mock data if no employees returned
          throw new Error("No employees found - using mock data");
        }

        setEmployees(employeeArray);
        setFilteredEmployees(employeeArray);
      } catch (error) {
        console.error("Error fetching employees:", error);
        // Fallback to mock data if API fails or returns empty array
        const mockEmployees = [
          {
            id: 1,
            name: "John Smith",
            position: "Senior Developer",
            imageUrl:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            isApproved: true,
            createdAt: "2023-01-15T00:00:00Z",
            updatedAt: "2023-01-15T00:00:00Z",
          },
          {
            id: 2,
            name: "Sarah Johnson",
            position: "Project Manager",
            imageUrl:
              "https://images.unsplash.com/photo-1494790108755-2616b612b367?w=150&h=150&fit=crop&crop=face",
            isApproved: true,
            createdAt: "2022-08-20T00:00:00Z",
            updatedAt: "2022-08-20T00:00:00Z",
          },
          {
            id: 3,
            name: "Michael Chen",
            position: "UI/UX Designer",
            imageUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            isApproved: false,
            createdAt: "2023-03-10T00:00:00Z",
            updatedAt: "2023-03-10T00:00:00Z",
          },
        ];
        setEmployees(mockEmployees);
        setFilteredEmployees(mockEmployees);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Filter employees based on search and position filter
  useEffect(() => {
    if (!Array.isArray(employees)) {
      setFilteredEmployees([]);
      return;
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

    setFilteredEmployees(filtered);
  }, [employees, searchTerm, filterPosition]);

  const openDialog = (type, employee = null) => {
  
    setDialogType(type);
    setSelectedEmployee(employee);

    if (type === "delete") {
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

  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      // Check if we have a new image file to upload
      if (formData.imageFile && formData.hasNewImage) {
      
        // Create FormData object for Multer
        const employeeFormData = new FormData();
        employeeFormData.append("name", formData.name);
        employeeFormData.append("position", formData.position);
        employeeFormData.append("image", formData.imageFile); // This is the key field for Multer

        if (user?.userId) {
          employeeFormData.append("updatedBy", user.userId.toString());
        }

        if (dialogType === "create") {
          const newEmployee = await employeeAPI.createEmployee(
            employeeFormData
          );

          setEmployees((prevEmployees) => {
            const updatedEmployees = Array.isArray(prevEmployees)
              ? [...prevEmployees, newEmployee]
              : [newEmployee];
            return updatedEmployees;
          });
          toast.success("Employee added successfully!");
        } else if (dialogType === "update") {
          const updatedEmployee = await employeeAPI.updateEmployee(
            selectedEmployee.id,
            employeeFormData
          );
      
          setEmployees((prevEmployees) =>
            Array.isArray(prevEmployees)
              ? prevEmployees.map((emp) =>
                  emp.id === selectedEmployee.id ? updatedEmployee : emp
                )
              : [updatedEmployee]
          );
          toast.success("Employee updated successfully!");
        }
      } else {
     
        // No new image, send as JSON with existing image URL or default
        let finalImageUrl = formData.imageUrl;

        // Ensure we have a valid image URL - provide default if none exists
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

    
        if (dialogType === "create") {

          const newEmployee = await employeeAPI.createEmployee(employeeData);
        
          setEmployees((prevEmployees) => {
            const updatedEmployees = Array.isArray(prevEmployees)
              ? [...prevEmployees, newEmployee]
              : [newEmployee];
           
            return updatedEmployees;
          });
          toast.success("Employee added successfully!");
        } else if (dialogType === "update") {
          const updatedEmployee = await employeeAPI.updateEmployee(
            selectedEmployee.id,
            employeeData
          );

          setEmployees((prevEmployees) =>
            Array.isArray(prevEmployees)
              ? prevEmployees.map((emp) =>
                  emp.id === selectedEmployee.id ? updatedEmployee : emp
                )
              : [updatedEmployee]
          );
          toast.success("Employee updated successfully!");
        }
      }

      closeDialog();
    } catch (error) {
      console.error("Error saving employee:", error);
      toast.error(`Failed to save employee: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);

    try {
      await employeeAPI.deleteEmployee(selectedEmployee.id);
      setEmployees((prevEmployees) =>
        Array.isArray(prevEmployees)
          ? prevEmployees.filter((emp) => emp.id !== selectedEmployee.id)
          : []
      );
      toast.success("Employee deleted successfully!");
      closeDialog();
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (employeeId) => {
    setLoading(true);

    try {
      await employeeAPI.approveEmployeeChanges(employeeId);

      // Refresh the employees list to get updated data
      const employeesData = await employeeAPI.getAllEmployees();
      const employeeArray =
        Array.isArray(employeesData) && employeesData.length > 0
          ? employeesData
          : [];
      setEmployees(employeeArray);
      setFilteredEmployees(employeeArray);

      closeDialog();
    } catch (error) {
      console.error("Error approving employee:", error);
      toast.error("Failed to approve employee changes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const uniquePositions = [
    ...new Set(
      (Array.isArray(employees) ? employees : [])
        .map((emp) => emp?.position)
        .filter(Boolean)
    ),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="lg:ml-16 transition-all duration-300">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:pt-6 pt-16">
          {/* Header */}
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
                <button
                  onClick={() => openDialog("create")}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline">Add Employee</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterPosition}
                  onChange={(e) => setFilterPosition(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="">All Positions</option>
                  {uniquePositions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Employee Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-gray-500 mt-2">Loading employees...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-900">
                        Employee
                      </th>
                      <th className="text-left p-4 font-medium text-gray-900">
                        Position
                      </th>
                      <th className="text-left p-4 font-medium text-gray-900">
                        Status
                      </th>
                      <th className="text-left p-4 font-medium text-gray-900">
                        Created Date
                      </th>
                      <th className="text-left p-4 font-medium text-gray-900">
                        Last Updated
                      </th>
                      <th className="text-left p-4 font-medium text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Array.isArray(filteredEmployees) &&
                      filteredEmployees
                        .filter(Boolean)
                        .map((employee) => (
                        <tr
                          key={employee?.id || Math.random()}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={getImageUrlWithFallback(
                                  employee?.imageUrl,
                                  "avatar"
                                )}
                                alt={employee?.name || 'Employee'}
                                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                              />
                              <div>
                                <p className="font-medium text-gray-900">
                                  {employee?.name || "-"}
                                </p>
                                <p className="text-sm text-gray-500">
                                  ID: {employee?.id ?? "-"}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {employee?.position || "-"}
                            </span>
                          </td>
                          <td className="p-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                employee.isApproved
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {employee.isApproved
                                ? "Approved"
                                : "Pending Approval"}
                            </span>
                          </td>
                          <td className="p-4 text-gray-900">
                            {employee?.createdAt
                              ? new Date(employee.createdAt).toLocaleDateString()
                              : "-"}
                          </td>
                          <td className="p-4 text-gray-900">
                            {employee?.updatedAt
                              ? new Date(employee.updatedAt).toLocaleDateString()
                              : "-"}
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => openDialog("update", employee)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                title="Edit Employee"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => openDialog("delete", employee)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                title="Delete Employee"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

            {!loading &&
              Array.isArray(filteredEmployees) &&
              filteredEmployees.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No employees found matching your criteria.
                  </p>
                </div>
              )}
          </div>

          {/* Reusable Employee Dialog */}
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

          {/* Reusable Delete Confirmation Dialog */}
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
    </div>
  );
};

export default Employee;
