import express from "express";
import { index, store, destroy } from "../controllers/courseController.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { paramUuIdValidator } from "../utils/validationSchema.js";
const courseRouter = express.Router();

courseRouter.get("/all", index);
courseRouter.get("/store", store);
courseRouter.delete(
  "/delete/:uuid",
  paramUuIdValidator("uuid", "Must select a course to delete it."),
  validate,
  destroy
);

export default courseRouter;
