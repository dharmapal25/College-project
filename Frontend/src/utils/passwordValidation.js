/**
 * Password Validation Utility
 * Validates password strength and requirements
 */

export const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - Validation result
 */
export const validatePassword = (password) => {
  const requirements = {
    minLength: password.length >= PASSWORD_REQUIREMENTS.minLength,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumbers: /\d/.test(password),
    hasSpecialChars: /[@$!%*?&]/.test(password),
  };

  const isStrong = Object.values(requirements).every(req => req);

  return {
    isStrong,
    requirements,
    message: getPasswordMessage(requirements)
  };
};

/**
 * Get password validation message
 */
const getPasswordMessage = (requirements) => {
  const missing = [];

  if (!requirements.minLength) missing.push(`at least ${PASSWORD_REQUIREMENTS.minLength} characters`);
  if (!requirements.hasUppercase) missing.push('one uppercase letter');
  if (!requirements.hasLowercase) missing.push('one lowercase letter');
  if (!requirements.hasNumbers) missing.push('one number');
  if (!requirements.hasSpecialChars) missing.push('one special character (@$!%*?&)');

  if (missing.length === 0) return 'Password is strong!';
  
  return `Password must contain: ${missing.join(', ')}`;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid email
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Get password strength percentage
 */
export const getPasswordStrength = (password) => {
  const requirements = validatePassword(password).requirements;
  const met = Object.values(requirements).filter(req => req).length;
  return Math.round((met / Object.keys(requirements).length) * 100);
};

/**
 * Get password strength color
 */
export const getPasswordStrengthColor = (password) => {
  const strength = getPasswordStrength(password);
  if (strength < 40) return '#ef4444'; // red
  if (strength < 60) return '#f97316'; // orange
  if (strength < 80) return '#eab308'; // yellow
  return '#22c55e'; // green
};

export default {
  PASSWORD_REQUIREMENTS,
  validatePassword,
  validateEmail,
  getPasswordStrength,
  getPasswordStrengthColor
};
