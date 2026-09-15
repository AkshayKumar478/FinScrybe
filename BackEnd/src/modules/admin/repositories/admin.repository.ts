import {BaseRepository} from "../../../common/base/base.repository";
import {Admin } from "../model/admin.model";
import { IAdmin} from"../model/admin.model.interface"
import { promises } from "dns";
import{IAdminRepository} from './admin.repository.interface'



export class AdminRepository extends BaseRepository<IAdmin> implements IAdminRepository 
{
  constructor( ) {
  super(Admin)
  }
   
    

  async findByEmail(email: string): Promise<IAdmin | null> {
    return this.findOne({ email });
  }

  async findAll(): Promise<IAdmin[]> {
    return this.findMany();
  }

  async findByEmailWithPassword(
    email: string
  ): Promise<IAdmin | null> {
    return this.findOne({ email }, "+password");
  }

  async updateLastLogin(
    id: string,
    lastLogin: Date
  ): Promise<IAdmin | null> {
    return this.updateById(id, { lastLogin });
  }
  async updatePassword(
  id: string,
  password: string
): Promise<IAdmin | null> {
  return this.updateById(id, { password });
}

 
}
export const adminRepository=new AdminRepository()
