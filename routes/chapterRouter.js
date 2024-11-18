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
  bodyUuIdValidator,
  textValidator,
  urlValidator,
} from "../utils/validationSchema.js";
const chapterRouter = express.Router();

const putDataValidations = [
  paramUuIdValidator("uuid", "Must select a chapter to update it."),
  textValidator("name", "Must enter a name to the chapter!"),
  descriptionValidator(
    "description",
    "Must enter a description to the chapter!"
  ),
  urlValidator("coverImage", "Must enter a cover image to the chapter!"),
];

const storeDataValidations = [
  textValidator("name", "Must enter a name to new chapter!"),
  descriptionValidator(
    "description",
    "Must enter a description to new chapter!"
  ),
  urlValidator("coverImage", "Must enter a cover image to new chapter!"),
  //urlValidator("videosUrls", "Must enter a cover image to new chapter!"),
  bodyUuIdValidator("courseId", "Must select a course to add chapter to it!"),
];

chapterRouter.get("/all", index);

chapterRouter.post("/store", storeDataValidations, validate, store);
chapterRouter.get(
  "/show/:uuid",
  paramUuIdValidator("uuid", "Must select a chapter to show it!"),
  validate,
  show
);
chapterRouter.put("/update/:uuid", putDataValidations, validate, edit);
chapterRouter.delete(
  "/delete/:uuid",
  paramUuIdValidator("uuid", "Must select a chapter to delete it!"),
  validate,
  destroy
);

export default chapterRouter;
