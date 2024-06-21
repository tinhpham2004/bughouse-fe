export const SUCCESS = 200;

export const OTP_EXPIRED = 4001;
export const OTP_WRONG = 4002;
export const NOT_FOUND = 404;

export const USER_EXIST = 405;

export const EMAIL_EXIST = 405;
export const USERNAME_EXIST = 4051;

export const USER_NOT_COMFIRM = 5001;
export const USER_WAS_DISABLE = 5002;
export const USER_NOT_NORMAL = 5003;
export const USER_WAS_ACTIVED = 5004;
export const USER_NOT_ACTIVE = 5005;
export const USER_NOT_EXIST = 404;

export const NOT_AUTHORIZED = 401;

// Source Report

export const SOURCE_REPORT_WAS_RESOLVE = 20002;
export const USER_DISABLED = 5002;

export const OBJECT_EXISTED = 405;


// Client Errors
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const METHOD_NOT_ALLOWED = 405;
export const REQUEST_TIMEOUT = 408;
export const CONFLICT = 409;
export const GONE = 410;
export const UNSUPPORTED_MEDIA_TYPE = 415;

// Custom Error Codes

export const USER_NOT_CONFIRM = 5001;
export const USER_WAS_ACTIVATED = 5004;

// Server Errors
export const INTERNAL_SERVER_ERROR = 500;
export const NOT_IMPLEMENTED = 501;
export const BAD_GATEWAY = 502;
export const SERVICE_UNAVAILABLE = 503;
export const GATEWAY_TIMEOUT = 504;

// Source Report
export const SOURCE_REPORT_WAS_RESOLVED = 20002;

// Additional Custom Error Codes
export const INVALID_INPUT = 422;
export const TOO_MANY_REQUESTS = 429;
export const TOKEN_EXPIRED = 498;
export const TOKEN_INVALID = 499;

export const INSUFFICIENT_STORAGE = 507;
export const LOOP_DETECTED = 508;
export const NETWORK_AUTHENTICATION_REQUIRED = 511;

// Custom Success Codes
export const RESOURCE_CREATED = 201;
export const ACCEPTED = 202;
export const NO_CONTENT = 204;
export const PARTIAL_CONTENT = 206;

// Custom Redirection Codes
export const MOVED_PERMANENTLY = 301;
export const FOUND = 302;
export const NOT_MODIFIED = 304;
export const TEMPORARY_REDIRECT = 307;
export const PERMANENT_REDIRECT = 308;

