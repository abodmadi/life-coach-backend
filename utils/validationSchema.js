import { body, param } from "express-validator";

export const paramUuIdValidator = (uuid, message, isOptional = false) =>
  param(uuid)
    .optional({ nullable: isOptional, checkFalsy: isOptional })
    .isUUID()
    .withMessage(message)
    .bail();

export const bodyUuIdValidator = (uuid, message, isOptional = false) =>
  body(uuid)
    .optional({ nullable: isOptional, checkFalsy: isOptional })
    .isUUID()
    .withMessage(message)
    .bail();

export const descriptionValidator = (des, message, isOptional = false) =>
  body(des)
    .isString()
    .optional({ nullable: isOptional, checkFalsy: isOptional })
    .withMessage(message)
    .isLength({ min: 10, max: 1000 })
    .withMessage(
      "Must be a at must than 10 characters or les than 1000 characters"
    )
    .trim()
    .escape()
    .bail();

export const textValidator = (text, message, isOptional = false) =>
  body(text)
    .optional({ nullable: isOptional, checkFalsy: isOptional })
    .isString()
    .withMessage(message)
    .isLength({ min: 5, max: 100 })
    .withMessage(
      "Must be a at must than 5 characters or les than 100 characters"
    )
    .trim()
    .escape()
    .bail();

export const urlValidator = (url, message, isOptional = false) =>
  body(url)
    .optional({ nullable: isOptional, checkFalsy: isOptional })
    .isURL()
    .withMessage(message)
    .bail();
