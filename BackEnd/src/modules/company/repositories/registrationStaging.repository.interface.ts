
import {IBaseRepository} from '../../../common/base/base.repository.interface'
import {ICompanyRegistrationStaging} from '../model/registrationStaging.model.interface'
export interface IRegistrationRepository extends IBaseRepository<ICompanyRegistrationStaging>{
    findByAdminEmail(email:string):Promise<ICompanyRegistrationStaging|null>
    findByCompanyEmail(email:string):Promise<ICompanyRegistrationStaging| null>
}