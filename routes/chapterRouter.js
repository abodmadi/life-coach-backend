import express from "express";
import {
  index,
  store,
  destroy,
  edit,
  show,
} from "../controllers/chapterController.js";
import { validate } from "../middlewares/validationMiddleware.js";
import {
  descriptionValidator,
  paramUuIdValidator,
  textValidator,
  urlValidator,
} from "../utils/validationSchema.js";
const chapterRouter = express.Router();

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

chapterRouter.get("/all", index);

chapterRouter.post("/store", storeDataValidations, validate, store);
chapterRouter.get(
  "/show/:uuid",
  paramUuIdValidator("uuid", "Must select a course to show it."),
  validate,
  show
);
chapterRouter.put("/update/:uuid", putDataValidations, validate, edit);
chapterRouter.delete(
  "/delete/:uuid",
  paramUuIdValidator("uuid", "Must select a course to delete it."),
  validate,
  destroy
);

export default chapterRouter;
