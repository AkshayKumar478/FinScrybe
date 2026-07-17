import { NotFoundError } from "../../../common/errors/NotFoundError";
import { adminRepository, IAdminRepository } from "../repositories/admin.repository";
import { AdminProfileDto, mapAdminProfile } from "../mappers/admin.mapper";
import { ConflictError } from "../../../common/errors/ConflictError";
import { ForbiddenError } from "../../../common/errors/ForbiddenError";
import { UnauthorizedError } from "../../../common/errors/UnauthorizedError";
import { compareValue, hashValue } from "../../../common/utils/bcrypt";
import { SuperAdminLoginInput } from "../validators/admin.validation";
import{AuthRe}


class AdminService {
  constructor(private readonly repository: IAdminRepository) {}

  async getProfile(adminId: string): Promise<AdminProfileDto> {
    const admin = await this.repository.findById(adminId);

    if (!admin) {
      throw new NotFoundError("Admin not found");
    }

    return mapAdminProfile(admin);
  }

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
  

  
}

export const adminService = new AdminService(adminRepository);
