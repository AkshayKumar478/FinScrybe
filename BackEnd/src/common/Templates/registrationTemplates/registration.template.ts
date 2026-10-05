export function otpTemplate(adminFullName:string,otp:String,otpExpireIn:number){
 return(`
         <div>
           <h2>FinScrybe Email Verification</h2>
 
           <p>Hello ${adminFullName},</p>
 
           <p>
             Your OTP for completing your FinScrybe company
             registration is:
           </p>
 
           <h1>${otp}</h1>
 
           <p>
             This OTP will expire in
             ${otpExpireIn} minutes.
           </p>
 
           <p>
             If you did not initiate this registration,
             you can safely ignore this email.
           </p>
         </div>
       `)
}



export function otpResendTemplate(otp:string,expireIn:number){
    return (   `<div>
            <h2>FinScrybe Email Verification</h2>
            <p>Your new OTP is:</p>
            <h1>${otp}</h1>
            <p>This OTP will expire in ${expireIn} minutes.</p>
          </div>
        `)
}