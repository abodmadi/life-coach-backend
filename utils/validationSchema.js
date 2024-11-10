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
