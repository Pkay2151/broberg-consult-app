import React, { useState } from "react";
import {
  Home,
  FolderOpen,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  BarChart3,
  Calendar,
  Bell,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/admin", active: false },
    {
      icon: FolderOpen,
      label: "Projects",
      path: "/admin/projects",
      active: window.location.pathname.includes("Project"),
    },
    {
      icon: Users,
      label: "Employees",
      path: "/admin/employees",
      active: window.location.pathname.includes("Employee"),
    },
    // {
    //   icon: BarChart3,
    //   label: "Analytics",
    //   path: "/admin/analytics",
    //   active: false,
    // },
    // {
    //   icon: Calendar,
    //   label: "Calendar",
    //   path: "/admin/calendar",
    //   active: false,
    // },
    // {
    //   icon: Bell,
    //   label: "Notifications",
    //   path: "/admin/notifications",
    //   active: false,
    // },
    // {
    //   icon: Settings,
    //   label: "Settings",
    //   path: "/admin/settings",
    //   active: false,
    // },
  ];

  const handleNavigation = (path) => {
    if (path === "/admin/projects") {
      // Navigate to projects page - you can customize this based on your routing
      window.location.href = "/admin/projects";
    } else if (path === "/admin/employees") {
      // Navigate to employees page
      window.location.href = "/admin/employees";
    }
    if (path === "/admin") {
      // Navigate to dashboard
      window.location.href = "/admin";
    }
    // Close mobile menu after navigation
    setIsMobileOpen(false);
    // Add more navigation logic as needed
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-gray-900 text-white p-2 rounded-lg shadow-lg"
      >
        {isMobileOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-gray-900 text-white transition-all duration-300 ease-in-out z-40 ${
          // Mobile: slide in/out based on isMobileOpen
          // Desktop: always visible, width changes on hover
          isMobileOpen
            ? "translate-x-0 w-64 lg:w-64"
            : "-translate-x-full lg:translate-x-0"
        } ${isExpanded ? "lg:w-64" : "lg:w-16"}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Logo/Brand */}
        <div className="flex items-center p-4 border-b border-gray-700">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">BC</span>
          </div>
          <div
            className={`ml-3 transition-all duration-300 ${
              isExpanded || isMobileOpen
                ? "opacity-100 w-auto"
                : "opacity-0 w-0 lg:opacity-0 lg:w-0"
            } overflow-hidden`}
          >
            <h2 className="text-lg font-semibold whitespace-nowrap">
              Broberg Consult
            </h2>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6">
          <ul className="space-y-2 px-3">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 group ${
                      item.active
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                    title={!isExpanded && !isMobileOpen ? item.label : ""}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span
                      className={`ml-3 transition-all duration-300 ${
                        isExpanded || isMobileOpen
                          ? "opacity-100 w-auto"
                          : "opacity-0 w-0 lg:opacity-0 lg:w-0"
                      } overflow-hidden whitespace-nowrap`}
                    >
                      {item.label}
                    </span>
                    {item.active && !isExpanded && !isMobileOpen && (
                      <div className="absolute left-14 w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 w-full p-3 border-t border-gray-700">
          <button
            className="w-full flex items-center p-3 rounded-lg text-gray-300 hover:bg-red-400 hover:text-white transition-all duration-200"
            title={!isExpanded && !isMobileOpen ? "Logout" : ""}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span
              className={`ml-3 transition-all duration-300 ${
                isExpanded || isMobileOpen
                  ? "opacity-100 w-auto"
                  : "opacity-0 w-0 lg:opacity-0 lg:w-0"
              } overflow-hidden whitespace-nowrap`}
              onClick={() => {
                // Add logout logic here
                localStorage.removeItem("authToken");
                window.location.href = "/login";
              }}
            >
              Logout
            </span>
          </button>
        </div>

        {/* Expand indicator - only show on desktop */}
        <div
          className={`absolute top-1/2 -right-3 w-6 h-6 bg-gray-900 border border-gray-700 rounded-full items-center justify-center transition-all duration-300 ${
            isExpanded ? "rotate-180" : ""
          } hidden lg:flex`}
        >
          <ChevronRight className="w-3 h-3 text-gray-400" />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
