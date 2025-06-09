import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import {NextResponse, NextRequest } from "next/server"
import { getDataFromToken } from "@/helpers/getDatafromToken";

connectDB();

export async function GET(request: NextRequest) {
    try {
        
        const id = await getDataFromToken(request)

        const user =  await User.findById({id}).select("-password")

        if(!user){
            return NextResponse.json({
            error: "Invalid token",
            status: 400
        })
        }

        return NextResponse.json({
            message: "User details fetched",
            status: 200,
            data: user
        })

    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            status: 500
        })
    }
}