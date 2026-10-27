export const AUTH_RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000,
  MAX_REQUESTS: 10,
} as const;

export const ERROR_MESSAGES = {
  TOO_MANY_AUTH_ATTEMPTS:
    "Too many authentication attempts. Please try again later.",
  INVALID_REQUEST_BODY: "Invalid request body",
  INVALID_JSON_BODY: "Invalid JSON body",
  INTERNAL_SERVER_ERROR: "Internal server error",
  SIGNUP_REQUIRED: "Email, password, and name are required",
  SIGNUP_INVALID_TYPES: "Email, password, and name must be strings",
  SIGNUP_EMPTY_FIELDS: "Email and name cannot be empty",
  PASSWORD_TOO_SHORT: "Password must be at least 8 characters",
  EMAIL_ALREADY_REGISTERED: "Email already registered",
  INVALID_USER_DATA: "Invalid user data",
  SIGNIN_REQUIRED: "Email and password are required",
  SIGNIN_INVALID_TYPES: "Email and password must be strings",
  INVALID_CREDENTIALS: "Invalid credentials",
  USER_NOT_FOUND: "User not found",
  INSTRUMENT_REQUIRED: "Brand, model, and category are required",
  INVALID_INSTRUMENT_DATA: "Invalid instrument data",
  INVALID_INSTRUMENT_ID: "Invalid instrument ID",
  INSTRUMENT_NOT_FOUND: "Instrument not found",
  NO_VALID_FIELDS: "No valid fields to update",
  INSTRUMENT_DELETE_FORBIDDEN:
    "You do not have permission to delete this instrument",
  AUTH_TOKEN_REQUIRED: "Authorization token required",
  INVALID_OR_EXPIRED_TOKEN: "Invalid or expired token",
} as const;

export const SUCCESS_MESSAGES = {
  INSTRUMENT_DELETED: "Instrument deleted successfully",
} as const;
