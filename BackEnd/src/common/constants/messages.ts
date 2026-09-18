
// COMPANY REGISTRATION MESSAGES


export enum CompanyRegistrationMessage {
  REGISTRATION_SUCCESS = "Company registered successfully",
  REGISTRATION_SUBMITTED_SUCCESS = "Company registration submitted successfully",
  REGISTRATION_FAILED = "Company registration failed",

  COMPANY_REGISTRATION_TRANSACTION_INCOMPLETE = "Company registration transaction did not complete",

  COMPANY_ALREADY_EXISTS = "Company already exists",
  COMPANY_ID_REQUIRED = "Company id is required",
  COMPANY_NOT_FOUND = "Company not found",
  EMAIL_ALREADY_EXISTS = "Email already exists",
  PHONE_ALREADY_EXISTS = "Phone number already exists",   
  COMPANY_OR_COMPANY_ADMIN_EXISTS= "Company or company admin already exists",


  PENDING_APPROVAL = "Company registration is pending approval",
  APPROVED = "Company registration approved successfully",
  REJECTED = "Company registration rejected",
}

export enum CompanyValidation {
  COMPANY_NAME_REQUIRED = "Company name is required",
  COMPANY_PHONE_REQUIRED = "Company phone is required",
  INDUSTRY_REQUIRED="Industry is required",
  COMPANY_VALID_EMAIL = "A valid company email is required",
  EMAIL_ALREADY_EXISTS = "Email already exists",
  PHONE_ALREADY_EXISTS = "Phone number already exists",   
  COMPANY_OR_COMPANY_ADMIN_EXISTS= "Company or company admin already exists",
 


}




// SUPER ADMIN MESSAGES


export enum SuperAdminMessage {
  
  LOGIN_SUCCESS = "Super admin login successful",
  LOGIN_FAILED = "Super admin login failed",
  INVALID_CREDENTIALS = "Invalid email or password",
  NOT_FOUND = "Super admin not found",

  AUTHENTICATED_USER_NOT_FOUND ="Authenticated Admin no longer exists",
  LOGOUT_SUCCESS = "Super admin logout successful",
  LOGOUT_FAILED = "Super admin logout failed",
}



// COMPANY ADMIN MESSAGES


export enum CompanyAdminMessage {
  
  COMPANY_ADMIN_FULL_NAME = "Admin full name is required",
  LOGIN_SUCCESS = "Company admin login successful",
  LOGIN_FAILED = "Company admin login failed",
  INVALID_CREDENTIALS = "Invalid email or password",
  VALID_EMAIL_REQUIRED = "A valid admin email is required",
  NOT_FOUND = "Company admin not found",
  COMPANY_ADMIN_EMAIL_ALREADY_REGISTERED = "Company  admin email already registered",
  COMPANY_ADMIN_NOT_LINKED = "Company admin is not linked to a company",
  ACCOUNT_NOT_APPROVED = "Company admin account is not approved",
  ACCOUNT_INACTIVE = "Company admin account is inactive",
  

  
  LOGOUT_SUCCESS = "Company admin logout successful",
  LOGOUT_FAILED = "Company admin logout failed",
}



// ACCOUNTANT MESSAGES


export enum AccountantMessage {
  
  LOGIN_SUCCESS = "Accountant login successful",
  LOGIN_FAILED = "Accountant login failed",
  INVALID_CREDENTIALS = "Invalid email or password",
  NOT_FOUND = "Accountant not found",

  ACCOUNT_INACTIVE = "Accountant account is inactive",

  
  LOGOUT_SUCCESS = "Accountant logout successful",
  LOGOUT_FAILED = "Accountant logout failed",


  INVITATION_SENT = "Accountant invitation sent successfully",
  INVITATION_FAILED = "Failed to send accountant invitation",

  INVITATION_ACCEPTED = "Accountant invitation accepted successfully",
  INVITATION_ACCEPT_FAILED =
    "Failed to accept accountant invitation",

  INVITATION_NOT_FOUND = "Accountant invitation not found",
  INVALID_INVITATION = "Invalid accountant invitation",
  INVITATION_EXPIRED = "Accountant invitation has expired",

  INVITATION_ALREADY_ACCEPTED =
    "Accountant invitation has already been accepted",

  ACCOUNTANT_ALREADY_EXISTS = "An accountant with this email already exists",
  ACCOUNTANT_COMPANY_NOT_LINKED = "Accountant is not linked to a company",
}



// JWT MESSAGES


export enum JwtMessage {
  ACCESS_TOKEN_REQUIRED = "Access token is required",
  INVALID_ACCESS_TOKEN = "Invalid access token",
  ACCESS_TOKEN_EXPIRED = "Access token has expired",

  REFRESH_TOKEN_REQUIRED = "Refresh token is required",
  INVALID_REFRESH_TOKEN = "Invalid refresh token",
  REFRESH_TOKEN_EXPIRED = "Refresh token has expired",
  Token_REFRESHED="Token Refreshed",

  INVALID_OR_EXPIRED_ACCESS_TOKEN =
    "Invalid or expired access token",
      
  INVALID_OR_EXPIRED_REFRESH_TOKEN =
    "Invalid or expired refresh token",
     INVALID_OR_EXPIRED_TOKEN =
    "Invalid or expired token",

  AUTHENTICATED_USER_NOT_FOUND ="Authenticated user no longer exists",
  AUTHENTICATION_REQUIRED ="Authentication Require",
}


// VALIDATION MESSAGES


export enum ValidationMessage {
  FAILED = "Validation failed",
  INVALID_DATA = "Invalid data provided",

  REQUIRED_FIELD = "Required field is required",
  INVALID_EMAIL = "Invalid email address",
  INVALID_PHONE = "Invalid phone number",
  INVALID_PASSWORD = "Invalid password",
  PASSWORD_MUST_CONTAIN = "Password minimum 8 characters is required",
  

  PASSWORD_MISMATCH = "Passwords do not match",
}



// DATABASE MESSAGES


export enum DatabaseMessage {
  VALIDATION_FAILED = "Database validation failed",

  DUPLICATE_VALUE =
    "Duplicate value violates a unique constraint",

  FIELD_ALREADY_EXISTS = "already exists",

  OPERATION_FAILED = "Database operation failed",
}



// GENERAL MESSAGES


export enum GeneralMessage {
  SUCCESS = "Operation completed successfully",
  FAILED = "Operation failed",

  NOT_FOUND = "Resource not found",

  INTERNAL_SERVER_ERROR = "Internal server error",
  SOMETHING_WENT_WRONG = "Something went wrong",

  INVALID_REQUEST = "Invalid request",
  REQUEST_FAILED = "Request failed",

  ACCESS_DENIED = "Access denied",
  FORBIDDEN = "You do not have permission to perform this action",
  ACTOR_HAS_NO_SCOPED_COMPANY="This actor type has no scoped company"
}


// BASIC ERROR MESSAGES


export enum ErrorMessage {
  UNAUTHORIZED = "Unauthorized",
  RESOURCE_CONFLICT_ERROR="Resource conflict",
  FORBIDDEN = "Forbidden",
  NOT_FOUND = "Not Found",
  INTERNAL_SERVER_ERROR = "Internal server error",
  INVALID_OR_EXPIRED_TOKEN = "Invalid or expired token",
  VALIDATION_FAILED = "Validation failed",
}


// AUTHORIZATION MESSAGES


export enum AuthorizationMessage {
  AUTHENTICATION_REQUIRED = "Authentication is required",

  ACTOR_TYPE_NOT_ALLOWED = "You do not have access to this resource",

  PERMISSION_DENIED = "You do not have permission for this action",
}