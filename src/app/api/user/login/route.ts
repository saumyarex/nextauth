import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import {NextResponse, NextRequest } from "next/server"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

connectDB();

export async function GET(request: NextRequest) {
    try {
        const reqBody = await request.json()

        const {email, username, password} = reqBody

        const user = await User.findOne(email)

        if(!user){
            return NextResponse.json({
            error: "User does not exist",
            status: 400
        })
        }

        const validPassword = await bcrypt.compare(password, user.password) 

        if(!validPassword){
            return NextResponse.json({
            error: "Wrong password",
            status: 400
        })
        }

    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            status: 500
        })
    }
}