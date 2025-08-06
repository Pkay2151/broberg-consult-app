import React from "react";
import { getUserFromToken } from "../util/auth";

const ProtectRoutes = ({ children }) => {
  const user = getUserFromToken();

  if (!user) {
    window.location.href = "/login";
  }

  return children;
};

export default ProtectRoutes;
