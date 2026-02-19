"use server"

import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";


export const FETCH_ALL_RESUMES = async  ()=>{
    try {
        const res = await axiosInstance.get('/api/resumes/');
        return res?.data;
    } catch (error) {
        return axiosErrorHandler(error,"FETCH_ALL_RESUMES");
    }
}

export const CREATE_RESUME_FORM = async  (title:string,templateId?:string)=>{
    try {
        const res =
         await axiosInstance
         .post('/api/resumes/',{title,templateId});
        return res?.data;
    } catch (error) {
        return axiosErrorHandler(error,"CREATE_RESUME_FORM");
    }
}


export const FETCH_ALL_RESUME_ID = async  (resumeId:string)=>{
    try {
        const res = await axiosInstance.get(`/api/resumes/${resumeId}`);
        return res?.data;
    } catch (error) {
        return axiosErrorHandler(error,"FETCH_ALL_RESUME_ID");
    }
}


export const UPDATE_RESUME_IMAGES_BY_ID = async  (resumeId:string,formData:FormData)=>{
    try {
        const res = await axiosInstance.put(`/api/media/resume-cover/${resumeId}`,formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                  },
            }
    );
    // console.log('res',res?.data);
        return res?.data;
    } catch (error) {

        return axiosErrorHandler(error,"UPDATE_RESUME_IMAGES_BY_ID");
    }
}





export const UPDATE_RESUME_DATA = async (resumeId:string,obj:object)=>{
    try {
        const res = await axiosInstance.put(`/api/resumes/${resumeId}`,obj);
        return res?.data;
    } catch (error) {
        return axiosErrorHandler(error,"UPDATE_RESUME_DATA");
    }
}



export const DELETE_RESUME_BY_ID = async (resumeId:string)=>{
    try {
        const res = await axiosInstance.delete(`/api/resumes/${resumeId}`);
        return res?.data;
    } catch (error) {
        return axiosErrorHandler(error,"DELETE_RESUME_BY_ID");
    }
}
