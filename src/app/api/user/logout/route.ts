import {NextResponse, NextRequest } from "next/server"
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
    
    try {

        const reqBody = await request.json()

        console.log(reqBody)
        const {token} = reqBody;

        console.log(token)
        const tokenVerification = jwt.verify(token, process.env.TOKEN_SECRET!)

        if(!tokenVerification){
            return NextResponse.json({
            error: "Invalid token",
            status: 400
        })
        }

        const response = NextResponse.json({
            message: "Logout successfully",
            success: true
        })

        response.cookies.set("token","",{
            httpOnly: true,
            secure: true,
            expires: new Date(0)
        })


        return response;
        
        
    } catch (error) {
        return NextResponse.json({
            error: error.message,
            status: 500
        })
    }
}