"use client"
import { DELETE_RESUME_BY_ID } from "@/app/actions/resumeApi/resumeApi";
import { getLightColorFromImage } from "@/utils/helper";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiMenuKebab } from "react-icons/ci";


interface ResumeSummaryCardInterface{
imgUrl:string | null;
title:string
lastUpdatedAt:string | null;
onSelect:()=>void;
uId:string;
};

const ResumeSummaryCard:React.FC<ResumeSummaryCardInterface> = ({
    imgUrl,
    title,
    lastUpdatedAt,
    onSelect,
    uId
})=>{

    const [bgColor,setBgColor] = useState<string>('#ffffff');
    const router = useRouter();


    // ----------------- IMAGE BG COLOR SETTING START -----------------

    useEffect(()=>{
        if(imgUrl){
            getLightColorFromImage(imgUrl).then((color:string)=>{
                setBgColor(color);
            }).
            catch(()=>{
                setBgColor('#ffffff');
            });
        }
    },[imgUrl]);

// ----------------- IMAGE BG COLOR SETTING END -----------------

    return(
        <div 
        className="h-[300px] flex flex-col
         items-center justify-between 
          rounded-lg border border-gray-200
          hover:border-purple-300 cursor-pointer
          
          "
          //overflow-hidden
          style={{
            backgroundColor:bgColor
          }}

          onClick={()=>router.push(`/account/resume/${uId}`)}
        >
            <div
             className="px-2 py-2  w-full max-w-full "
             >
            {
                imgUrl ? (
                    <div className="relative max-w-full w-full h-[200px] rounded overflow-hidden">
                    <Image
  src={imgUrl}
  alt={title}
  width={500}
  height={500}
//   className="w-full h-full rounded object-contain"
  className="w-full h-full rounded object-contain scale-100 "
/>
                    </div>
                ):(
                <div>
                </div>
                )
            }
            </div>

            {/*TEXT CONTENT + LAST UPDATED  +  OPTION BUTTON START */}


            
            
                        <div className="w-full bg-white px-4 py-3  flex items-center justify-between gap-3 ">
                            
                            <div>
                <h5 className="text-sm font-medium truncate overflow-hidden whitespace-nowrap">
                    {title}
                </h5>
                <p
                 className="text-xs font-medium
                  text-gray-500 mt-.05"
                 >
                Last Updated :{lastUpdatedAt}
                </p>

            </div>

            <MenuOptions
            uId={uId}
            />


            </div>
            {/*TEXT CONTENT + LAST UPDATED  +  OPTION BUTTON  END */}
        </div>
    )
}

export default ResumeSummaryCard;



interface MenuOptionsInterface {
    uId:string;
}

const MenuOptions:React.FC<MenuOptionsInterface> = ({uId})=>{

    const [showOptions, setShowOptions] = useState<boolean>(false);
        const router = useRouter();



        const deleteResumeById = async (resumeId:string)=>{
            toast.loading("Deleting Resume...",{id:resumeId});
             const res = await DELETE_RESUME_BY_ID(resumeId);
            //  console.log('res',res);
             toast.dismiss(resumeId);
            if(res?.success){
                toast.success(res?.data?.response);
                router.refresh();
            }
            else {
                toast.error(res?.data?.response);
            }
        }


    return(
        <div
        onClick={(e)=>{
            e.stopPropagation();
            setShowOptions(true);
            
        }}
        className="relative inline-block">

        <div className="px-1 py-1 border border-black/20 text-base  rounded-md">
        <CiMenuKebab />
        </div>



        {/* MENU OPTIONS START  */}

{showOptions && (
        <div className="absolute right-0 bottom-full mb-2  w-36 bg-white border border-black/10 rounded-lg shadow-lg z-50">
          <button
          type="button"
          onClick={()=>{router.push(`/account/resume/${uId}`); setShowOptions(false); } }
          className="w-full px-3 py-2 text-sm text-left hover:bg-black/5 cursor-pointer">
            Edit
          </button>
          {/* <button className="w-full px-3 py-2 text-sm text-left hover:bg-black/5">
            Duplicate
          </button> */}
          <button
          type="button"
          onClick={()=>{deleteResumeById(uId); setShowOptions(false);} }
          className="w-full px-3 py-2 text-sm text-left text-red-600 hover:bg-red-50 cursor-pointer">
            Delete
          </button>
        </div>
      )}

        {/* MENU OPTIONS END  */}


        
        </div>
    )
}