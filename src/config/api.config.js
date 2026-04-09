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
    TUTOR_MODE: '/auth/tutor-mode'
  },
  SCHEDULE: {
    GET_TUTOR_SCHEDULE: '/schedule/tutor-schedule',
    ADD_SLOT: '/schedule/slot',
    DELETE_SLOT: '/schedule/slot'
  },
  APPOINTMENT: {
    GET_APPOINTMENT: '/appointments',
    MAKE_APPOINTMENT: '/appointments', 
    RESCHEDULE: '/appointments',
    ACCEPT: '/appointments',
    CANCEL: '/appointments?action=cancelled',
    DECLINE: '/appointments?action=declined',
    DELETE_HISTORY: '/appointments/history',
    CANCEL_BEFORE_ACCEPT: '/appointments/pending',
  },
  ROADMAP: {
    GOAL: '/roadmap', 
    GET_ROADMAP: '/roadmap',
    SUITABLE_TUTORS: '/roadmap/suitable-tutors'
  },
  RATING: {
    RATE: '/rating'
  },
  REPORT: '/report',
  DOCUMENT: '/documents',
  PROFILE: {
    USER_PROFILE: '/user/profile',
    TUTOR_PROFILE: '/user/tutor-profile',
    TUTOR_LIST: '/user/tutor-list'
  }
};

/**
 * Build full API URL from endpoint
 * @param {string} endpoint 
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
