// components/WelcomePage = () => {.jsx
import React, { useEffect, useRef } from "react";
import { getUserFromToken, isUserAdmin } from "../../util/auth";
import Sidebar from "../../src/components/Sidebar";
import { authAPI } from "../../util/api";
import Display from "./Display";
// import UserDashboard from "./UserDashboard";

const WelcomePage = () => {
  const user = getUserFromToken();
  const logoutTimerRef = useRef(null);
  const isAdmin = isUserAdmin();

  if (!user || user == null) {
    window.location.href = "/login";
  }

  // Auto-logout after 5 minutes of being away from the page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User left the page, start 5-minute timer
        logoutTimerRef.current = setTimeout(async () => {
          try {
            await authAPI.logout();
            window.location.href = "/login";
          } catch {
            // Force logout even if API call fails
            localStorage.removeItem("authToken");
            window.location.href = "/login";
          }
        }, 5 * 60 * 1000); // 5 minutes in milliseconds
      } else {
        // User returned to the page, cancel the logout timer
        if (logoutTimerRef.current) {
          clearTimeout(logoutTimerRef.current);
          logoutTimerRef.current = null;
        }
      }
    };

    // Add event listener for page visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
    };
  }, []);
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Sidebar />
      <div className={`flex-1 ml-0 lg:ml-64`}>
        <div className="min-h-screen">
          <>
            {/* Admin Header Section */}
            <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {user.name}!
                  </h1>
                  <p className="text-gray-600">
                    Manage your projects and team from your dashboard
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {user.email}
                    </p>
                    <p className="text-xs text-gray-500">
                      {isAdmin ? "Administrator" : "Employee"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Main Content */}
            <Display />
          </>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
