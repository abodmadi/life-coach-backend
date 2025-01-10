import express from "express";
import { store, userEnrollment } from "../controllers/enrollmentController.js";

const enrollmentRouter = express.Router();

//paymentRouter.get("/all", index);
enrollmentRouter.get("/user-enrollment/:uuid", userEnrollment);
enrollmentRouter.post("/store", store);

export default enrollmentRouter;
