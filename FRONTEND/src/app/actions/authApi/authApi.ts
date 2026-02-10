"use server"
//eslint-disable-next-line
import axiosErrorHandler from "@/utils/axiosErrorHandler";


import axiosInstance from "@/utils/axiosInstance";
// import { cookies } from "next/headers";
import { AxiosError } from "axios";
import { cookies } from "next/headers";


export async function USER_LOGIN_API(obj:{email:string,password:string}){
    try {
        const res = await axiosInstance.post('/api/auth/user/login',obj);
        if(res?.data?.success){
            const cookie = await cookies();
            cookie.set('token',res?.data?.data?.token);
        }
        return res.data;
    } catch (error) {

        const axiosError = error as AxiosError;



        console.error("error USER_LOGIN",error instanceof Error ? error.message:error);

    if (axiosError.response?.status === 401) {
        return {
            success:false,
            // response: axiosError.response?.data?.response || "Unauthorized",
            response: (axiosError.response?.data as { response?: string })?.response 
          || "Unauthorized"

        };
    }

    return {
        success: false,
        response: axiosError.message || "Something went wrong",
    };


    //THE REASON TO 
    // COMMENT IS BECAUSE IT'S AUTH API .
    //  WE DONT NEED TO REDIRECTION
    // return axiosErrorHandler(error,"USER_LOGIN_API");

      
    }
}



export async function USER_REGISTRATION_API(formData:FormData){
    try {

    const res = await axiosInstance.post(
  "/api/auth/user/registration",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }
);

        if(res?.data?.success){
            const cookie = await cookies();
            cookie.set('token',res?.data?.data?.token);
        }


return res?.data;

        
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error("error USER_REGISTRATION_API",error instanceof Error ? error.message:error);
        
        return {
            success:false,
            response: (axiosError.response?.data as { response?: string })?.response 
          || "Network issue occured. Please do registration after sometimes."
        }
    }
}