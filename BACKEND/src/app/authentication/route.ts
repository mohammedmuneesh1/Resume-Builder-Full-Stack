import express from 'express'
import tryCatch from '../../middleware/customMiddleware/tryCatch';
import { demoFn, userLoginFn, userRegisterFn } from './controller';
import multerUploadMiddleware from '../media/service/middleware/multerMiddleware';
import uploadToCloudinary from '../media/service/cloudinary/uploadToCloudinary';



export const router = express.Router();



 //-------------------------------------- SUPER ADMIN ROUTE START ---------------------------------------------------
//  router.route('/admin/login').post(tryCatch(superAdminLogin));
//  router.route('/user/login').post(tryCatch());
 //-------------------------------------- SUPER ADMIN ROUTE  END---------------------------------------------------
//
//
//
//
//
//
//
//
 //-------------------------------------- USER ROUTE START---------------------------------------------------
 router.route("/user/registration").post(
    multerUploadMiddleware({
        type: 'single',
        fieldName:'image',
    }),
    uploadToCloudinary('profile',"profile"), //first profile is for cloudinary folder, second profile is the mediaType for db 
    tryCatch(userRegisterFn)
);
 router.route('/demo').get(demoFn)
 router.route('/user/login').post(tryCatch(userLoginFn))
 //-------------------------------------- USER ROUTE END---------------------------------------------------



//  router.route("/users/registration/skip-verification").post(
//     multerUploadMiddleware('single','image'),
//     checkUserExists,
//     imageCompressor(),uploadToCloudinary(),tryCatch(userRegisterFnNoEmailVerification));












// //========================================== SCHOOL LEVEL ADMIN ROUTES ================================================

// //----------admin login 
// router.route('/admin/login').post(tryCatch(superAdminLogin));


// //--------------------------------------FORGET PASSWORD RELATED START ---------------------------------------------------
// //----------sending forgetpassword email request
// router.route('/admin/forget-password/email').post(tryCatch(adminForgetPasswordEmailVerifyFn));

// //----------- verifying forget password page token (BEFORE SHOWING THE PAGE FOR RESET PASSWORD FORM ) -------------------------------------------- 
// router.route ('/admin/forget-password/verify/page/:id/:token').get(tryCatch(verifyTokenBeforeFormShowingFn));

// //----------------------RESET-PASSWORD 
// router.route('/admin/reset-password/:id/:token').post(AdminResetPasswordFn);
// //--------------------------------------FORGET PASSWORD RELATED START ---------------------------------------------------




// //-------------------------verifying admin email ------------------------------------------------
// router.route("/admin/verify/email/:id/:token").get(verifyAdminEmailUsingIdAndToken);









// // //-------------------verifying the id and token before showing reset password form (verifying the page);
// // router.get('/admin/new-password/:token',tryCatch(verifyTokenBeforeFormShowingFn));




