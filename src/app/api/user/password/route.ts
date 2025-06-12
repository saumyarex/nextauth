import User from "@/models/user";
import bcrypt from "bcryptjs";
import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function PATCH (request: NextRequest) {
    try {

        const reqBody = await request.json();

        const {password, resetToken} = reqBody;

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.findOneAndUpdate({
            forgotPasswordToken: resetToken,
            forgotPasswordTokenExpiry: {$gt : Date.now()} 
        },
            {
            $set: {
                password: hashedPassword
            }
        })

        if(!user){
            return NextResponse.json({error: "Invalid token"},{status: 400})
        }

        return NextResponse.json({
            message: "Password changed successfully",
            success: true
        }, {
            status: 200
        })
        
    } catch (error: unknown) {
        if(error instanceof Error){
            NextResponse.json({error : error.message}, {status: 500})
        }else{
            NextResponse.json({error: "Something went wrong"}, {status: 500})
        }
    }
}