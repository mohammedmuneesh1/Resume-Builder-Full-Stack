"use client"

import GoogleAuthButton from "@/components/Buttons/GoogleAuthButton";
import Input from "@/components/Input/Input";
import { validateEmail } from "@/utils/helper";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import PhotoSelectors from "@/components/Photo-Selectors/PhotoSelectors";
import { USER_REGISTRATION_API } from "@/app/actions/authApi/authApi";
import { welcomeMessageFn } from "@/utils/welcomeMessageFn";
import { useModalContext } from "@/context/ModalContext";





const SignupClientPage = ()=>{
    return(
        <>
        <SignUpContent/>
        </>
    )
}

export default SignupClientPage;






interface SignupContentInterface{
setCurrentPage?:React.Dispatch<React.SetStateAction<string>>;
closeModal?:()=>void;
}

export const SignUpContent:React.FC<SignupContentInterface> = ({setCurrentPage,closeModal})=>{
    
    
    const pathName = usePathname();
    const [userImage,setUserImage] = useState<File | null>(null);
    const [loading,setLoading] = useState<boolean>(false);
    const {setShowModal} = useModalContext();


    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
    });


    const [error,setError] = useState<null | string>(null);
    const router  = useRouter();

    const signUpFn = async(e:FormEvent)=>{
        e.preventDefault();
        if(!formData?.name?.trim()){
            setError('Please enter a name');
            return;
        }
        if(!validateEmail(formData?.email)){
            setError('Please enter a valid email');
            return;
        }


        if(!formData?.password){
            setError('Please enter a password');
            return;
        }

        if(formData?.password !== formData?.confirmPassword ){
            setError('Your password and confirm password not getting matched. Please check ')

        }

        setError('');

       //SIGNUP API 
       setLoading(true);  
       const formDataObj = new FormData();
       
       if(userImage){
           formDataObj.append('image',userImage);
       }

       formDataObj.append('name',formData?.name);
       formDataObj.append('email',formData?.email);
       formDataObj.append('password',formData?.password);
       formDataObj.append('confirmPassword',formData?.confirmPassword);

       
        const res = await USER_REGISTRATION_API(formDataObj);
        setLoading(false);
        if(res?.success){

         const welcomeMessage = welcomeMessageFn();
         closeModal?.();
          router.push('/account/dashboard');
           setShowModal((prev)=>({
           ...prev,
           show:true,
           success:true,
           title:welcomeMessage?.title ?? "",
            desc:welcomeMessage?.description ?? "",
       }));
            
            // if(setCurrentPage){
            //     setCurrentPage('login')
            // }

            // else{
            //     router.push('/auth/signin');
            // }
        }
        else{
            setError(res?.response ??"");
        }
    }




    const signInRouteFn = ()=>{
        if(pathName === '/auth/signup'){
            router.push('/auth/login');
        }
        else{
            if(setCurrentPage){
                setCurrentPage('login');
            }
        }
    }


    return(

    <div className=" w-[80vw] md:w-[33vw] lg:w-[30vw] p-7 flex flex-col justify-center">
        <h3
        className="text-lg 3xl:text-xl font-semibold text-black"
        >
            Welcome Back
        </h3>
        <p
        className=" text-[13px] sm:text-sm 3xl:text-base text-slate-700 mt-[5px] mb-6"
        >
         Please Enter Your Details To Log In
        </p>
        <form
         onSubmit={signUpFn}>
            {error && <p>{error}</p>}

                 <PhotoSelectors
            image={userImage}
            setImage={setUserImage}
            />


            <Input 
            value={formData.name}
            onChange={(e)=>setFormData({...formData,name:e.target.value})}
            placeholder=""
            type="text"
            label="Full Name" 
            />

            <Input 
            value={formData.email}
            onChange={(e)=>setFormData({...formData,email:e.target.value})}
            placeholder="Email Address"
            type="email"
            label="Enter Your Email Address" 
            />

            <Input 
            value={formData.password}
            onChange={(e)=>setFormData({...formData,password:e.target.value})}
            placeholder="Your Password"
            type="password"
            label="Enter Your Password" 
            />

<button
type="submit"
className="btn-primary !capitalize"
>
     {
            loading ?(
                <>
                Signing Up…
                </>
            ):(
                <>
        Sign Up
                </>
            )
        }
</button>
<GoogleAuthButton />

        </form>

        <div
className="text-[13px] text-slate-800 mt-3 capitalize"
>
       Already have an account? {" "}
       <button
       type="button"
       className="font-medium text-primary  underline cursor-pointer"
       onClick={signInRouteFn}
       >
        
        
        Sign In
       </button>
</div>



    </div>    
    )

}