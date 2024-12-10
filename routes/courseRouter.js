import express from "express";
import {
  index,
  store,
  destroy,
  edit,
  show,
} from "../controllers/courseController.js";
import { validate } from "../middlewares/validationMiddleware.js";
import {
  descriptionValidator,
  paramUuIdValidator,
  textValidator,
  urlValidator,
} from "../utils/validationSchema.js";

import {
  authenticateToken,
  authenticateRole,
} from "../middlewares/authenticationMiddleware.js";

const courseRouter = express.Router();

const putDataValidations = [
  paramUuIdValidator("uuid", "Must select a course to update it."),
  textValidator("name", "Must enter a name to the course!"),
  descriptionValidator(
    "description",
    "Must enter a description to the course!"
  ),
  urlValidator("coverImage", "Must enter a cover image to the course!"),
];

const storeDataValidations = [];

courseRouter.get(
  "/all",
  /* authenticateToken,
  authenticateRole(["ADMIN"]), */
  index
);
courseRouter.post("/store", storeDataValidations, validate, store);
courseRouter.get(
  "/show/:uuid",
  paramUuIdValidator("uuid", "Must select a course to show it."),
  validate,
  show
);
courseRouter.put("/update/:uuid", putDataValidations, validate, edit);
courseRouter.delete(
  "/delete/:uuid",
  paramUuIdValidator("uuid", "Must select a course to delete it."),
  validate,
  destroy
);

export default courseRouter;
