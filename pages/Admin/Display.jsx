import React, { useEffect, useState } from "react";
import { pendingAPI } from "../../util/api";

import {
  FolderKanban,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import StatCard from "../../src/components/StatCard";

const Display = () => {
  const [pendingProjects, setPendingProjects] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    pendingApprovals: 0,
    activeEmployees: 0,
    completedThisMonth: 0,
  });

  // Fetch pending project approvals
  useEffect(() => {
    const fetchPendingApprovals = async () => {
      try {
        const pendingProjectsData = await pendingAPI.getPendingApprovals();
        const activeEmployees = await pendingAPI.activeEmployees();
        const totalProjects = await pendingAPI.totalProjects();
        setPendingProjects(pendingProjectsData);
        console.log("Pending Project Approvals:", pendingProjectsData);

        // Update stats (you can fetch these from separate API endpoints)
        setStats({
          totalProjects: totalProjects.total || 0,
          pendingApprovals: pendingProjectsData.total || 0,
          activeEmployees: activeEmployees.total || 0,
          completedThisMonth: 8,
        });
      } catch (error) {
        console.error("Error fetching pending project approvals:", error);
      }
    };

    fetchPendingApprovals();
  }, []);

  //   const StatCard = ({ icon: Icon, title, value, subtitle, color, bgColor }) => (

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={FolderKanban}
          title="Total Projects"
          value={stats.totalProjects}
          subtitle="All time"
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
        <StatCard
          icon={Clock}
          title="Pending Approvals"
          value={stats.pendingApprovals}
          subtitle="Awaiting review"
          color="text-orange-600"
          bgColor="bg-orange-100"
        />
        <StatCard
          icon={Users}
          title="Active Employees"
          value={stats.activeEmployees}
          subtitle="Currently working"
          color="text-green-600"
          bgColor="bg-green-100"
        />
        {/* <StatCard
          icon={CheckCircle}
          title="Completed"
          value={stats.completedThisMonth}
          subtitle="This month"
          color="text-purple-600"
          bgColor="bg-purple-100"
        /> */}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/projects"
            className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all group"
          >
            <div className="flex items-center space-x-3">
              <FolderKanban className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">Manage Projects</span>
            </div>
            <svg
              className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <a
            href="/admin/employees"
            className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg hover:from-green-100 hover:to-green-200 transition-all group"
          >
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-900">
                Manage Employees
              </span>
            </div>
            <svg
              className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <span className="font-medium text-gray-900">Pending Reviews</span>
            </div>
            <span className="bg-orange-200 text-orange-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
              {stats.pendingApprovals}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
