/**
 * Centralized API Configuration
 * Provides base URL and endpoints for all API services
 * Follows feature-based architecture pattern
 */

/*export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://hcmut-study-backend.onrender.com'*/
export const API_BASE_URL = 'http://localhost:5000'
//;

/**
 * API Endpoints organized by feature
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
  },
  LIBRARY: {
    DOCUMENTS: '/library/documents',
  },
  SCHEDULE: {
    CANCEL_BEFORE_ACCEPT: '/student/cancelbeforeaccept',
    DELETE_CANCELLED: '/student/deletecancelled',
    GET_TUTOR_SCHEDULE: '/schedule/tutor-schedule'
  },
  APPOINTMENT: {
    GET_APPOINTMENT: '/appointments',
    MAKE_APPOINTMENT: '/appointments', 
    RESCHEDULE: '/appointments'
  },
  PROFILE: {
    USER_PROFILE: '/user/profile',
    TUTOR_PROFILE: '/user/tutor-profile',
    TUTOR_LIST: '/user/tutor-list'
  }
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
