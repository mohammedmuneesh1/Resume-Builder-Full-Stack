import UserModel from "./models/user.schema";



export async function isUserExistService (userId:string){
    const isUserExist = await UserModel.findOne({ _id: userId }).select('password');
    return isUserExist;
}
