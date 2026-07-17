import { ConflictError } from "../../../common/errors/ConflictError";
import { ForbiddenError } from "../../../common/errors/ForbiddenError";
import { UnauthorizedError } from "../../../common/errors/UnauthorizedError";
import { compareValue, hashValue } from "../../../common/utils/bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../common/utils/jwt";
import { ActorType, CompanyStatus } from "../../../common/types";
import { authRepository } from "../repositories/auth.repository";
import {
  IAuthLoginRepository,
  ICompanySummary,
  ICompanyScopedActor,
  IPasswordActor,
  IActiveActor,
} 
import {
  AuthResponse,
  CompanyRegistrationResponse,
  mapAuthResponse,
  mapCompanyRegistrationResponse,
} from "../mappers/auth.mapper";
import {
  AccountantLoginInput,
  CompanyAdminLoginInput,
  CompanyRegistrationInput,
  SuperAdminLoginInput,
} from "../validators/auth.validation";

const DUMMY_PASSWORD_HASH =
  "$2b$10$7kB3K0m2v7Qx0m2Z8wR5euE0r1w6m9j6W5Qwq0Q0h3H2mD8A3VnQK";

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  constructor(private readonly repository: IAuthLoginRepository) {}

  async loginSuperAdmin(
    payload: SuperAdminLoginInput
  ): Promise<AuthResponse> {
    const admin = await this.requireValidCredentials(
      () => this.repository.findSuperAdminByEmail(payload.email),
      payload.password
    );

    this.assertActiveAccount(admin.isActive, "Super admin account is inactive");

    const lastLogin = new Date();
    this.repository
      .updateSuperAdminLastLogin(admin._id.toString(), lastLogin)
      .catch(() => undefined);

    return this.buildAuthResponse({
      message: "Super admin login successful",
      actorType: ActorType.ADMIN,
      user: admin,
    });
  }

  async registerCompany(
    payload: CompanyRegistrationInput
  ): Promise<CompanyRegistrationResponse> {
    await this.assertCompanyRegistrationAvailability(payload);

    const hashedPassword = await hashValue(payload.adminPassword);

    const { company, companyAdmin } =
      await this.repository.createCompanyRegistration({
        company: {
          companyName: payload.companyName,
          industry: payload.industry,
          companyEmail: payload.companyEmail,
          companyPhone: payload.companyPhone,
        },
        companyAdmin: {
          fullName: payload.adminFullName,
          email: payload.adminEmail,
          password: hashedPassword,
          phoneNumber: payload.adminPhoneNumber,
        },
      });

    return mapCompanyRegistrationResponse(company, companyAdmin);
  }

  async loginCompanyAdmin(
    payload: CompanyAdminLoginInput
  ): Promise<AuthResponse> {
    const companyAdmin = await this.requireValidCredentials(
      () => this.repository.findCompanyAdminByEmail(payload.email),
      payload.password
    );
    
    this.assertActiveAccount(
      companyAdmin.isActive,
      "Company admin account is inactive"
    );

    const company = await this.requireApprovedCompany(companyAdmin.companyId.toString());

    const lastLogin = new Date();
    this.repository
      .updateCompanyAdminLastLogin(companyAdmin._id.toString(), lastLogin)
      .catch(() => undefined);

    return this.buildAuthResponse({
      message: "Company admin login successful",
      actorType: ActorType.COMPANY_ADMIN,
      user: companyAdmin,
      company,
    });
  }

  async loginAccountant(
    payload: AccountantLoginInput
  ): Promise<AuthResponse> {
    const accountant = await this.requireValidCredentials(
      () => this.repository.findAccountantByEmail(payload.email),
      payload.password
    );
    
    this.assertActiveAccount(
      accountant.isActive,
      "Accountant account is inactive"
    );

    const company = await this.requireApprovedCompany(accountant.companyId.toString());

    const lastLogin = new Date();
    this.repository
      .updateAccountantLastLogin(accountant._id.toString(), lastLogin)
      .catch(() => undefined);

    return this.buildAuthResponse({
      message: "Accountant login successful",
      actorType: ActorType.ACCOUNTANT,
      user: accountant,
      company,
    });
  }

  private async assertCompanyRegistrationAvailability(
    payload: CompanyRegistrationInput
  ): Promise<void> {
    const [existingCompany, existingCompanyAdmin] = await Promise.all([
      this.repository.findCompanyByEmail(payload.companyEmail),
      this.repository.findCompanyAdminByEmail(payload.adminEmail),
    ]);

    if (existingCompany) {
      throw new ConflictError("Company email is already registered");
    }

    if (existingCompanyAdmin) {
      throw new ConflictError("Company admin email is already registered");
    }
  }

  private async requireValidCredentials<T extends IPasswordActor>(
    getUser: () => Promise<T | null>,
    password: string
  ): Promise<T> {
    const user = await getUser();
    const hashToCompare = user?.password ?? DUMMY_PASSWORD_HASH;
    const isPasswordValid = await compareValue(password, hashToCompare);

    if (!user || !isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    return user;
  }

  private assertActiveAccount(
    isActive: boolean,
    message: string
  ): void {
    if (!isActive) {
      throw new ForbiddenError(message);
    }
  }

  private async requireApprovedCompany(
    companyId: string
  ): Promise<ICompanySummary> {
    const company = await this.repository.findCompanyById(companyId);

    if (!company || company.status !== CompanyStatus.APPROVED) {
      throw new ForbiddenError("Company is not approved to access the platform");
    }

    return company;
  }

  private buildAuthResponse({
    message,
    actorType,
    user,
    company,
  }: {
    message: string;
    actorType: ActorType;
    user: IActiveActor | ICompanyScopedActor | IPasswordActor;
    company?: ICompanySummary;
  }): AuthResponse {
    const tokens = this.generateTokens(user._id.toString(), actorType);

    return mapAuthResponse({
      message,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      actorType,
      user,
      company,
    });
  }

  private generateTokens(
    id: string,
    actorType: ActorType
  ): AuthTokens {
    const payload = { id, actorType };

    return {
      accessToken: generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload),
    };
  }
}

export const authService = new AuthService(authRepository);
