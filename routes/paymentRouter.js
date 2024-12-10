import express from "express";
import { index, store } from "../controllers/paymentController.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { bodyUuIdValidator, dateValidator,isInListValidator,urlValidator } from "../utils/validationSchema.js";

const storeDataValidation = [
  dateValidator("paymentDate","Invalid date format. Use YYYY-MM-DD"),
  isInListValidator("paymentMethod",[  "BankTransfer","ElectronicWallet"]),
  bodyUuIdValidator("studentId", "You must specify the purchasing student!"),
  bodyUuIdValidator(
    "courseId",
    "You must specify the course that was purchased!"
  ),
  urlValidator(
    "paymentReceipt",
    "You must specify valid url!",
    "Payment receipt must be attached to this transaction!",
  ),
];
const paymentRouter = express.Router();

paymentRouter.get("/all", index);
paymentRouter.post("/store", storeDataValidation, validate, store);

export default paymentRouter;
