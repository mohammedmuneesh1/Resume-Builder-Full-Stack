import express from 'express';
import authMiddleware from '../../middleware/customMiddleware/authMiddleware';
import tryCatch from '../../middleware/customMiddleware/tryCatch';
import { UPLOAD_RESUME_COVER_IMAGE_CONTROLLER } from './controller';
import multerUploadMiddleware from './service/middleware/multerMiddleware';
import uploadToCloudinary from './service/cloudinary/uploadToCloudinary';

const router = express.Router();


router.route('/resume-cover/:resumeId').put(authMiddleware,multerUploadMiddleware({
    type:"fields",
    compress:true,
    compressFormat:"webp",
    compressQualityToKeep:50,
    fieldName:[{name:"thumbnail",maxCount:1},{name:"profileImage",maxCount:1}],
    isOptional:true,
    maxSizeMB:5
}),
uploadToCloudinary("fieldFolder",
    //mediaType:
    "fieldFolder (field name )will be used",
    {
    profileImage:"profile",
    thumbnail:"thumbnail"
}),UPLOAD_RESUME_COVER_IMAGE_CONTROLLER);

export default router;