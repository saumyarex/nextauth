import User from "@/models/user";
import { sendEmail } from "@/helpers/mailer";
import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";


connectDB();

export const POST = async (request: NextRequest) => {
    try {
        const reqBody =  await request.json();
    
        const {usernameOrEmail} = reqBody;

        const user = await User.findOne({
            $or : [
                {email: usernameOrEmail},
                {username: usernameOrEmail}
            ]
        })

        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        // send forgot password email
        await sendEmail(user.email, 'RESET', user._id)

        return NextResponse.json({
            success: true,
            message: "Password reset link sent"
        },{
            status: 200
        })
    } catch (error: unknown) {
        if(error instanceof Error){
            return NextResponse.json({errror : error.message}, {status:500})
        }else{
            return NextResponse.json({errror : "Something went wrong"}, {status:500})
        }
    }

}