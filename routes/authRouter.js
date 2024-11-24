import express from "express";
import {
  signIn,
  signUp,
  signOut,
  google,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/sign-in", signIn);
authRouter.post("/sign-up", signUp);
authRouter.post("/google", google);
authRouter.delete("/sign-out/:uuid", signOut);

export default authRouter;
