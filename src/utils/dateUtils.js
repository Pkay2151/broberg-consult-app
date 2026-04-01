/**
 * Format date to locale string
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale string (default: 'en-US')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, locale = "en-US") => {
  if (!date) return "N/A";

  try {
    return new Date(date).toLocaleDateString(locale);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

/**
 * Format date with time
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale string (default: 'en-US')
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (date, locale = "en-US") => {
  if (!date) return "N/A";

  try {
    return new Date(date).toLocaleString(locale);
  } catch (error) {
    console.error("Error formatting date time:", error);
    return "Invalid Date";
  }
};

/**
 * Get relative time (e.g., "2 days ago")
 * @param {string|Date} date - Date to compare
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return "N/A";

  try {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return formatDate(date);
  } catch (error) {
    console.error("Error getting relative time:", error);
    return "Invalid Date";
  }
};
