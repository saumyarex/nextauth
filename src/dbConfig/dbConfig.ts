import mongoose from "mongoose";

export async function connectDB(){

    try {
        await mongoose.connect(`${process.env.MONGO_URI}/nextjAuth`)
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("Connected to DB")
        })

        connection.on("error", (err) => {
            console.log("Make sure DB is up and running:", err);
            process.exit();
        })

    } catch (error) {
        console.log("Error in DB connection : ", error)
    }
}
