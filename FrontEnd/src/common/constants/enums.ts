export const CompanyStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  DEACTIVATED: "DEACTIVATED"
} as const;

export type CompanyStatus = (typeof CompanyStatus)[keyof typeof CompanyStatus];

export const ActorType = {
  ADMIN: "ADMIN",
  COMPANY_ADMIN: "COMPANY_ADMIN",
  ACCOUNTANT: "ACCOUNTANT"
} as const;

export type ActorType = (typeof ActorType)[keyof typeof ActorType];

export const CompanyAdminRole = {
  ADMIN: "ADMIN",
  EXECUTIVE: "EXECUTIVE"
} as const;

export type CompanyAdminRole = (typeof CompanyAdminRole)[keyof typeof CompanyAdminRole];
