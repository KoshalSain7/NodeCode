import express, { query } from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"

config({
    path: "./data/config.env",
})



export const app = express();


// using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))
//Using Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);


app.get("/home", (req, res) => {
    res.send("Hi, This is Home Page")
})
app.use(errorMiddleware)
