

import express from 'express'
import authMiddleware from '../../middleware/customMiddleware/authMiddleware';
import { CREATE_RESUME, DELETE_RESUME_BY_ID, GET_USER_ALL_RESUMES, GET_RESUME_BY_ID, UPDATE_RESUME, UPLOAD_RESUME_IMAGES } from './controller';
import tryCatch from '../../middleware/customMiddleware/tryCatch';
import { EXPRESS_CREATE_RESUME_VALIDATOR, EXPRESS_RESUME_BY_ID_VALIDATOR } from './validation/resume.express.validator';
import expressValidator from '../../middleware/customMiddleware/expressValidator';


export const router = express.Router();

router.route('/').post(authMiddleware, EXPRESS_CREATE_RESUME_VALIDATOR,
    expressValidator,
    tryCatch(CREATE_RESUME)
);
router.route('/').get(authMiddleware,tryCatch(GET_USER_ALL_RESUMES));
router.route('/:id').get(authMiddleware,
    EXPRESS_RESUME_BY_ID_VALIDATOR,
    expressValidator,
    tryCatch(GET_RESUME_BY_ID));
router.route('/:id').put(authMiddleware,
    EXPRESS_RESUME_BY_ID_VALIDATOR,
    expressValidator,
    tryCatch(UPDATE_RESUME));
router.route('/:id/upload-images').put(authMiddleware,
    EXPRESS_RESUME_BY_ID_VALIDATOR,
    expressValidator,
    tryCatch(UPLOAD_RESUME_IMAGES));
    
router.route('/:id').delete(authMiddleware,
    EXPRESS_RESUME_BY_ID_VALIDATOR,
    expressValidator,
    tryCatch(DELETE_RESUME_BY_ID));





