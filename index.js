import express from "express";
import dotenv from "dotenv";
import courseRouter from "./routes/courseRouter.js";
import userRouter from "./routes/userRouter.js";
import paymentRouter from "./routes/paymentRouter.js";
import enrollmentRouter from "./routes/enrollmentRouter.js";
import chapterRouter from "./routes/chapterRouter.js";
import authRouter from "./routes/authRouter.js";
import {
  authenticateRole,
  authenticateToken,
} from "./middlewares/authenticationMiddleware.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

//app.use('/public/images',express.static('public/images'))

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server run successfully on port ${PORT}`);
});

// This is show the app apis:
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/enrollment", enrollmentRouter);
app.use("/api/payment", paymentRouter); //authenticateToken,authenticateRole(["ADMIN","STUDENT"]),
app.use("/api/course", courseRouter);
app.use("/api/chapter", chapterRouter);

app.use("/api/test", (req, res) => {
  return res.send("Hello....");
});

// this is showing the middle ware
/* app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
}); */

/*
// Hosting Account //
user: ab18e2_coach
pas:dedoted652
server:mysql1001.site4now.net
email:dedoted652@pariag.com
*/