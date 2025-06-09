import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required : [true, "Please provide username"],
        unique : ["Username already taken"]
    },
    
    email : {
        type: String,
        required : [true, "Please provide email"],
        unique : ["Email already taken"]
    },

    password : {
        type: String,
        required : [true, "Please provide password"],
    },

    isVerified : {
        type: Boolean,
        default: false
    },

    isAdmin : {
        type: Boolean,
        default: false
    },

    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyToken : String,
    verifyTokenExpiry : Date
},{timestamps: true})

const  User = mongoose.models.users || mongoose.model("users", userSchema)

export default User;