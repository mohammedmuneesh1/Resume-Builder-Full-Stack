import { Request, Response } from "express";
import ResponseHandler from "../../utils/Response-Error-Handler/responseHandler";
import fs from 'node:fs';
import ResumeModel from "./models/resume.schema";
import { isUserExistService } from "../user/db";




//================================ CREATE RESUME START ===============================================
//@desc Create new resume 
//@route POST /api/resumes
//@access Private 
export async function CREATE_RESUME(req: Request, res: Response): Promise<any> {

    const {title} = req.body;
    const userData = req.user;

    const defaultResumeData = {
        profileInfo:{
            profileImg:null,
            profilePreviewUrl:"",
            fullName:'Your Name',
            designation:'',
            summary:'',
        }
    };

    //more field to come 

    const resume = await ResumeModel.create({
        userId:userData?.uId,
        title,
        ...defaultResumeData,
    });

    return ResponseHandler(res, 200, true, {
        resumeId:resume._id,
    }, 'Resume created successfully.');
}
//================================ CREATE RESUME END ===============================================
{/* */}
{/* */}
{/* */}
//================================ GET USER ALL RESUMES START ===============================================
//@desc get all resume for logged user
//@route GET /api/resumes
//@access private 
export async function GET_USER_ALL_RESUMES(req: Request, res: Response): Promise<any> {
   
    const  uId = req?.user?.uId;
    const isUserExist = await isUserExistService(uId as string);
    if(!isUserExist) return ResponseHandler(res,200,false,null,'User not found.');

    const userAllResumes = await ResumeModel.find({
        userId:uId,
        isDeleted:false,
    });



    return ResponseHandler(res, 200, true, userAllResumes, 'All resumes fetched successfully.');
}

//================================ GET USER ALL RESUMES END ===============================================
{/* */}
{/* */}
{/* */}
//================================ GET USER ALL RESUMES START ===============================================
//@desc get resume by id 
//@route GET /api/resumes/:id
//@access private 
export async function GET_RESUME_BY_ID(req: Request, res: Response): Promise<any> {
      const resumeId = req.params.id;
      const uId = req?.user?.uId;
      if(!uId) return ResponseHandler(res,200,false,null,'User not found.');


      const isResumeExist = await ResumeModel.findOne({
       _id:resumeId,
        userId:uId,
        isDeleted:false,
      });

    if(!isResumeExist) return ResponseHandler(res,200,false,null,'Resume not found.');

    return ResponseHandler(res, 200, true, isResumeExist, 'Resume By Id Fetched Successfully.');
}
//================================ GET USER ALL RESUMES END ===============================================
{/* */}
{/* */}
{/* */}

//================================= GET UPDATE RESUME START ===============================================
//@desc UDPATE A RESUME BY RESUME ID   
//@route put /api/resumes/:id
//@access private
export async function UPDATE_RESUME(req: Request, res: Response): Promise<any> {
   
    const resumeId = req.params.id;
    const uId = req?.user?.uId;
    if(!uId) return ResponseHandler(res,200,false,null,'User not found.');

    const isResumeExist = await ResumeModel.findOne({
       _id:resumeId,
        userId:uId,
        isDeleted:false,
      });
    if(!isResumeExist) return ResponseHandler(res,200,false,null,'Resume not found.');

    // console.log('req.body',req.body);

    //Merge updates from req.body into existing resume 
    Object.assign(isResumeExist,req.body); //check resume documentation

    // isResumeExist.education = [];

        // console.log('isResumeExist',isResumeExist);

    //save updated resume 
    const savedResume = await isResumeExist.save();

    return ResponseHandler(res, 200, true, savedResume, 'Resume updated successfully.');
}
//================================= GET UPDATE RESUME START ===============================================
{/* */}
{/* */}
{/* */}
//================================= UPLOAD RESUME IMAGES START ===============================================
//@desc uploading user resume images    
//@route put /api/resumes/:id/upload-images
//@access private
export async function UPLOAD_RESUME_IMAGES(req: Request, res: Response): Promise<any> {
    return ResponseHandler(res, 200, true, null, 'Resume images uploaded successfully.');
}
//================================= UPLOAD RESUME IMAGES END ===============================================
{/* */}
{/* */}
{/* */}
//================================= DELETE RESUME START ===============================================
//@desc deleting resume by resume id     
//@route delete /api/resumes/:id/
//@access private
export async function DELETE_RESUME_BY_ID(req: Request, res: Response): Promise<any> {

    const resumeId = req.params.id;
    const uId = req?.user?.uId;
    if(!uId) return ResponseHandler(res,200,false,null,'User not found.');
     const isResumeExist = await ResumeModel.findOne({
       _id:resumeId,
        userId:uId,
        isDeleted:false,
      });
    //   console.log('isResumeExist',isResumeExist);
      
    if(!isResumeExist){ return ResponseHandler(res,200,false,null,'Resume not found.');}
    isResumeExist.isDeleted = true;
    await isResumeExist.save();
    
    return ResponseHandler(res, 200, true, null, 'Resume deleted successfully.');
}
//================================= DELETE RESUME END ===============================================
{/* */}
{/* */}
{/* */}




