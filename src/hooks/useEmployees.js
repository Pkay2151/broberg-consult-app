import { useState, useEffect } from "react";
import { employeeAPI } from "../../util/api";
import { toast } from "react-toastify";

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);

    try {
      const employeesData = await employeeAPI.getAllEmployees();
      console.log("Employees API Response:", employeesData);

      let employeeArray = [];

      if (Array.isArray(employeesData) && employeesData.length > 0) {
        // Map the API response to handle field name variations
        employeeArray = employeesData.map((employee) => {
          console.log("Raw employee data from API:", employee);

          return {
            id: employee.id,
            name: employee.name,
            position: employee.position,
            imageUrl: employee.imageurl || employee.imageUrl,
            isApproved:
              employee.isApproved ||
              employee.isapproved ||
              employee.approved ||
              false,
            createdAt: employee.createdAt || employee.createdat,
            updatedAt: employee.updatedAt || employee.updatedat,
          };
        });
      }

      if (employeeArray.length === 0) {
        throw new Error("No employees found - using mock data");
      }

      setEmployees(employeeArray);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError(error.message);

      // Fallback to mock data
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

      console.log("Using mock data:", mockEmployees);
      setEmployees(mockEmployees);
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (employeeData) => {
    try {
      setLoading(true);
      const newEmployee = await employeeAPI.createEmployee(employeeData);

      setEmployees((prevEmployees) => {
        const updatedEmployees = Array.isArray(prevEmployees)
          ? [...prevEmployees, newEmployee]
          : [newEmployee];
        return updatedEmployees;
      });

      toast.success("Employee added successfully!");
      return newEmployee;
    } catch (error) {
      console.error("Error creating employee:", error);
      toast.error(`Failed to create employee: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async (employeeId, employeeData) => {
    try {
      setLoading(true);
      const updatedEmployee = await employeeAPI.updateEmployee(
        employeeId,
        employeeData
      );

      setEmployees((prevEmployees) =>
        Array.isArray(prevEmployees)
          ? prevEmployees.map((emp) =>
              emp.id === employeeId ? updatedEmployee : emp
            )
          : [updatedEmployee]
      );

      toast.success("Employee updated successfully!");
      return updatedEmployee;
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error(`Failed to update employee: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (employeeId) => {
    try {
      setLoading(true);
      await employeeAPI.deleteEmployee(employeeId);

      setEmployees((prevEmployees) =>
        Array.isArray(prevEmployees)
          ? prevEmployees.filter((emp) => emp.id !== employeeId)
          : []
      );

      toast.success("Employee deleted successfully!");
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const approveEmployee = async (employeeId) => {
    try {
      setLoading(true);
      await employeeAPI.approveEmployeeChanges(employeeId);

      // Refresh the employees list
      await fetchEmployees();

      toast.success("Employee approved successfully!");
    } catch (error) {
      console.error("Error approving employee:", error);
      toast.error("Failed to approve employee changes. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    loading,
    error,
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    approveEmployee,
  };
};
