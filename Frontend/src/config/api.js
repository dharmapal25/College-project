/**
 * API Configuration
 * Centralized API endpoint management
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://college-pro.onrender.com/api';

const API_ENDPOINTS = {
  // Auth Endpoints
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    ADMIN_LOGIN: '/auth/admin-login',
    OFFICER_LOGIN: '/auth/officers-login',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    PROFILE: '/auth/profile',
  },
  
  // Enquiry Endpoints
  ENQUIRY: {
    CREATE: '/user-enquiry',
  },
  
  // Officers Endpoints
  OFFICERS: {
    GET_ALL: '/officers-team',
    ADD_OFFICER: '/officers-team/add-officer',
  },
  
  // Logs/Enquiries Endpoints
  LOGS: {
    GET_LOGS: '/logs/logs',
    GET_ALL_LOGS: '/logs/log-all',
    GET_ALL_ENQUIRIES: '/logs/all-enquiries',
    DELETE_LOG: '/logs/logs',
  }
};

/**
 * Build full API URL
 * @param {string} endpoint - API endpoint path
 * @returns {string} - Full API URL
 */
export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

/**
 * Get axios config with credentials
 * @returns {object} - Axios config object
 */
export const getAxiosConfig = () => {
  return {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    }
  };
};

/**
 * Get authorization header
 * @returns {object} - Authorization header
 */
export const getAuthHeader = (token) => {
  if (!token) return {};
  return {
    'Authorization': `Bearer ${token}`
  };
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  getApiUrl,
  getAxiosConfig,
  getAuthHeader
};
