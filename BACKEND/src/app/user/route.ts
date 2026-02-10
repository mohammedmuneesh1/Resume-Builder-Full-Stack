

import express from 'express'
import authMiddleware from '../../middleware/customMiddleware/authMiddleware';
import tryCatch from '../../middleware/customMiddleware/tryCatch';
import { GET_USER_PROFILE } from './controller';

export const router = express.Router();

router.route('/profile')
.get(authMiddleware,
 tryCatch(GET_USER_PROFILE)
);
