export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

export const validateEmail = (value: string): string => {
  if (!value.trim()) return "Please enter your work email.";
  if (!EMAIL_REGEX.test(value.trim())) {
    return "Please enter a valid email address.";
  }
  return "";
};

export const validatePassword = (value: string): string => {
  if (!value.trim()) return "Please enter your password.";
  return "";
};

export interface PasswordStrength {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasNumberOrSymbol: boolean;
  isStrong: boolean;
}

export const getPasswordStrength = (password: string): PasswordStrength => {
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumberOrSymbol = /[\d!@#$%^&*(),.?":{}|<>]/.test(password);
  return {
    hasMinLength,
    hasUppercase,
    hasNumberOrSymbol,
    isStrong: hasMinLength && hasUppercase && hasNumberOrSymbol,
  };
};
