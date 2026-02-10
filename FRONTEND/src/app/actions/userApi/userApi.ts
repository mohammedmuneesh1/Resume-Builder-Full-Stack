"use server"

import axiosInstance from "@/utils/axiosInstance";
import { cookies } from "next/headers";

export async function FETCH_USER_PROFILE (){
    
    try {
        const cookie = await cookies();
        const token = cookie.get('token')?.value;
        if(!token) return {
            tokenExist:false,
            success:false,
            data:null,
            response:'Unauthorized access'
        }
          const response = await axiosInstance.get('/api/user/profile');
          return {
            tokenExist:true,
            success:response?.data?.success,
            data:response?.data?.data ?? null,
          }

        
    } catch (error) {
        return {
            success:false,
            data:null,
            tokenExist:false,
        }
    }


}