import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import notesRouter from "./routes/generate.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
    origin: "http://localhost:5173" || "http://172.20.0.219:5173/",
    credentials: true,
    methods: ["GET", "POST", "PUT", "UPDATE", "DELETE", "OPTIONS"]
}));
app.use(express.json());
app.use(cookieParser())

// app.post("/api/auth",authroutes);    

app.use("/api/auth",authRouter)
app.use("/api/user", userRouter)
app.use("/api/notes", notesRouter)


app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`)
    connectDB();
})