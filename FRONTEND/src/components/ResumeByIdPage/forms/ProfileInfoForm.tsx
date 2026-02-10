
"use client"

import PhotoSelectors from "@/components/Photo-Selectors/PhotoSelectors";
import Input from "@/components/Input/Input";
import { useEffect } from "react";

interface ProfileInfoFormInterface{
      profileData:{
          profileImg?: null,
            profilePreviewUrl?: '',
            fullName?: '',
            designation?: '',
            summary?: '',
      };
      //eslint-disable-next-line
      updateSection:(key:string,value:any)=>void;
      //eslint-disable-next-line
      onNext:(e:any)=>void;
      setUserImgFile:React.Dispatch<React.SetStateAction<File | null>>;
}


const ProfileInfoForm:React.FC<ProfileInfoFormInterface> = ({profileData,updateSection,onNext,setUserImgFile})=>{


console.log('profileData',profileData);


useEffect(() => {
  if (!profileData?.profileImg) return;


  
  const imageUrl = URL.createObjectURL(profileData.profileImg);
  updateSection("profilePreviewUrl", imageUrl);
  return () => {
    URL.revokeObjectURL(imageUrl);
  };
}, [profileData?.profileImg]);


    return(
        <div className="px-5 pt-5 ">
            <h2
             className="text-lg font-semibold text-gray-500"
             >
                Personal Information
            </h2>

            <div className="mt-4">
                <PhotoSelectors
                // image={ profileData?.profilePreviewUrl || null}
                image={profileData?.profileImg || profileData?.profilePreviewUrl || null}
                setImage={(value)=>{
                    // console.log('value',value);
                    if(value === null){
                    updateSection("profileImg",value);
                    updateSection("profilePreviewUrl",value);       
                    }
                    else{
                        updateSection("profileImg",value)
                    }
                }
                }

                // preview={profileData?.profilePreviewUrl}
                // setPreview={(value)=>updateSection("profilePreviewUrl",value)}
                />

                <div
                 className="grid grid-cols-1 md:grid-cols-2 gap-4"
                 >
                    <Input
                     value={profileData?.fullName || ""}
                     onChange={(e)=>updateSection("fullName",e.target.value)}
                     label="Full Name"
                     placeholder="John"
                     type="text"
                    />

                    <Input
                     value={profileData?.designation || ""}
                     onChange={(e)=>updateSection("designation",e.target.value)}
                     label="Designation"
                     placeholder="UI Designer"
                     type="text"
                    />

                    <div className="col-span-2 mt-3 w-full max-w-full ">
                        <label
                         className="text-[13px] sm:text-[14px] text-slate-800 font-medium"
                        >
                            Summary
                        </label>

                        <textarea
                        placeholder="Short Introduction resize-none"
                        className="form-input"
                        rows={4}
                        value={profileData?.summary || ""}
                        onChange={(e)=>updateSection("summary",e.target.value)}
                        />
                    </div>
                </div>
            </div>
        
        </div>
    )
}
export default ProfileInfoForm;




// {
//     "profileImg": null,
//     "profilePreviewUrl": "https://res.cloudinary.com/mblog-cloud/image/upload/v1770298811/RESUME-BUILDER/profile/pceb2jrvkwczbihbg88z.webp",
//     "fullName": "John Doe",
//     "designation": "Frontend Developer",
//     "summary": "Passionate developer with experience in building web applications."
// }