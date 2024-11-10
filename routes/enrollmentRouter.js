import express from "express";
import { store } from "../controllers/enrollmentController.js";

const enrollmentRouter = express.Router();

//paymentRouter.get("/all", index);
enrollmentRouter.get("/store", store);

export default enrollmentRouter;
