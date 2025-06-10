import User from "@/models/user";
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs";

export const sendEmail = async (email:string, emailType:string, userId:string) => {

    try {

        const hashedToken = await bcrypt.hash(userId.toString(),10)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken : hashedToken,
                    verifyTokenExpiry : Date.now() + 3600000
                }
            )
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{
                $set:{
                    forgotPasswordToken : hashedToken,
                    forgotPasswordTokenExpiry : Date.now() + 3600000
                }
                }
            )
        }

        const transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "e5c27fe9732e96", // use env
            pass: "33ab81031cbb01" // use env
          }
        });

        const mailOption = {
            from: "office@saumya.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Password reset",
            html: `<p>
            Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verify-email" : "reset-password"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "to reset your password"} or copy and past the link  in your browser. 
            <br> ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verify-email" : "reset-password"}?token=${hashedToken}
            </p>`, // HTML body
        }

        const mailResponese = await transport.sendMail(mailOption)
        //console.log(mailResponese)

        return mailResponese;
    } catch (error:any) {
        throw new Error(error.message)
    }
}