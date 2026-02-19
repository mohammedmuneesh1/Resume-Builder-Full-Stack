/* eslint-disable */
/* @ts-nocheck */

"use client"


import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import TitleInput from "@/components/ResumeByIdPage/TitleInput";
import { useReactToPrint } from "react-to-print";
import { DELETE_RESUME_BY_ID, FETCH_ALL_RESUME_ID, UPDATE_RESUME_DATA, UPDATE_RESUME_IMAGES_BY_ID } from "@/app/actions/resumeApi/resumeApi";
import { LuArrowLeft, LuCircleAlert, LuDownload, LuPalette, LuSave, LuTrash2 } from "react-icons/lu";
import StepProgress from "@/components/ResumeByIdPage/StepProgress";
import ProfileInfoForm from "@/components/ResumeByIdPage/forms/ProfileInfoForm";
import ContactInfoForm from "@/components/ResumeByIdPage/forms/ContactInfoForm";
import WorkExperienceForm from "@/components/ResumeByIdPage/forms/workExperienceForm";
import EducationInfo from "@/components/ResumeByIdPage/forms/EducationInfo";
import SkillsForm from "@/components/ResumeByIdPage/forms/SkillsForm";
import ProjectsDetailsForm from "@/components/ResumeByIdPage/forms/ProjectsDetailsForm";
import CertficationsForm from "@/components/ResumeByIdPage/forms/CertficationsForm";
import AdditionalInfoForm from "@/components/ResumeByIdPage/forms/AdditionalInfoForm";
import RenderResume from "@/components/ResumeTemplates/RenderResume";
import { ResumeDataInterface } from "@/types/resume.types";
import axiosInstance from "@/utils/axiosInstance";
import { captureElementAsImage, dataURLtoFile, fixTailwindColors } from "@/utils/helper";
import Modal from "@/components/modals/Modal";
import ThemeSelector from "@/components/ResumeByIdPage/ThemeSelector";


