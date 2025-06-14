import {NextResponse, } from "next/server"

export async function GET() {
    
    try {

        const response = NextResponse.json({
            message: "Logout successfully",
            success: true,
            status:200
        })

        response.cookies.set("token","",{
            httpOnly: true,
            secure: true,
            expires: new Date(0)
        })

        //response.cookies.delete("token")


        return response;
        
        
    } catch (error:any) {
        return NextResponse.json({
            error: error.message,
            status: 500
        })
    }
}