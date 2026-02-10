import { body, param } from "express-validator";



export const EXPRESS_CREATE_RESUME_VALIDATOR = [
    body('title')
  .notEmpty().withMessage('Title is required')
  .isString().withMessage('Title must be a string')
  .trim()
];

export const EXPRESS_RESUME_BY_ID_VALIDATOR = [
    param('id').isMongoId().withMessage('Invalid resume id')
]