import { NotFoundError } from "../../../common/errors/NotFoundError";
import { adminRepository, IAdminRepository } from "../repositories/admin.repository";
import { AdminProfileDto, mapAdminProfile } from "../mappers/admin.mapper";

class AdminService {
  constructor(private readonly repository: IAdminRepository) {}

  async getProfile(adminId: string): Promise<AdminProfileDto> {
    const admin = await this.repository.findById(adminId);

    if (!admin) {
      throw new NotFoundError("Admin not found");
    }

    return mapAdminProfile(admin);
  }
}

export const adminService = new AdminService(adminRepository);
