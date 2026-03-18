/**
 * Centralized API Configuration
 * Provides base URL and endpoints for all API services
 * Follows feature-based architecture pattern
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://hcmut-study-backend.onrender.com';

/**
 * API Endpoints organized by feature
 */
export const API_ENDPOINTS = {
  // Auth feature
  AUTH: {
    LOGIN: '/sso/login',
  },
  // Library feature
  LIBRARY: {
    DOCUMENTS: '/library/documents',
  },
  // Student feature
  STUDENT: {
    BOOK_SESSION: '/student/booksession',
    PROFILE_DATA: '/student/getstudentdata'
  },
  TUTOR: {
    PROFILE_DATA: '/tutor/gettutordata'
  }
  // Add more endpoints as needed for other features
};

/**
 * Build full API URL from endpoint
 * @param {string} endpoint - API endpoint path (e.g., '/library/documents')
 * @returns {string} - Full URL
 */
export const buildAPIUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

/**
 * Get specific feature base URL
 * @param {string} feature - Feature name (e.g., 'library', 'auth')
 * @returns {string} - Feature base URL
 */
export const getFeatureBaseUrl = (feature) => {
  const featureUrls = {
    library: `${API_BASE_URL}/library`,
    auth: `${API_BASE_URL}/sso`,
    student: `${API_BASE_URL}/student`,
  };
  return featureUrls[feature] || API_BASE_URL;
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  buildAPIUrl,
  getFeatureBaseUrl,
};
