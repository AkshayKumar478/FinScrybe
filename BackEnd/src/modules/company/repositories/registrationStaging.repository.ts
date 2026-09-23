import {IRegistrationRepository} from './registrationStaging.repository.interface'
import {BaseRepository} from '../../../common/base/base.repository'
import {CompanyRegistrationStaging} from '../model/registrationStaging.model'
import { ICompanyRegistrationStaging} from '../model/registrationStaging.model.interface'
export class RegistrationStagingRepository extends BaseRepository<ICompanyRegistrationStaging> implements IRegistrationRepository{

constructor(){
    super(CompanyRegistrationStaging)
}

    async findByCompanyEmail(email:string):Promise<ICompanyRegistrationStaging|null>{
     return  this.findOne({
        companyEmail:email
     })
    }

    async findByAdminEmail(email:string):Promise<ICompanyRegistrationStaging|null>{
        return this.findOne({
            adminEmail:email
        })
    }

}

export const registrationStagingRepository= new RegistrationStagingRepository()