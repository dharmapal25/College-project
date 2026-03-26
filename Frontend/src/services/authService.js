/**
 * Authentication Service
 * Handles all authentication operations
 */

import axios from 'axios';
import { API_ENDPOINTS, getApiUrl, getAxiosConfig } from '../config/api';

// ✅ Set axios default config
axios.defaults.withCredentials = true;

class AuthService {
  /**
   * Register a new user
   */
  static async register(userData) {
    try {
      const response = await axios.post(
        getApiUrl(API_ENDPOINTS.AUTH.REGISTER),
        userData,
        getAxiosConfig()
      );
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      return { success: false, error: message };
    }
  }

  /**
   * Login user
   */
  static async login(email, password) {
    try {
      const response = await axios.post(
        getApiUrl(API_ENDPOINTS.AUTH.LOGIN),
        { email, password },
        getAxiosConfig()
      );

      if (response.data.success && response.data.token) {
        // Store user data
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userEmail', response.data.user.email);
        localStorage.setItem('token', response.data.token);
      }

      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return { success: false, error: message };
    }
  }

  /**
   * Admin login
   */
  static async adminLogin(email, password) {
    try {
      const response = await axios.post(
        getApiUrl(API_ENDPOINTS.AUTH.ADMIN_LOGIN),
        { email, password },
        getAxiosConfig()
      );

      if (response.data.success) {
        localStorage.setItem('adminToken', 'authenticated');
      }

      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Admin login failed';
      return { success: false, error: message };
    }
  }

  /**
   * Officer login
   */
  static async officerLogin(email, password) {
    try {
      const response = await axios.post(
        getApiUrl(API_ENDPOINTS.AUTH.OFFICER_LOGIN),
        { email, password },
        getAxiosConfig()
      );

      if (response.data.success) {
        localStorage.setItem('officerData', JSON.stringify(response.data.officer));
      }

      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Officer login failed';
      return { success: false, error: message };
    }
  }

  /**
   * Logout user
   */
  static async logout() {
    try {
      await axios.post(
        getApiUrl(API_ENDPOINTS.AUTH.LOGOUT),
        {},
        getAxiosConfig()
      );

      // Clear local storage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('officerData');

      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local storage even if API call fails
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      return { success: true };
    }
  }

  /**
   * Refresh access token
   */
  static async refreshToken() {
    try {
      const response = await axios.post(
        getApiUrl(API_ENDPOINTS.AUTH.REFRESH_TOKEN),
        {},
        getAxiosConfig()
      );

      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      return { success: true, data: response.data };
    } catch (error) {
      console.error('Token refresh failed:', error);
      // If refresh fails, clear auth
      localStorage.removeItem('token');
      return { success: false, error: 'Session expired. Please login again.' };
    }
  }

  /**
   * Get current user profile
   */
  static async getProfile() {
    try {
      const response = await axios.get(
        getApiUrl(API_ENDPOINTS.AUTH.PROFILE),
        getAxiosConfig()
      );

      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch profile';
      return { success: false, error: message };
    }
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  /**
   * Get current user data
   */
  static getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Get token
   */
  static getToken() {
    return localStorage.getItem('token');
  }

  /**
   * Check if admin is authenticated
   */
  static isAdminAuthenticated() {
    return !!localStorage.getItem('adminToken');
  }

  /**
   * Check if officer is authenticated
   */
  static isOfficerAuthenticated() {
    const officerData = localStorage.getItem('officerData');
    return !!officerData;
  }

  /**
   * Get officer data
   */
  static getOfficerData() {
    const officerData = localStorage.getItem('officerData');
    return officerData ? JSON.parse(officerData) : null;
  }
}

export default AuthService;
