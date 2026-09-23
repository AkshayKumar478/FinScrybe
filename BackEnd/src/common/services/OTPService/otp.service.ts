import {IOtpService} from "./otp.service.interface"
import {OtpValues} from '../../constants/constants'
import { hashValue,compareValue} from '../../utils/bcrypt'
import crypto from 'crypto'

class OtpService implements IOtpService{

 constructor(){

 }
 generate(){
   return crypto.randomInt(OtpValues.min,OtpValues.max).toString()
 }

 hash(otp:string){
   return hashValue(otp)
 }
 verify(otp:string,hashedOtp:string){
  return  compareValue(otp,hashedOtp)
 }

}

export const otpService=new OtpService()