"use client"

import React,{createContext, useContext, useEffect, useState} from 'react';
import axiosInstance from '@/utils/axiosInstance';
import Cookies from "js-cookie";
import { FETCH_USER_PROFILE } from '@/app/actions/userApi/userApi';



interface UserContextInterface{
user:null | UserDataInterface;
loading:boolean;
updateUser:(user:UserDataInterface)=>void
clearUser:()=>void,
}




interface UserDataInterface{
    token?:string,    
    name: string,
    email:string,
    role: string,
    profileImg:null | {_id:string,path:string,mimeType:string},
}


export const UserContext = createContext<UserContextInterface | null>(null);




export function UserContextProvider({children}:{children:React.ReactNode}){

    const [loading,setLoading] = useState<boolean>(true);
    const [user,setUser] = useState<null | UserDataInterface>(null);


    const fetchUser = async ()=>{
            // const token = Cookies.get("token");
            // if(!token) return clearUser();
            const response = await FETCH_USER_PROFILE();
            if(!response?.tokenExist){
                return clearUser();
            }
            else{
                setUser(response?.data );
            }
            setLoading(false);
        

    }

  const clearUser = ()=>{
    setUser(null);
    Cookies.remove('token');
}



  const updateUser = (userData:UserDataInterface)=>{
    setUser(userData);
  }




    useEffect(()=>{
        if(user) return;
        const token = Cookies.get("token");
        if(!token){
            setLoading(false);
            return;
        }
        fetchUser();
    },[]);




    return(
        <UserContext.Provider 
        value={{
            user,loading,updateUser,
            clearUser,
        }}
        >
            {children}
    </UserContext.Provider>
    )
}







export  function useUserContexxt () {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
  }