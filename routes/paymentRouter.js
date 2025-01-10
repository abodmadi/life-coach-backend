import express from "express";
import { index, store, userPayment } from "../controllers/paymentController.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { bodyUuIdValidator, dateValidator,isInListValidator,paramUuIdValidator,urlValidator } from "../utils/validationSchema.js";

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
const userPaymentValidation=[
  paramUuIdValidator("uuid", "You must specify student!")
];

const paymentRouter = express.Router();

paymentRouter.get("/all", index);
paymentRouter.post("/store", storeDataValidation, validate, store);
paymentRouter.get("/user-payment/:uuid", userPaymentValidation, validate, userPayment);

export default paymentRouter;
