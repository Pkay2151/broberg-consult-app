import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { projectsAPI } from "../../util/api";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);

    try {
      const projectsData = await projectsAPI.getAllproject();
    
      // Handle the API response structure - check if data is in projects.projects array
      let projectsArray = [];

      if (
        projectsData &&
        projectsData.projects &&
        Array.isArray(projectsData.projects)
      ) {
        projectsArray = projectsData.projects;
      } else if (Array.isArray(projectsData)) {
        projectsArray = projectsData;
      }

      // Map the API response to match component expectations (camelCase)
      const mappedProjects = projectsArray.map((project) => {
        // Debug log to see what fields are available
      
        return {
          id: project.id,
          name: project.name,
          clientName: project.clientname || project.clientName, // Map API lowercase to camelCase
          description: project.description,
          imageUrl: project.imageurl || project.imageUrl, // Map API lowercase to camelCase
          startDate: project.startdate || project.startDate, // Map API lowercase to camelCase
          endDate: project.enddate || project.endDate, // Map API lowercase to camelCase
          isApproved:
            project.isApproved ||
            project.isapproved ||
            project.approved ||
            false, // Handle various field names and default to false
          createdAt: project.createdAt || project.createdat,
          updatedBy: project.updatedBy || project.updatedby,
        };
      });

 
      setProjects(mappedProjects);

      if (mappedProjects.length === 0) {
      
        // Use mock data if no projects returned
        const mockProjects = [
          {
            id: 1,
            name: "E-commerce Website",
            clientName: "TechCorp Inc",
            description:
              "A modern e-commerce platform with payment integration",
            imageUrl: null,
            startDate: "2024-01-15T00:00:00Z",
            endDate: "2024-06-15T00:00:00Z",
            isApproved: true,
            createdAt: "2024-01-01T00:00:00Z",
            updatedBy: 1,
          },
          {
            id: 2,
            name: "Mobile App Development",
            clientName: "StartupXYZ",
            description: "Cross-platform mobile application for food delivery",
            imageUrl: null,
            startDate: "2024-02-01T00:00:00Z",
            endDate: null,
            isApproved: false,
            createdAt: "2024-01-25T00:00:00Z",
            updatedBy: 2,
          },
        ];
        setProjects(mockProjects);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError(error.message);

      // Fallback to mock data if API fails
      const mockProjects = [
        {
          id: 1,
          name: "E-commerce Website",
          clientName: "TechCorp Inc",
          description: "A modern e-commerce platform with payment integration",
          imageUrl: null,
          startDate: "2024-01-15T00:00:00Z",
          endDate: "2024-06-15T00:00:00Z",
          isApproved: true,
          createdAt: "2024-01-01T00:00:00Z",
          updatedBy: 1,
        },
        {
          id: 2,
          name: "Mobile App Development",
          clientName: "StartupXYZ",
          description: "Cross-platform mobile application for food delivery",
          imageUrl: null,
          startDate: "2024-02-01T00:00:00Z",
          endDate: null,
          isApproved: false,
          createdAt: "2024-01-25T00:00:00Z",
          updatedBy: 2,
        },
        {
          id: 3,
          name: "Corporate Website Redesign",
          clientName: "Global Industries",
          description:
            "Complete redesign of corporate website with modern UI/UX",
          imageUrl: null,
          startDate: "2024-03-01T00:00:00Z",
          endDate: "2024-08-01T00:00:00Z",
          isApproved: true,
          createdAt: "2024-02-15T00:00:00Z",
          updatedBy: 1,
        },
        {
          id: 4,
          name: "Database Migration",
          clientName: "DataSoft Solutions",
          description: "Migration from legacy system to modern cloud database",
          imageUrl: null,
          startDate: "2023-12-01T00:00:00Z",
          endDate: "2024-01-15T00:00:00Z",
          isApproved: false,
          createdAt: "2023-11-20T00:00:00Z",
          updatedBy: 3,
        },
      ];

      setProjects(mockProjects);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData) => {
    try {
      setLoading(true);

    

      // Project.jsx already creates FormData, so just pass it through
      const result = await projectsAPI.createproject(projectData);
   
      setProjects((prevProjects) => {
        const updatedProjects = Array.isArray(prevProjects)
          ? [...prevProjects, result]
          : [result];
        return updatedProjects;
      });

      toast.success("Project added successfully!");
      return result;

    } catch (error) {
      console.error("Error creating project:", error);
      toast.error(`Failed to create project: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (projectId, projectData) => {
    try {
      setLoading(true);

   

      // Project.jsx already creates FormData, so just pass it through
      const updatedProject = await projectsAPI.update(projectId, projectData);
     
      setProjects((prevProjects) =>
        Array.isArray(prevProjects)
          ? prevProjects.map((project) =>
              project.id === projectId ? updatedProject : project
            )
          : [updatedProject]
      );

      toast.success("Project updated successfully!");
      return updatedProject;
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error(`Failed to update project: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      setLoading(true);
      await projectsAPI.delete(projectId);

      setProjects((prevProjects) =>
        Array.isArray(prevProjects)
          ? prevProjects.filter((project) => project.id !== projectId)
          : []
      );

      toast.success("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const approveProject = async (projectId) => {
    try {
      setLoading(true);
      await projectsAPI.approveProjectChanges(projectId);

      // Refresh the projects list to get updated data
      await fetchProjects();
    } catch (error) {
      console.error("Error approving project:", error);
      toast.error("Failed to approve project changes. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    approveProject,
  };
};
