import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import {NextResponse, NextRequest } from "next/server"
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectDB();


export async function POST(request: NextRequest) {
    
    try {

        const reqBody = await request.json()

        const {username, email, password} = reqBody

        const userEmail = await User.findOne({email})
        if(userEmail){
            //throw new Error('Email already exist')
             return NextResponse.json({ error: 'Email already exist'}, {status: 400})
        }

        const uniqueUsername = await User.findOne({username})
        if(uniqueUsername){
            return NextResponse.json({error: "Username already exist"}, {status:400})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            email,
            username,
            password : hashedPassword
        })

        const savedUser = await newUser.save()
        //console.log(savedUser)

        //send verification email
        await sendEmail(email,'VERIFY', savedUser._id)

        return NextResponse.json({
            message: "User registered successfully",
            status: 200,
            success: true,
            savedUser
        })

    } catch (error: any) {
        console.log('signup error')
        return NextResponse.json({error: error.message }, {status:500})
    }
}