interface EditResumeByIdClientPageInterface{
    resumeApiData:{
        success:boolean,
        data:object;
        response:string;
    }
}
const EditResumeByIdClientPage:React.FC<EditResumeByIdClientPageInterface> = ({resumeApiData})=>{


    useEffect(()=>{
        if(!resumeApiData?.success){
         toast.error(resumeApiData?.response);
        }
    },[resumeApiData]);

    
      useEffect(()=>{
        updateBaseWidth();
        window.addEventListener('resize',updateBaseWidth);
          return () => {
              window.removeEventListener('resize', updateBaseWidth);
             };
      },[]);



     const {resumeId} = useParams();
     const router = useRouter();
    

     const resumeRef = useRef<HTMLDivElement | null>(null);
     const resumeDownloadRef = useRef(null);

     const [baseWidth,setBaseWidth] = useState(800);

     const [openThemeSelector, setOpenThemeSelector ] = useState(false);
     const [userImgFile,setUserImgFile] = useState<File | null>(null);

     const [openPreviewModal,setOpenPreviewModal] = useState(false);

    //  const [currentPage, setCurrentPage] = useState('profile-info');
    //  const [currentPage, setCurrentPage] = useState('contactInfo');
     const [currentPage, setCurrentPage] = useState('profile-info');

     const [progress,setProgress] = useState(0);
     const [resumeData,setResumeData] = useState(
        resumeApiData?.data ? {
            ...resumeApiData?.data as ResumeDataInterface,
            // title:resumeApiData?.data?.title || "Untitled Resume",
            // template:resumeApiData?.data?.template
        } :
        {
        userId:'',
        title:'',
        thumbnailLink:'',
        profileInfo:{
            profileImg: null,
            profilePreviewUrl: '',
            fullName: '',
            designation: '',
            summary: '',
        },
        template:{
            theme:"",
            colorPalette:[],
            fontFamily: '',
            fontSize: '',
            spacing: '',
            layout: '',
        },
        contactInfo:{
            email: '',
            phone: '',
            location:'',
            linkedIn: '',
            github: '',
            website: '',
            twitter:'',
        },
        workExperience:[
            {
                company:'',
                role: '',
                location: '',
                startDate: '',
                endDate: '',
                description: '',
                currentlyWorking: false,
                highlights:[""],
                order: 0,
            }
        ],
        education:[
            {
                degree: '',
                institution: '',
                location: '',
                startDate: '',
                endDate: '',
                currentlyStudying: false,
                grade: '',
                description: '',
                achievements:[""],
                order: 0,
            }
        ],
        skills:[
            {
                name:'',
                subSkills:'',
                progress:50,
                category:'',
            }
        ],
        projects:[
            {
                title:'',
                description:'',
                github:'',
                subtitle:"",
                startDate:"",
                endDate:"",
                projectLink:'',
                liveDemo: '',
                technologies: [],
                order: 0,
                status:'completed',
                highlights: [],
            }
        ],
        certifications:[{
            name:'',
            issuer:'',
            issueDate:"",
            expiryDate:"",
            year:'',
            order:0,
            credentialUrl:'',
            credentailId:'',
        }],
        languages:[{
            name:'',
            proficiency: 50,
            order: 0,
        }],
        interests:[""],
        hobbies:[""],
     });


     const [errorMsg,setErrorMsg] = useState<null | string>(null);
     const [isLoading,setIsLoading] = useState<boolean>(false);







     //validate inputs 
     //eslint-disable-next-line
     const validateAndNext = (e:any)=>{

        const errors = [];

        switch(currentPage){
            case "profile-info":
                const { fullName,designation,summary} = resumeData.profileInfo ?? {};
                if(!fullName)  errors.push("Full Name is required")
                if(!designation) errors.push("Designation is required");
                // if(!summary){ return errors.push("Summary is required");};
                break;

                     

            case "contactInfo":
                const {email,phone} = resumeData.contactInfo ?? {};
                if( !email || !email.trim() || !/^\S+@\S+\.\S+$/.test(email)) errors.push("Email is required");
                if( !phone || !phone.trim() ) errors.push("Phone number is required");
                break;

            
            case "workExperience":
                //   console.log('resumeData?.workExperience',resumeData?.workExperience)
                  resumeData?.workExperience?.forEach((workExperience,index)=>{
                    if(!workExperience?.company || !workExperience?.company?.trim()){
                        errors.push(`Work Experience ${index + 1} Company is required`);
                    }

                    if(!workExperience?.role || !workExperience?.role?.trim()){
                        errors.push(`Work Experience ${index + 1} Role is required`);
                    }

                    if(!workExperience?.startDate ){
                        errors.push(`Work Experience ${index + 1} Start Date is required`);
                    }
                  });
                  break;



            case "education":
                resumeData?.education?.forEach((education,index)=>{

                    if(!education?.degree || !education?.degree?.trim()){
                        errors.push(`Education ${index + 1} Degree is required`);
                    }
                    if(!education?.institution || !education?.institution?.trim()){
                        errors.push(`Education ${index + 1} Institution is required`);
                    }
                    if(!education?.startDate ){
                        errors.push(`Education ${index + 1} Start Date is required`);
                    }
                });
                break;      

            case "skills":
                resumeData?.skills?.forEach((skill,index)=>{
                    if(!skill?.name || !skill?.name?.trim()){
                        errors.push(`Skill ${index + 1} Name is required`);
                    }
                    if(!skill?.progress || skill?.progress <1 || skill?.progress > 100){
                        errors.push(`Skill ${index + 1} Progress is required. It should be between 1 and 100`);
                    }
                });
                break;

            case "projects":
                console.log('projects',resumeData?.projects)
                resumeData?.projects?.forEach((project,index)=>{
                    if(!project?.title || !project?.title?.trim()){
                        errors.push(`Project ${index + 1} Title is required`);
                    }
                    // if(!project?.description || !project?.description?.trim()){
                    //     errors.push(`Project ${index + 1} Description is required`);
                    // }
                    // if(!project?.startDate ){
                    //     errors.push(`Project ${index + 1} Start Date is required`);
                    // }
                });
                break;    

    //             "additionalInfo"
    //     ];


            case "certifications":

              resumeData?.certifications?.forEach((certification,index)=>{
                if(!certification?.name || !certification?.name?.trim()){
                    errors.push(`Certification ${index + 1} Name is required`);
                }

                if(!certification?.issuer || !certification?.issuer?.trim()){
                    errors.push(`Certification ${index + 1} Issuer is required`);
                }
                // if(!certification?.issueDate ){
                //     errors.push(`Certification ${index + 1} Issue Date is required`);
                // }
                // if(!certification?.expiryDate ){
                //     errors.push(`Certification ${index + 1} Expiry Date is required`);
                // }
              });
              break;


              case "additionalInfo":
              if(resumeData?.languages?.length  === 0 || resumeData?.languages &&  !resumeData?.languages[0]?.name?.trim()){
                  errors.push("At least one language is required");
              }
              if(!resumeData?.interests || resumeData?.interests && resumeData?.interests.length === 0 || resumeData?.interests && !resumeData?.interests[0]?.trim()){
                  errors.push("At least one interest is required");
              }
              break;
            

              default:
                break;
        }

        
              if(errors.length > 0){
                 setErrorMsg(errors.join(", "));
                 return;
              }

          //MOVE TO NEXT STEP 
          setErrorMsg(null);
          goToNextStep();

     }

     //function to navigate to the next page 
     const goToNextStep = ()=>{
         
         
         
        const pages = [
            "profile-info",
             "contactInfo", 
             "workExperience" ,
             "education" ,
             "skills",
             "projects" ,
             "certifications" ,
             "additionalInfo"
            ];
            

        if(currentPage === "additionalInfo") {
            setOpenPreviewModal(true);
        }

        const currentIndex = pages.indexOf(currentPage);

        if(currentIndex !== -1 && currentIndex < pages.length - 1){

            const nextIndex = currentIndex + 1 ; 
            setCurrentPage(pages[nextIndex]);
            const percentage = Math.round((nextIndex/(pages.length - 1)) * 100);
            setProgress(percentage);
            window.scrollTo({top:0,behavior:"smooth"});
        }
     }

     //function to navigate to the previous page 
     const goBack = ()=>{

                const pages = [
            "profile-info",
             "contactInfo", 
             "workExperience" ,
             "education" ,
             "skills",
              "projects" ,
               "certifications" ,
                "additionalInfo"
        ];
   

        if(currentPage ===   "profile-info"){
            return    router.push("/account/dashboard");
        }

        const currentIndex = pages.indexOf(currentPage);
        if(currentIndex !== -1 && currentIndex > 0){
            const nextIndex = currentIndex - 1 ; 
            setCurrentPage(pages[nextIndex]);
            const percentage = Math.round((nextIndex/(pages.length - 1)) * 100);
            //7 pages → 6 transitions First page = 0% , Last page = 100%
            //pages.length - 1   // 7 - 1 = 6
            //nextIndex/(pages.length - 1)   6/6 then we get 100% 6/7 = 85.7% (7 herre is the pages.length)
            setProgress(percentage);
            window.scrollTo({top:0,behavior:"smooth"});
        }
     }


   
      const renderForm = ()=>{
        switch(currentPage){
            case "profile-info":
                return (
                    <ProfileInfoForm
                    profileData={resumeData?.profileInfo as any}
                    updateSection={(key,value)=>{
                        updateSection("profileInfo",key,value);
                    }}
                    onNext={(e)=>validateAndNext(e)}
                    setUserImgFile={setUserImgFile}
                    />
                ); 


            case "contactInfo":
                
                return(
                    <ContactInfoForm
                    contactInfo={resumeData?.contactInfo as any}
                    updateSection={(key,value)=>{
                        updateSection("contactInfo",key,value);
                    }}
                    onNext={validateAndNext}
                    />
                );
                
        
            case "workExperience":
                
                return(
                    <WorkExperienceForm
                        workExperienceData={resumeData?.workExperience as any}
                        updateArrayItem={(key,value,index)=>{
                        updateArrayItem("workExperience",key,value,index);
                        }}
                        addArrayItem={(newItem)=>{
                            addArrayItem("workExperience",newItem);
                        }}
                        removeArrayItem={(index)=>{
                            removeArrayItem("workExperience",index);
                        }}
                        // onNext={validateAndNext}
                    />    
                );
            case "education":
                
                return(
                         <EducationInfo
                        educationData={resumeData?.education as any}
                      
                        updateArrayItem={(key,value,index)=>{
                        updateArrayItem("education",key,value,index);
                        }}
                        addArrayItem={(newItem)=>{
                            addArrayItem("education",newItem);
                        }}
                        removeArrayItem={(index)=>{
                            removeArrayItem("education",index);
                        }}
                        // onNext={validateAndNext}
                    />  
                );
                
            case "skills":
                
                return (
                    <SkillsForm
                    skillsData={resumeData?.skills as any}
                      updateArrayItem={(key,value,index)=>{
                        updateArrayItem("skills",key,value,index);
                        }}
                        addArrayItem={(newItem)=>{
                            addArrayItem("skills",newItem);
                        }}
                        removeArrayItem={(index)=>{
                            removeArrayItem("skills",index);
                        }}
                    />
                );

            case "projects":

                return(
                    <ProjectsDetailsForm
                    projectData={resumeData?.projects as any}
                      updateArrayItem={(key,value,index)=>{
                        updateArrayItem("projects",key,value,index);
                        }}
                        addArrayItem={(newItem)=>{
                            addArrayItem("projects",newItem);
                        }}
                        removeArrayItem={(index)=>{
                            removeArrayItem("projects",index);
                        }}
                    />

                );
            case "certifications":

                return(
                    <CertficationsForm
                      certificationData={resumeData?.certifications as any}
                      updateArrayItem={(key,value,index)=>{
                        updateArrayItem("certifications",key,value,index);
                        }}
                        addArrayItem={(newItem)=>{
                            addArrayItem("certifications",newItem);
                        }}
                        removeArrayItem={(index)=>{
                            removeArrayItem("certifications",index);
                        }}
                    />

                );
                case "additionalInfo":
                    
                    return(
                        <AdditionalInfoForm
                        languages={resumeData?.languages || []}
                        interests={resumeData?.interests as any}    
                        updateArrayItem={(section:string,key:string,value:number | string,index:number)=>{
                        updateArrayItem(section as any,key,value,index);
                        }}
                        updateArrayStringItem={
                            (section:string,value:string,index:number)=>{
                                   updateStringArrayItem(section as any,value,index);
                            }
                        }

                        addArrayItem={(section:string,newItem:object | string)=>{
                        addArrayItem(section as any ,newItem as object);
                        }}
                        removeArrayItem={(section:string,index:number)=>{
                        removeArrayItem(section as any,index);
                        }}
                        />
                    );
            default: 
            return null;
        }
      }

      //update simple nested object (like profileInfo, contact info etc)
        
      const updateSection = (
        section:"profileInfo" | "contactInfo"|"workExperience",
        key:string,value:string | number | object | File)=>{
            console.log('key',key,'value',value);
        setResumeData((prev)=>({
            ...prev,
            [section]:{
                ...prev[section],
                [key]:value
            }
        }));
      }

      //update array item (like workExperience[0],skill[1],etc)
      const updateArrayItem = (
        section:"workExperience" | "education" | "skills"|"projects"|"certifications"|"languages" ,
        //eslint-disable-next-line
        key:string | null, value:any,index:number)=>{
        setResumeData((prev)=>{
           const updatedArray = [...(prev[section] ?? [])];
            //either update totally using index position or use index and key 
            if(key === null){
                //You want to replace the entire object at that index.
                updatedArray[index] = value;
                
            }
            else{
                //You want to update ONE field inside the object.
                updatedArray[index] = {
                    ...updatedArray[index],
                    [key]:value
                }
            }
            return{
                ...prev,
                [section]:updatedArray
            }
        })
      }

      const updateStringArrayItem = (section:"interests",value:string,index:number)=>{
        setResumeData((prev:any)=>{
            const updatedArray = [...(prev[section] ?? [])];
            updatedArray[index] = value;
            return{
                ...prev,
                [section]:updatedArray
            }
        });
        
      }


      //ADD ITEM TO ARRAY 
      const addArrayItem = (
        section:"workExperience" | "education" | "skills"|"certifications"|"languages" | "interests"|"projects",
        //eslint-disable-next-line
        newItem:any
    
    )=>{

        setResumeData((prev)=>({
            ...prev,
            [section]: Array.isArray(prev[section])
          ? [...prev[section], newItem]
  : [newItem]
        }))

      }

      //REMOVE ITEM FROM ARRAY
      const removeArrayItem = (section:"workExperience" | "education" | "skills"|"certifications"|"languages" |"projects",index:number)=>{
setResumeData(prev => ({
  ...prev,
  [section]: Array.isArray(prev[section])
    ? prev[section].filter((val, idx) => idx !== index)
    : []
}));
      }

      //fetch resume info by id 
      const fetchResumeDetailsById = async()=>{
        idParamsValidate();
        const resData = await FETCH_ALL_RESUME_ID(resumeId as string);
        if(!resData?.success){
            return toast.error(resData?.response);
        }
        else{
            setResumeData(resData?.data);
        }
      }

      //upload thumbnail and resume profile img
      const uploadResumeImg =async()=>{
            setIsLoading(true);
            fixTailwindColors(resumeRef?.current as HTMLElement);
            const imageDataUrl = await captureElementAsImage(resumeRef?.current as HTMLElement);

            //convert base64 to File 
            const thumbnailFile = dataURLtoFile(imageDataUrl,`resume-${resumeId}.png`);
            const profileImageFile = resumeData?.profileInfo?.profileImg || null;
            const formData = new FormData();
            if(profileImageFile) formData.append("profileImage",profileImageFile);
            if(thumbnailFile) formData.append("thumbnail",thumbnailFile);


            //⚠️⚠️ WE WILL BE CALLING THIS FUNCTION EVERYTIME , BECAUSE IT GHONNA GENERATE THE COVER IMAGE EVERYTIME , WE SAVE AND EXIT 

    const uploadResponse = await UPDATE_RESUME_IMAGES_BY_ID(resumeId as string, formData);
    setIsLoading(false);
           if(!uploadResponse.success){
                    return toast.error(uploadResponse.response);
                }
                    const {thumbNail,profilePreviewUrl} = uploadResponse.data;
                //    console.log('rsumeData',resumeData)
                //    //call the second api to update other resume data 
                   await updateResumeDetails({thumbnailLink:thumbNail,profilePreviewUrl});
                //    toast.success('Resume updated successfully');
                //    router.push('/dashboard');

}

      //eslint-disable-next-line
      const updateResumeDetails = async (options?: {
    thumbnailLink?: string;
    profilePreviewUrl?: string;
}) => {
    
        setIsLoading(true);

        const payload: any = { ...resumeData };

        // Only add images if they exist
        if (options?.thumbnailLink) {
            payload.thumbnailLink = options.thumbnailLink;
        }
        if (options?.profilePreviewUrl) {
            payload.profileInfo = {
                ...resumeData?.profileInfo,
                profilePreviewUrl: options.profilePreviewUrl,
            };
        }

        const response = await UPDATE_RESUME_DATA(resumeId as string, payload);
        setIsLoading(false);
        if(response?.success){
            toast.success('Resume updated successfully');
            return router.push('/account/dashboard');
        }
        else{
            toast.error(
                "Technical issue has occurred, please try again after some time."
            );
        }
};

 

      //DELETE RESUME 
      const handleDeleteResume = async(resumeId:string)=>{
                 toast.loading("Deleting Resume...",{id:resumeId});
             const res = await DELETE_RESUME_BY_ID(resumeId);
             console.log('res',res);
             toast.dismiss(resumeId);
            if(res?.success){
                toast.success(res?.data?.response);
                router.refresh();
            }
            else {
                toast.error(res?.data?.response);
            }
      };

      //download resume
      const reactToPrintFn = useReactToPrint({contentRef:resumeDownloadRef});


      //FUNCTION TO UPDATE BASEWIDTH BASED ON THE RESUME CONTAINER SIZE 
      const updateBaseWidth = ()=>{
         if(resumeRef.current){
            setBaseWidth(resumeRef.current?.offsetWidth);
        }
      }





      const idParamsValidate = ()=>{
         if(!resumeId || typeof resumeId !== 'string') {
                return router.back();
          }
          else return;
      }






    



    return(
<section
 className="screenPadding paddingFromHeader w-full max-w-full
   min-h-screen bg-bgPrimary overflow-hidden"
   >


    {/*TITLE EDIT + (CHANGE THEME, DELETE, PREVIEW & DOWNLOAD ) START */}
   <div 
  className="screenWidth w-full max-w-full
   h-full flex  items-center bg-white
   justify-between gap-5 rounded-lg border border-purple-100 py-3 px-4 mb-4">
    
    <TitleInput
    title={resumeData.title ?? ""}
    setTitle={(value:string)=>
        //eslint-disable-next-line
    setResumeData((prev)=>({...prev,title:value} as any ) )}
    />


    <div
     className="flex items-center gap-4"
     >

        <button
         className="btn-small-light"
         onClick={()=>setOpenThemeSelector(true)}
         >
            <LuPalette 
            className="text-[16px]
             text-purple-600" 
            />
            <span 
            className="md:block hidden text-xs"
            >
                Change Theme
            </span>
        </button>


        <button
        className="btn-small-light"
        onClick={()=>handleDeleteResume(resumeId as string)}
        >
            <LuTrash2
             className="text-[16px]
             text-purple-600" 
            />
            <span
            className="md:block hidden text-xs"
            >
                Delete
            </span>
        </button>

        <button
        onClick={()=>setOpenPreviewModal(true)}
        className="btn-small-light"
        // onClick={handleDeleteResume}
        >
            <LuDownload
             className="text-[16px]
             text-purple-600" 
            />
            <span
            className="md:block hidden text-xs"
            >
                Preview & Download
            </span>
        </button>

    </div>


    
  </div>
  {/*TITLE EDIT + (CHANGE THEME, DELETE, PREVIEW & DOWNLOAD ) END */}

  {/* */}

  <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 ">
    <div className="bg-white rounded-lg border border-purple-100 overflow-hidden">
        <StepProgress progress={progress} />
        {renderForm()}

        <div 
        className="px-5"
        >
            {errorMsg &&( 
                <div className=" bg-yellow-200 flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-600 bg-ambder-100 px-2 py-1  my-1 rounded">
                    <LuCircleAlert className="text-md" />
                    <span>
                    {errorMsg}
                    </span>
                    </div>
                    )}

        <div className="flex items-end justify-end gap-3 mt-3 mb-5">
          
            <button
             className="btn-small-light"
             onClick={goBack}
             disabled={isLoading}
            >
                <LuArrowLeft className="text-base"/>
                Back
            </button>

            <button
             className="btn-small-light"
             onClick={uploadResumeImg}
             disabled={isLoading}
            >
                <LuSave className="text-base"/>
                {isLoading ? 'Updating...' : 'Save & Exit' }
            </button>




            {/* <button
             className="btn-small-light"
             onClick={goBack}
             disabled={isLoading}
            >
                <LuSave className=""/>
                {isLoading ? 'Updating...' : 'Save & Exit' }
            </button> */}

            {/* <button
             className="btn-small"
             onClick={validateAndNext}
             disabled={isLoading}
            >
                {currentPage === "additionalInfo" && (
                        <LuDownload className="text-base"/>
                    )
                }

                {currentPage === "additionalInfo" ? "Preview & Download" : "Next" }
                
                {currentPage != "additionalInfo" && (
                    <LuArrowLeft className="text-base rotate-180" />
                )}
            </button> */}
        </div>

          {/** */}


{/* 
  <div
   ref={resumeRef}
  className="h-[100vh]
   bg-white w-full
   max-w-full"
  >



    RESUME TEMPLATE 


  </div> */}
  {/** */}

        </div>

    </div>




{/*TEMPLATE SHOWING AREA START */}

  <div
   ref={resumeRef}
  className="
   bg-white w-full
   max-w-fit"
  >



<RenderResume 
templateId={resumeData?.template?.theme || ""}
resumeData={resumeData }
colorPalette={resumeData?.template?.colorPalette || []}
containerWidth={baseWidth}
/>

    {/* RESUME TEMPLATE  */}


  </div>


    {/* <div className="h-full ">
        <code>
            {JSON.stringify(resumeData)}
        </code>

    </div> */}


{/*TEMPLATE SHOWING AREA END */}
  </div>








  {/*CHANGE THEME MODAL START */}
  <Modal
  isOpen={openThemeSelector}
  onClose={()=>setOpenThemeSelector(false)}
  title="Select a theme"
  >
    <div className="w-[95vw] h-[80vh] ">
    <ThemeSelector 
    onClose={()=>setOpenThemeSelector(false)}
    selectedTheme={resumeData?.template}
    setSelectedTheme={(value:any)=>{
        setResumeData((prev)=>({
            ...prev,
            template:{
                ...prev.template,
                ...value
            }
        }))
    }}
    resumeData={resumeData}
    />
    </div>
    </Modal>


  {/*CHANGE THEME MODAL END */}
  <Modal
  isOpen={openPreviewModal}
  onClose={()=>setOpenPreviewModal(false)}
  title={resumeData?.title || "Resume"}
  actionBtnText="Download"
  showActionBtn
  actionBtnIcon={<LuDownload className="" />}
  onActionClick={reactToPrintFn}
  >


<div 
ref={resumeDownloadRef}
className=" w-[98vw] h-[90vh] flex justify-center"
>
    <RenderResume 
    templateId={resumeData?.template?.theme || ""}
    resumeData={resumeData }
    colorPalette={resumeData?.template?.colorPalette || []}
    // containerWidth={baseWidth}
    />
</div>

  </Modal>
  
  {/*OPEN PREVIEW MODAL END */}


</section>
    )
}

export default EditResumeByIdClientPage;












