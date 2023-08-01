import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "UserApi",
    }).then((c) => {
        console.log(`Successfully Connected with ${c.connection.host}`);
    }).catch((err) => {
        console.log(err);
    })

};