"use client"

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LuTrash, LuUpload, LuUser } from "react-icons/lu";





interface PhotoSelectorsInterface{
    image:null | File | string;
    setImage:React.Dispatch<React.SetStateAction<File | null>>;
    
}

const PhotoSelectors:React.FC<PhotoSelectorsInterface> = ({image,setImage})=>{


  console.log('this is the image',image);
    const inputRef = useRef<null | HTMLInputElement>(null);
    const [prevUrl,setPrevUrl] = useState<null |string>( typeof image === 'string' ? image : null);  //v2 (if error switch to v1)
    // const [prevUrl,setPrevUrl] = useState<null |string>( null); //v1
    const [error,setError] = useState<null | string>(null);


    const handleImageChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        const file = event.target.files?.[0];

        if(!file) return setError('Please select an image');
        if( file?.size > 6000000){
            setError('Image size should be less than 6mb');
            return;
        }

        if(file){
          setImage(file);
            setError(null);
            const imageUrl = URL.createObjectURL(file);
            setPrevUrl(imageUrl);
        }
    }


      // ✅ Clean up blob URL whenever it changes or when component unmounts
  useEffect(() => {
    return () => {
      if (prevUrl) {
        URL.revokeObjectURL(prevUrl);
      }
    };
  }, [prevUrl]);


  const handleRemoveImage = ()=>{
    setImage(null);
    setPrevUrl(null);
  }


  const onChooseFile = () => {
    inputRef.current?.click();
  };

const hasImage = !!image || (typeof prevUrl === "string" && prevUrl.trim().length > 0);


    return(
        <div className="mb-6">
        <div className="flex justify-center ">
            <input
             type="file"
             accept="image/*"
             ref={inputRef}
             onChange={handleImageChange}
             className="hidden"
             />

             {
                !hasImage ? (
                    <div
                    onClick={onChooseFile}
                    className="w-20 h-20 flex items-center justify-center
                     bg-purple-50 rounded-full relative cursor-pointer "
                    >
                        <LuUser
                         className="text-4l text-purple-500"/>
                         <button
                         type="button"
                          className="w-8 h-8 flex items-center
                           justify-center 
                           bg-linear-to-r
                            from-purple-500/85 to-purple-700
                             text-white rounded-full absolute -bottom-1 
                             -right-1 cursor-pointer"
                        //   onClick={onChooseFile}
                         >
                            <LuUpload
                             className=""/>
                         </button>
                    </div>
                ):(
                    <div className="relative">
                        <Image
                         src={prevUrl!}
                         priority
                         alt="user profile image "
                         width={100}
                         loading="eager"
                         height={100}
                         className="w-20 h-20 rounded-full object-cover"
                         />
                         <button 
                         type="button"
                          onClick={handleRemoveImage}
                          className="w-8 h-8 flex items-center
                           justify-center bg-red-500
                           text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer
                           "
                         >
                         <LuTrash/>
                         </button>
                    </div>
                )
             }
        </div>
        {error && <p className="!mt-3 text-red-500 text-[13px] sm:text-sm w-full max-w-full text-center">{error}</p>}
        </div>
    )
}

export default PhotoSelectors;