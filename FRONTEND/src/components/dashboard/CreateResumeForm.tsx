"use client"

import { CREATE_RESUME_FORM } from "@/app/actions/resumeApi/resumeApi";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Input from "../Input/Input";


const CreateResumeForm = () => {

    const [title,setTitle] = useState<string | null>(null);
    const [error,setError] = useState<null | string>("");
    const [loading,setLoading] = useState<boolean>(false);
    
    const router = useRouter();



    const handleCreateResumeFn = async(e:FormEvent)=>{
        e.preventDefault();
        if(!title){
            setError("Please enter your resume title");
            return;
        }
        setError('');
        setLoading(true)
        const res = await CREATE_RESUME_FORM(title);
        setLoading(false)
        if(res?.success){
            router.push(`/account/resume/${res?.data?.resumeId}`);
        }
        else{
            return setError(res?.response);
        }

    }




    return (
        <div className="max-w-[400px] md:max-w-[400px] 3xl:max-w-[400px]  p-7 flex flex-col justify-center ">
            <h3 className="text-lg font-semibold text-black">Create New Resume</h3>
<p className="text-xs md:text-[13px] text-slate-700 mt-[5px] mb-3">
give your resume a title to get started. you can edit all dtails later.
</p>

<form onSubmit={handleCreateResumeFn} className="mt-2 leading-2">

    <Input
    label="Enter Resume Title"
    onChange={(e)=>setTitle(e.target.value)}
    placeholder="Eg: John Doe Resume"
    type="text"
    value={title ?? ""}
    />
    {error && (
        <p className="text-red-500 mb-4 max-w-full w-full text-left  text-xs md:text-[13px]  font-semibold text-wrap overflow-hidden">{error}</p>
    )}
    <button type="submit" className="btn-primary">
      {
        loading ? (
      "Creating Resume..."
        ):(
      "Create Resume"
        )
      }  
    </button>

</form>


        </div>

    )
}

export default CreateResumeForm;