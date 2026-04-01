import { FolderKanban, LogOut, Users } from "lucide-react";
import React from "react";
const SideBar = ({ email }) => {
  return (
    <div className="fixed left-0 top-0 w-64 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white min-h-screen flex flex-col z-40 lg:static lg:z-auto shadow-xl">
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Admin Panel</h2>
            <p className="text-xs text-blue-300">BROBERG CONSULT LTD</p>
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3">
          <p className="text-xs text-gray-300 mb-1">Welcome</p>
          <p className="text-sm font-medium text-white truncate">{email}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {/* Dashboard */}
          <li>
            <a
              href="/admin"
              className="flex items-center px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800/70 hover:text-white transition-all duration-200 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <svg
                className="w-5 h-5 mr-3 relative z-10"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
              </svg>
              <span className="relative z-10 font-medium">Dashboard</span>
            </a>
          </li>

          {/* Employees Management */}
          <li>
            <a
              href="/admin/employees"
              className="flex items-center px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800/70 hover:text-white transition-all duration-200 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <Users className="mr-3 w-5 h-5 relative z-10" />
              <span className="relative z-10 font-medium">
                Employee Management
              </span>
            </a>
          </li>

          {/* Projects Management */}
          <li>
            <a
              href="/admin/projects"
              className="flex items-center px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800/70 hover:text-white transition-all duration-200 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <FolderKanban className="mr-3 w-5 h-5 relative z-10" />
              <span className="relative z-10 font-medium">
                Project Management
              </span>
            </a>
          </li>

          {/* Clients Management */}
          {/* <li>
            <a
              href="/admin/clients"
              className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
              </svg>
              Client Management
            </a>
          </li> */}

          {/* Contact Messages */}
          {/* <li>
            <a
              href="/admin/messages"
              className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              Contact Messages
            </a>
          </li> */}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700/50">
        <button
          className="flex items-center w-full px-4 py-3 rounded-xl text-gray-300 hover:bg-red-600/80 hover:text-white transition-all duration-200 group relative overflow-hidden"
          onClick={() => {
            // Add logout logic here
            localStorage.removeItem("authToken");
            window.location.href = "/login";
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          <LogOut className="w-5 h-5 mr-3 relative z-10" />
          <span className="relative z-10 font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
