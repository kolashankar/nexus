/**
 * Validation utilities for forms and data
 */

/**
 * Email validation
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Username validation
 */
export function isValidUsername(username: string): boolean {
  // 3-20 characters, alphanumeric and underscores only
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

/**
 * Password strength validation
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length < 8) {
    feedback.push('Password should be at least 8 characters long');
  } else {
    score++;
  }

  // Uppercase check
  if (!/[A-Z]/.test(password)) {
    feedback.push('Include at least one uppercase letter');
  } else {
    score++;
  }

  // Lowercase check
  if (!/[a-z]/.test(password)) {
    feedback.push('Include at least one lowercase letter');
  } else {
    score++;
  }

  // Number check
  if (!/\d/.test(password)) {
    feedback.push('Include at least one number');
  } else {
    score++;
  }

  // Special character check
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    feedback.push('Include at least one special character');
  } else {
    score++;
  }

  let strength: 'weak' | 'medium' | 'strong';
  if (score <= 2) {
    strength = 'weak';
  } else if (score <= 4) {
    strength = 'medium';
  } else {
    strength = 'strong';
  }

  return {
    isValid: score >= 3,
    strength,
    feedback
  };
}

/**
 * Number range validation
 */
export function isInRange(
  value: number,
  min: number,
  max: number
): boolean {
  return value >= min && value <= max;
}

/**
 * Required field validation
 */
export function isRequired(value: any): boolean {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
}

/**
 * URL validation
 */
export function isValidUrl(url: string): boolean {
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
export function isValidCreditCard(cardNumber: string): boolean {
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
export function validateForm<T extends Record<string, any>>(
  values: T,
  rules: Record<keyof T, Array<(value: any) => string | null>>
): Record<keyof T, string | null> {
  const errors = {} as Record<keyof T, string | null>;

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
  required: (message: string = 'This field is required') => (value: any) => {
    return isRequired(value) ? null : message;
  },

  email: (message: string = 'Invalid email address') => (value: string) => {
    return isValidEmail(value) ? null : message;
  },

  minLength: (min: number, message?: string) => (value: string) => {
    return value.length >= min
      ? null
      : message || `Minimum ${min} characters required`;
  },

  maxLength: (max: number, message?: string) => (value: string) => {
    return value.length <= max
      ? null
      : message || `Maximum ${max} characters allowed`;
  },

  pattern: (regex: RegExp, message: string) => (value: string) => {
    return regex.test(value) ? null : message;
  },

  numeric: (message: string = 'Must be a number') => (value: any) => {
    return !isNaN(Number(value)) ? null : message;
  },

  range: (min: number, max: number, message?: string) => (value: number) => {
    return isInRange(value, min, max)
      ? null
      : message || `Value must be between ${min} and ${max}`;
  }
};
