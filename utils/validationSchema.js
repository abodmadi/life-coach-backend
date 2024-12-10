import { body, param } from "express-validator";
// todo:
//    1.video list validation and check it all validations [].
//    2.reusable and isOptional value [],

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

export const urlValidator = (
  url,
  message,
  requiredMes = null,
  isOptional = false
) => {
  const validator = body(url);
  !isOptional && validator.notEmpty().withMessage(requiredMes).bail();
  validator
    .optional({ nullable: isOptional, checkFalsy: isOptional })
    .isURL()
    .withMessage(message)
    .bail();
  return validator;
};

export const isInListValidator = (fieldName, allowedValues) => {
  return body(fieldName)
    .exists()
    .notEmpty()
    .withMessage(`${fieldName} is required`)
    .bail()
    .custom((value) => {
      if (!allowedValues.includes(value)) {
        throw new Error(
          `${fieldName} must be one of the allowed values: ${allowedValues.join(
            ", "
          )}`
        );
      }
      return true;
    });
};

export const dateValidator = (date, isoMes, isOptional = false) =>
  body(date)
    .optional({ nullable: isOptional, checkFalsy: isOptional })
    .isISO8601()
    .withMessage(isoMes)
    .toDate()
    .custom((value) => {
      const date = new Date(value);
      const today = new Date();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      if (date > today) {
        throw new Error("Past date cannot be in the future");
      }
      if (date < oneWeekAgo) {
        throw new Error("Past date must be at least one week before today");
      }
      return true;
    })
    .bail();

/*
const createDateValidator = (options = {}) => {
  const {
    field = 'date',
    dateFormat = 'YYYY-MM-DD',
    required = true,
    range = {},
    customValidation
  } = options;

  const validations = [
    // Conditional existence check based on 'required' option
    ...(required ? [
      body(field).exists().withMessage(`${field} is required`)
    ] : []),

    // Basic validation checks
    body(field)
      // Only run validation if the field is present
      .if((value) => value !== undefined)
      
      // Ensure not empty if required
      .notEmpty().withMessage(`${field} cannot be empty`)
      
      // Parse and validate date format
      .isDate({ format: dateFormat })
      .withMessage(`Invalid ${field} format. Expected ${dateFormat}`)
      
      // Custom validation logic
      .custom((value) => {
        const parsedDate = moment(value, dateFormat, true);

        // Validate date is a valid calendar date
        if (!parsedDate.isValid()) {
          throw new Error(`Invalid ${field}`);
        }

        // Range validation
        if (range.min || range.max) {
          const min = moment(range.min);
          const max = moment(range.max);
          const isInRange = range.exclusive 
            ? parsedDate.isAfter(min) && parsedDate.isBefore(max)
            : parsedDate.isSameOrAfter(min) && parsedDate.isSameOrBefore(max);

          if (!isInRange) {
            const minText = min.isValid() ? min.format(dateFormat) : 'unspecified';
            const maxText = max.isValid() ? max.format(dateFormat) : 'unspecified';
            
            throw new Error(
              `${field} must be ${range.exclusive ? 'between' : 'from'} ${minText} to ${maxText}`
            );
          }
        }

        // Additional custom validation if provided
        if (customValidation && typeof customValidation === 'function') {
          return customValidation(parsedDate);
        }

        return true;
      })
  ];

  // Error handling middleware
  const errorHandler = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }
    
    next();
  };

  return [...validations, errorHandler];
};

*/
