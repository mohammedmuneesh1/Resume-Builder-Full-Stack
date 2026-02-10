import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface InputInterface{
    value:string;
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void
    label:string;
    placeholder:string;
    type:'text' | 'password' | 'email' | "month" | "url";
}



const Input:React.FC<InputInterface> = ({label,onChange,placeholder,value,type})=>{
    const [showPassword,setShowpassword] = useState<boolean>(false);

    const toggleShowPassword = ()=>{
        setShowpassword(!showPassword);
    }




return(
    <div className="">
    <label 
    className="text-[13px] sm:text-[14px] text-slate-800 font-medium block mb-3"
>
{label}
</label>

    <div className="input-box ">
      
        <input
         type={
            type === "password" ? (showPassword ? "text" : "password") : type
         }
         placeholder={placeholder}
         className="w-full outline-none"
         value={value}
         onChange={(e)=>onChange(e)}
         />
         {
            type === 'password' && (
                <>
                {
                    showPassword ? (
                        <FaRegEye
                        size={22}
                        className="text-primary cursor-pointer"
                        onClick={()=>toggleShowPassword()

                        }
                        />
                    ):(
                        <FaRegEyeSlash
                        size={22}
                        className="text-primary cursor-pointer"
                        onClick={()=>toggleShowPassword()}
                        />
                    )
                }
                </>
            )
         }
    </div>
    </div>
)
}

export default Input