import { isValidObjectId } from "mongoose";
import ResponseHandler from "../../utils/Response-Error-Handler/responseHandler";
import UserModel from "./models/user.schema";
import { Request, Response } from "express";


//--------------------------- GET user profile  START -----------------------------
export async function GET_USER_PROFILE(req: Request, res: Response): Promise<any> {

    const userId = req.user?.uId;

    if(!userId || !isValidObjectId(userId)){
    return ResponseHandler(res,200,false,null,'Invalid user id.');
    }
    const isUserExist = await UserModel.findOne({ 
        _id:userId,
        // isDeleted:false
     })
    .select("name email profileImg role ").populate({
        path:'profileImg',
        select:'path mimeType'
    
    });



    if(!isUserExist){
    return ResponseHandler(res,200,false,null,'User not found.');
    }
    return ResponseHandler(res,200,true,isUserExist,'User profile fetched successfully.');
}
//--------------------------- GET user profile  END -----------------------------