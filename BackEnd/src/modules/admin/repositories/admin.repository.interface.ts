import {IAdmin} from '../model/admin.model.interface'
import { IBaseRepository} from '../../../common/base/base.repository.interface'

export interface IAdminRepository extends IBaseRepository<IAdmin>  {

  findAll(): Promise<IAdmin[]>;

  findByEmail(email: string): Promise<IAdmin | null>;
  findByEmailWithPassword(email: string): Promise<IAdmin | null>;
  updateLastLogin(id: string, lastLogin: Date): Promise<IAdmin | null>;
  updatePassword(id:string,password:string): Promise<IAdmin|null>

}