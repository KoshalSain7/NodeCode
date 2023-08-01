import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

// ALL IT IS CALLED MVC(MODEL VIEW CONTROLLER)


export const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        // 1st way
        if (!user) return next((new ErrorHandler("Invalid Email Or Password! User Not Found", 400)));
        //2nd way
        // if (!user)
        //     return res.status(404).json({
        //         success: false,
        //         message: "Invalid Email Or Password"
        //     });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next((new ErrorHandler("Invalid Email Or Password! User Not Found", 400)));
        sendCookie(user, res, `Welcome Back ${user.name}`, 200)
    } catch (error) {
        next(error);
    }

};
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user) return next((new ErrorHandler("User Already Exist", 400)));
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, password: hashedPassword })

        sendCookie(user, res, "Registered Successfully", 201);
    } catch (error) {
        next(error);
    }
}
export const getMyProfile = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        })
    } catch (error) {
        next(error);
    }
};
export const logout = (req, res) => {
    try {
        res.status(200).cookie("token", "", {
            expire: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
            success: true,
            message: "You have been Logged Out"
        })
    } catch (error) {
        next(error);
    }
}
