import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";

connectDB();

export async function PATCH(request: NextRequest) {
    try {
        const {prevToken} = await request.json();

        const user = await User.findOne({verifyToken: prevToken })

        if(!user){
            return NextResponse.json({error: "User already verified"}, {status: 400})
        }

        //re-send verification email
        await sendEmail(user.email, "VERIFY", user._id)

        return NextResponse.json({
            message:"New verification link sent",
            success: true
        },{
            status: 200
        })

    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({error: error.message}, {status:500})
        }else{
            return NextResponse.json({error: "Something went wrong"}, {status:500})
        }
        
    }
}