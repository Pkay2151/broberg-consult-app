import React from "react";

const LoadingSpinner = ({
  size = "md",
  text = "Loading...",
  className = "",
}) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className={`text-center py-12 ${className}`}>
      <div
        className={`inline-block animate-spin rounded-full border-b-2 border-blue-600 ${sizes[size]}`}
      ></div>
      {text && <p className="text-gray-500 mt-2">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
