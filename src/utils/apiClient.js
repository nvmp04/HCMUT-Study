/**
 * API Client wrapper around fetchAPI
 * Automatically prepends base URL to endpoints
 * Works with feature-based architecture
 */

import { fetchAPI } from './fetchAPI';
import { buildAPIUrl } from '../config/api.config';

/**
 * Create an API client for a specific feature
 * @param {string} baseEndpoint - Base endpoint for the feature (e.g., '/library', '/student')
 * @returns {Object} - API client with methods for common HTTP verbs
 */
export const createFeatureClient = (baseEndpoint) => {
  return {
    get: (path, auth = false) =>
      fetchAPI(buildAPIUrl(`${baseEndpoint}${path}`), 'GET', null, auth),
    
    post: (path, data, auth = false, isFormData = false) =>
      fetchAPI(buildAPIUrl(`${baseEndpoint}${path}`), 'POST', data, auth, isFormData),
    
    put: (path, data, auth = false) =>
      fetchAPI(buildAPIUrl(`${baseEndpoint}${path}`), 'PUT', data, auth),
    
    delete: (path, auth = false) =>
      fetchAPI(buildAPIUrl(`${baseEndpoint}${path}`), 'DELETE', null, auth),
  };
};

/**
 * Simple wrapper to use full endpoints with automatic base URL
 * @param {string} endpoint - Full endpoint path (e.g., '/library/documents')
 * @param {string} method - HTTP method
 * @param {*} data - Request data
 * @param {boolean} auth - Include authorization
 * @param {boolean} isFormData - Is FormData
 * @returns {Promise}
 */
export const apiCall = (endpoint, method = 'GET', data = null, auth = false, isFormData = false) =>
  fetchAPI(buildAPIUrl(endpoint), method, data, auth, isFormData);

export default {
  createFeatureClient,
  apiCall,
};
