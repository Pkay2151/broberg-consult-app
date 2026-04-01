import React from "react";

const Avatar = ({ src, alt, size = "md", fallback, className = "" }) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const baseClasses = `${sizes[size]} rounded-full object-cover border-2 border-gray-200 ${className}`;

  return (
    <img
      src={
        src ||
        `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`
      }
      alt={alt}
      className={baseClasses}
      onError={(e) => {
        if (fallback) {
          e.target.src = fallback;
        }
      }}
    />
  );
};

export default Avatar;
