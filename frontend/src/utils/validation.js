/**
 * Validation utilities for forms and data
 */

/**
 * Email validation
 */
export function isValidEmail(email){
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Username validation
 */
export function isValidUsername(username){
  // 3-20 characters, alphanumeric and underscores only
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

/**
 * Password strength validation
 */
export function validatePasswordStrength(password){
  isValid;
  strength;
  feedback;
} {
  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length ]/.test(password)) {
    feedback.push('Include at least one special character');
  } else {
    score++;
  }

  let strength;
  if (score = 3,
    strength,
    feedback
  };
}

/**
 * Number range validation
 */
export function isInRange(
  value,
  min,
  max){
  return value >= min && value  0;
  }
  return value !== null && value !== undefined;
}

/**
 * URL validation
 */
export function isValidUrl(url){
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Credit card number validation (Luhn algorithm)
 */
export function isValidCreditCard(cardNumber){
  const cleanNumber = cardNumber.replace(/\s/g, '');
  
  if (!/^\d{13,19}$/.test(cleanNumber)) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Form validation helper
 */
export function validateForm>(
  values,
  rules){
  const errors = {};

  for (const field in rules) {
    const fieldRules = rules[field];
    const value = values[field];

    for (const rule of fieldRules) {
      const error = rule(value);
      if (error) {
        errors[field] = error;
        break; // Stop at first error for this field
      }
    }
  }

  return errors;
}

/**
 * Common validation rules
 */
export const validationRules = {
  required: (message: string = 'This field is required') => (value) => {
    return isRequired(value) ? null : message;
  },

  email: (message: string = 'Invalid email address') => (value) => {
    return isValidEmail(value) ? null : message;
  },

  minLength, message?: string) => (value) => {
    return value.length >= min
      ? null
      : message || `Minimum ${min} characters required`;
  },

  maxLength, message?: string) => (value) => {
    return value.length  (value) => {
    return regex.test(value) ? null : message;
  },

  numeric: (message: string = 'Must be a number') => (value) => {
    return !isNaN(Number(value)) ? null : message;
  },

  range, max, message?: string) => (value) => {
    return isInRange(value, min, max)
      ? null
      : message || `Value must be between ${min} and ${max}`;
  }
};
