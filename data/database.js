import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "UserApi",
    }).then(() => {
        console.log("Successfully Connected");
    }).catch((err) => {
        console.log(err);
    })

};