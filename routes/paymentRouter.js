import express from "express";
import { store } from "../controllers/paymentController.js";

const paymentRouter = express.Router();

//paymentRouter.get("/all", index);
paymentRouter.get("/store", store);

export default paymentRouter;
