import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import {NextResponse, NextRequest } from "next/server"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()

        //console.log(reqBody)
        const {username, password} = reqBody
        //console.log(username)
        const user = await User.findOne({
            $or : [
                {email:username},
                {username:username}
            ]
        })

        if(!user){
            return NextResponse.json({error: "User does not exist"},{status: 400})
        }

        const validPassword = await bcrypt.compare(password, user.password) 

        if(!validPassword){
            return NextResponse.json({
            error: "Wrong password"
        }, {
            status: 400
        })
        }

        const tokenData = {
            userId : user._id,
            username : user.username
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})

        const response = NextResponse.json({
            message: "Login success",
            success: true,
            status:200
        })

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
        },{status:500})
    }
}