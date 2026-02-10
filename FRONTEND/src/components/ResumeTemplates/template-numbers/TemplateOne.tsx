










"use client"

import { ResumeDataInterface } from '@/types/resume.types';
import React, { useEffect, useRef, useState } from 'react'
import { LuMapPinHouse,LuMail,LuPhone,
    LuRss,LuGithub,LuUser } from 'react-icons/lu';
import ContactInfo from '../ContactInfo';
import { RiLinkedinLine } from 'react-icons/ri';
import EducationInfoTemplate from '../EducationInfoTemplate';
import LanguageSectionTemplate01 from '../template01-default/LanguageSectionTemplate01';
import WorkExperienceTemplate from '../WorkExperienceTemplate';
import ProjectInfoTemplate from '../ProjectInfoTemplate';
import SkillsTemplate from '../SkillsTemplate';
import CertificationInfoTemplate from '../CertificationInfoTemplate';
import { HiOutlineGlobeAlt } from 'react-icons/hi';



    const DEFAULT_THEME = [
        "#EBFDFF",
        "#A1F4FD",
        "#CEFAFE",
        "#00B8DB",
        "#4A5565"
    ];



    const Title = ({text,color}:{text:string,color:string})=>{
        return (
            <div className="relative w-fit mb-2.5 ">
                <span 
                className="absolute bottom-0 left-0 w-full h-2 "
                // className=" w-full h-2 bg-red-400"
                style={{backgroundColor:color}}
                />

                <h2 className='relative text-sm font-bold'>{text  ?? ""}</h2>
            </div>
        )
    }







interface TemplateOneInterface{
       resumeData: ResumeDataInterface;
        colorPalette:string[];
        containerWidth:number;


    }
    //NOTE:
    //You have a resume template designed at a fixed width (≈800px).
    //Preview it in different container sizes
    // Shrink it on small screens
    // Keep proportions intact (no reflow, no broken layout)
    //So instead of rebuilding the layout responsively like a masochist, you scale it.

     //Scale = available width ÷ original width



const TemplateOne:React.FC<TemplateOneInterface> = ({
    resumeData,
    colorPalette,
    containerWidth,
}) => {
    const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;
    const resumeRef = useRef<HTMLDivElement | null>(null);
    const [baseWidth,setBaseWidth] = useState(800);
    const [scale,setScale] = useState(1);

     
    
    
    console.log('inside templateOne containerWidth',containerWidth);
    console.log('inside templateOne baseWidth',baseWidth);
    console.log('inside templateOne scale',scale);



//     useEffect(()=>{
//    // calculate the scale factor based on the container width;

//    const actualBaseWidth = resumeRef.current?.offsetWidth || 800;
//    setBaseWidth(actualBaseWidth);
//    setScale(containerWidth/baseWidth)
//    //containerWidth = 400 , baseWidth = 800
//    // scale = 400 / 800 = 0.5
//    //“Render this resume at 50% size.”
//    //containerWidth = 1200
//    // baseWidth = 800
//    // scale = 1.5
//     },[containerWidth]);





useEffect(()=>{
   const actualBaseWidth = resumeRef.current?.offsetWidth || 800;
   setBaseWidth(actualBaseWidth);
   const newScale = containerWidth / actualBaseWidth;  // ✅ Uses FRESH value
   setScale(newScale);
}, [containerWidth]);




  return (
    <div 
    ref={resumeRef}
    style={{
        transform:containerWidth > 0 ? `scale(${scale})` :'none',
        transformOrigin:"top left",
        width: containerWidth > 0 ? `${baseWidth}px`:"auto", // keep the original size so scaling works correctly
        height:'auto',
        // minHeight:"1123px",
        // minHeight:"100vh",
        // height:'auto',
    }}
    className=' p-3 bg-white'>

        <div className="grid grid-cols-12 gap-8 h-full ">


            {/*LEFT SIDE START */}

            <div className="col-span-5 py-10 !h-full"
            style={{backgroundColor:themeColors[0]}}
            >
                <div className="flex flex-col items-center px-2">

                    {/* USER PROFILE IMAGE START */}
                    <div 
                    //👉 Result = 100px width 100 will win 
                    className='w-[100px] h-[100px] max-w-[110px] max-h-[110px]
                     rounded-full  flex items-center justify-center '
                        style={{backgroundColor:themeColors[1]}}
                    >

                        {
                            resumeData?.profileInfo?.profilePreviewUrl ? (
                                <img 
                                src={resumeData?.profileInfo?.profilePreviewUrl}
                                alt={`${resumeData?.profileInfo?.fullName} profile image`}
                                className='w-[90px]  h-[90px] rounded-full  '
                                />
                            ):(
                                <div 
                                className='w-[90px] h-[90px] flex items-center justify-center  rounded-full '
                                style={{color:themeColors[4]}}
                                >
                                    <LuUser/>
                                </div>
                            )

                        }

                    </div>
                    {/* USER PROFILE IMAGE END */}

                    <h2 className='text-xl font-bold mt-3 text-center'>
                        {resumeData?.profileInfo?.fullName}
                    </h2>

                    <p className='text-sm text-center'>
                        {resumeData?.profileInfo?.designation}
                    </p>
                </div>

                <div className="my-6 mx-5">

                    {/* CONTACT INFORMATION START */}
                    <div className="flex flex-col gap-2">

                        {
                            resumeData?.contactInfo?.location && resumeData?.contactInfo?.location.trim() && (
                                <ContactInfo
                                icon={<LuMapPinHouse/>}
                                iconBG={themeColors[2]}
                                value={resumeData?.contactInfo?.location ?? ""}

                                // icon={resumeData?.contactInfo}
                                 />
                            )
                        }

                           {
                            resumeData?.contactInfo?.email && resumeData?.contactInfo?.email.trim() && (
                        <ContactInfo
                        icon={<LuMail/>}
                        iconBG={themeColors[2]}
                        value={resumeData?.contactInfo?.email ?? ""}
                        // icon={resumeData?.contactInfo}
                         />
                            )}
                        
{
                            resumeData?.contactInfo?.phone && resumeData?.contactInfo?.phone.trim() && (
                        <ContactInfo
                        icon={<LuPhone/>}
                        iconBG={themeColors[2]}
                        value={resumeData?.contactInfo?.phone ?? ""}
                        // icon={resumeData?.contactInfo}
                         />
                        )}

                        
                         {
                            resumeData?.contactInfo?.linkedIn && resumeData?.contactInfo?.linkedIn.trim() && (
                                <ContactInfo
                                icon={<RiLinkedinLine/>}
                                iconBG={themeColors[2]}
                                value={resumeData?.contactInfo?.linkedIn ?? ""}
                                // icon={resumeData?.contactInfo}
                                 />
                            )
                         }

                         {
                            resumeData?.contactInfo?.github && resumeData?.contactInfo?.github.trim() && (
                                <ContactInfo
                                icon={<LuGithub/>}
                                iconBG={themeColors[2]}
                                value={resumeData?.contactInfo?.github ?? ""}
                                // icon={resumeData?.contactInfo}
                                 />
                            )
                         }

                         {
                            resumeData?.contactInfo?.website && resumeData?.contactInfo?.website.trim() && (
                                <ContactInfo
                                icon={<HiOutlineGlobeAlt />}
                                iconBG={themeColors[2]}
                                value={resumeData?.contactInfo?.website ?? ""}
                                // icon={resumeData?.contactInfo}
                                 />
                            )
                         }









                    </div>
                    {/* CONTACT INFORMATION END */}




                {/*EDUCATION START */}               
                    {
                    resumeData?.education &&  resumeData?.education?.length > 0 && (
               <div className="mt-5">
                <Title
                 text="Education" 
                 color={themeColors[1]}
                 />
                 {
                    resumeData?.education &&  resumeData?.education?.map((data,index)=>(
                        <EducationInfoTemplate
                        key={`education_${index}`}
                        educationData={data}
                        />
                    ))
                 }
               </div>
                    )
                    }
                 {/*EDUCATION END */}               

                 
         {/* Languages  START */}

              {/* <div className="mt-5">
                <Title
                 text="Language" 
                 color={themeColors[1]}
                 />
                 <div className='flex flex-col gap-2  '>
                 {
                    resumeData?.languages &&  resumeData?.languages?.map((lang,index)=>(
                        <LanguageSectionTemplate01
                        key={`education_${index}`}
                        accentColor={themeColors[3]}
                        bgColor={themeColors[2]}
                        langData={lang}
                        />
                    ))
                 }
                 </div>
               </div> */}


         {
            resumeData?.languages && resumeData?.languages?.length > 0 && (
               <div className="mt-5">
                <Title
                 text="Language" 
                 color={themeColors[1]}
                 />
                 <div className='flex flex-col gap-1 '>
                 {
                    resumeData?.languages &&  resumeData?.languages?.map((lang,index)=>(
                        <LanguageSectionTemplate01
                        key={`education_${index}`}
                        accentColor={themeColors[3]}
                        bgColor={themeColors[2]}
                        langData={lang}
                        />
                    ))
                 }
                 </div>
               </div>
            )
         }
                 {/* Languages END */}               

                </div>


            </div>

            {/*LEFT SIDE END */}


            {/* RIGHT SIDE END */}

            <div className="col-span-7 pt-10 mr-10 pb-5 ">

                {/*PROFESSIONAL SUMMARY START */}

                {
                    resumeData?.profileInfo?.summary && resumeData?.profileInfo?.summary?.trim() &&  (
                <div>
                    <Title
                    text='Professional Summary'
                    color={themeColors[1]}
                    />
                    <p className="text-[13px] text-justify">
                        {resumeData?.profileInfo?.summary ?? ""}
                    </p>
                </div>

                    )
                }
                {/*PROFESSIONAL SUMMARY END */}


                {/*WORK EXPREIENCE START*/}
                 {
                    resumeData?.workExperience && resumeData?.workExperience?.length > 0 &&  (

                        <div className='mt-4'>
                            <Title text="Work Experience" color={themeColors[1]}/>
                            {
                                resumeData?.workExperience?.map((workExp,index)=>(
                                    <WorkExperienceTemplate
                                    key={`workExperience_${index}`}
                                    workExpData={workExp}

                                    />
                                ))
                            }
                        </div>
                    )}

                {/*WORK EXPREIENCE END*/}

                {/* PROEJCT INFO  START */}
                 {
                    resumeData?.projects && resumeData?.projects?.length > 0 &&  (

                        <div className='mt-4'>
                            <Title text="Projects" color={themeColors[1]}/>
                            {
                                resumeData?.projects?.map((projectData,index)=>(
                                    <ProjectInfoTemplate
                                    key={`projectsInfo_${index}`}
                                    projectData={projectData}
                                    bgColor={themeColors[2]}
                                    />
                                ))
                            }
                        </div>
                    )}
                {/* PROEJCT INFO  END */}

                {/* SKILLS START */}
                {resumeData?.skills && resumeData?.skills?.length > 0 &&  (

                        <div className='mt-4'>
                            <Title text="Skills" color={themeColors[1]}/>
                            {
                                resumeData?.skills?.map((skillData,index)=>(
                                    <SkillsTemplate
                                    key={`skills_${index}`}
                                    skillData={skillData}
                                    accentColor={themeColors[3]}
                                    bgColor={themeColors[2]}
                                    />
                                ))
                            }
                        </div>
                )}
                {/* SKILLS END */}

                {/* CERTIFICATIONS START */}
                
          {resumeData?.certifications && resumeData?.certifications?.length > 0 &&  (

          <div className='mt-4'>
         <Title
          text="Certifications"
           color={themeColors[1]}
           />

                      {
                                resumeData?.certifications?.map((certData,index)=>(
                                    <CertificationInfoTemplate
                                    key={`skills_${index}`}
                                    certData={certData}
                                    bgColor={themeColors[2]}
                                    />
                                ))
                            }



          </div>

         )}
              {/* CERTIFICATIONS END */}


                {/* INTERESTS START */}

          {resumeData?.interests && resumeData?.interests?.length > 0 &&    (

          <div className='mt-4'>
         <Title
          text="Interests"
           color={themeColors[1]}
           />
           <div className='flex items-center flex-wrap gap-2 mt-4'>
                      {
                                resumeData?.interests?.map((interest,index)=>{
                                    const  isValueAdded = interest?.trim()?.length > 0;
                                    return(
                                        isValueAdded ? (
                                            <div
                                            key={`interests_${index}`}
                                            className="text-[12px] font-medium py-1 px-3 rounded-lg whitespace-nowrap"
                                            style={{backgroundColor:themeColors[2]}}
                                            >
                                           {interest ?? ""}
                                        </div>
                                        ):null
                                    )
})
                            }
           </div>



       {/* <CertificationInfoTemplate
                                    key={`skills_${index}`}
                                    certData={certData}
                                    bgColor={themeColors[2]}
                                    /> */}
          </div>

         )}
              {/* INTERESTS END */}

                

            </div>

            {/* RIGHT SIDE END */}


        </div>
        
        </div>
  )
}

export default TemplateOne



















































// "use client"

// import { ResumeDataInterface } from '@/types/resume.types';
// import React, { useEffect, useRef, useState } from 'react'
// import { LuMapPinHouse,LuMail,LuPhone,
//     LuRss,LuGithub,LuUser } from 'react-icons/lu';
// import ContactInfo from '../ContactInfo';
// import { RiLinkedinLine } from 'react-icons/ri';
// import EducationInfoTemplate from '../EducationInfoTemplate';
// import LanguageSectionTemplate01 from '../template01-default/LanguageSectionTemplate01';
// import WorkExperienceTemplate from '../WorkExperienceTemplate';
// import ProjectInfoTemplate from '../ProjectInfoTemplate';
// import SkillsTemplate from '../SkillsTemplate';
// import CertificationInfoTemplate from '../CertificationInfoTemplate';
// import { HiOutlineGlobeAlt } from 'react-icons/hi';



//     const DEFAULT_THEME = [
//         "#EBFDFF",
//         "#A1F4FD",
//         "#CEFAFE",
//         "#00B8DB",
//         "#4A5565"
//     ];



//     const Title = ({text,color}:{text:string,color:string})=>{
//         return (
//             <div className="relative w-fit mb-2.5 ">
//                 <span 
//                 className="absolute bottom-0 left-0 w-full h-2 "
//                 // className=" w-full h-2 bg-red-400"
//                 style={{backgroundColor:color}}
//                 />

//                 <h2 className='relative text-sm font-bold'>{text  ?? ""}</h2>
//             </div>
//         )
//     }







// interface TemplateOneInterface{
//        resumeData: ResumeDataInterface;
//         colorPalette:string[];
//         containerWidth:number;


//     }
//     //NOTE:
//     //You have a resume template designed at a fixed width (≈800px).
//     //Preview it in different container sizes
//     // Shrink it on small screens
//     // Keep proportions intact (no reflow, no broken layout)
//     //So instead of rebuilding the layout responsively like a masochist, you scale it.

//      //Scale = available width ÷ original width



// const TemplateOne:React.FC<TemplateOneInterface> = ({
//     resumeData,
//     colorPalette,
//     containerWidth,
// }) => {
//     const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;
//     const resumeRef = useRef<HTMLDivElement | null>(null);
//     const [baseWidth,setBaseWidth] = useState(800);
//     const [scale,setScale] = useState(1);



//     useEffect(()=>{
//    // calculate the scale factor based on the container width;

//    const actualBaseWidth = resumeRef.current?.offsetWidth || 800;
//    setBaseWidth(actualBaseWidth);
//    setScale(containerWidth/baseWidth)
//    //containerWidth = 400 , baseWidth = 800
//    // scale = 400 / 800 = 0.5
//    //“Render this resume at 50% size.”
//    //containerWidth = 1200
//    // baseWidth = 800
//    // scale = 1.5
//     },[containerWidth]);










//   return (
//     <div 
//     ref={resumeRef}
//     style={{
//         width: '800px', // Fixed width for accurate capture
//         height: 'auto',
//         transform: 'none', // Remove transform for capture
//         overflow: 'visible',
//     }}
//     className='p-3 bg-white'
//     data-capture-element="true"
//     >

//         <div className="grid grid-cols-12 gap-8 w-full">


//             {/*LEFT SIDE START */}

//             <div className="col-span-5 py-10"
//             style={{backgroundColor:themeColors[0]}}
//             >
//                 <div className="flex flex-col items-center px-2">

//                     {/* USER PROFILE IMAGE START */}
//                     <div 
//                     //👉 Result = 100px width 100 will win 
//                     className='w-[100px] h-[100px] max-w-[110px] max-h-[110px]
//                      rounded-full  flex items-center justify-center '
//                         style={{backgroundColor:themeColors[1]}}
//                     >

//                         {
//                             resumeData?.profileInfo?.profilePreviewUrl ? (
//                                 <img 
//                                 src={resumeData?.profileInfo?.profilePreviewUrl || "/placeholder.svg"}
//                                 alt={`${resumeData?.profileInfo?.fullName} profile image`}
//                                 className='w-[90px]  h-[90px] rounded-full  '
//                                 />
//                             ):(
//                                 <div 
//                                 className='w-[90px] h-[90px] flex items-center justify-center  rounded-full '
//                                 style={{color:themeColors[4]}}
//                                 >
//                                     <LuUser/>
//                                 </div>
//                             )

//                         }

//                     </div>
//                     {/* USER PROFILE IMAGE END */}

//                     <h2 className='text-xl font-bold mt-3 text-center'>
//                         {resumeData?.profileInfo?.fullName}
//                     </h2>

//                     <p className='text-sm text-center'>
//                         {resumeData?.profileInfo?.designation}
//                     </p>
//                 </div>

//                 <div className="my-6 mx-5">

//                     {/* CONTACT INFORMATION START */}
//                     <div className="flex flex-col gap-2">

//                         {
//                             resumeData?.contactInfo?.location && resumeData?.contactInfo?.location.trim() && (
//                                 <ContactInfo
//                                 icon={<LuMapPinHouse/>}
//                                 iconBG={themeColors[2]}
//                                 value={resumeData?.contactInfo?.location ?? ""}

//                                 // icon={resumeData?.contactInfo}
//                                  />
//                             )
//                         }

//                            {
//                             resumeData?.contactInfo?.email && resumeData?.contactInfo?.email.trim() && (
//                         <ContactInfo
//                         icon={<LuMail/>}
//                         iconBG={themeColors[2]}
//                         value={resumeData?.contactInfo?.email ?? ""}
//                         // icon={resumeData?.contactInfo}
//                          />
//                             )}
                        
// {
//                             resumeData?.contactInfo?.phone && resumeData?.contactInfo?.phone.trim() && (
//                         <ContactInfo
//                         icon={<LuPhone/>}
//                         iconBG={themeColors[2]}
//                         value={resumeData?.contactInfo?.phone ?? ""}
//                         // icon={resumeData?.contactInfo}
//                          />
//                         )}

                        
//                          {
//                             resumeData?.contactInfo?.linkedIn && resumeData?.contactInfo?.linkedIn.trim() && (
//                                 <ContactInfo
//                                 icon={<RiLinkedinLine/>}
//                                 iconBG={themeColors[2]}
//                                 value={resumeData?.contactInfo?.linkedIn ?? ""}
//                                 // icon={resumeData?.contactInfo}
//                                  />
//                             )
//                          }

//                          {
//                             resumeData?.contactInfo?.github && resumeData?.contactInfo?.github.trim() && (
//                                 <ContactInfo
//                                 icon={<LuGithub/>}
//                                 iconBG={themeColors[2]}
//                                 value={resumeData?.contactInfo?.github ?? ""}
//                                 // icon={resumeData?.contactInfo}
//                                  />
//                             )
//                          }

//                          {
//                             resumeData?.contactInfo?.website && resumeData?.contactInfo?.website.trim() && (
//                                 <ContactInfo
//                                 icon={<HiOutlineGlobeAlt />}
//                                 iconBG={themeColors[2]}
//                                 value={resumeData?.contactInfo?.website ?? ""}
//                                 // icon={resumeData?.contactInfo}
//                                  />
//                             )
//                          }









//                     </div>
//                     {/* CONTACT INFORMATION END */}




//                 {/*EDUCATION START */}               
//                     {
//                     resumeData?.education &&  resumeData?.education?.length > 0 && (
//                <div className="mt-5">
//                 <Title
//                  text="Education" 
//                  color={themeColors[1]}
//                  />
//                  {
//                     resumeData?.education &&  resumeData?.education?.map((data,index)=>(
//                         <EducationInfoTemplate
//                         key={`education_${index}`}
//                         educationData={data}
//                         />
//                     ))
//                  }
//                </div>
//                     )
//                     }
//                  {/*EDUCATION END */}               

                 
//          {/* Languages  START */}

//               {/* <div className="mt-5">
//                 <Title
//                  text="Language" 
//                  color={themeColors[1]}
//                  />
//                  <div className='flex flex-col gap-2  '>
//                  {
//                     resumeData?.languages &&  resumeData?.languages?.map((lang,index)=>(
//                         <LanguageSectionTemplate01
//                         key={`education_${index}`}
//                         accentColor={themeColors[3]}
//                         bgColor={themeColors[2]}
//                         langData={lang}
//                         />
//                     ))
//                  }
//                  </div>
//                </div> */}


//          {
//             resumeData?.languages && resumeData?.languages?.length > 0 && (
//                <div className="mt-5">
//                 <Title
//                  text="Language" 
//                  color={themeColors[1]}
//                  />
//                  <div className='flex flex-col gap-1 '>
//                  {
//                     resumeData?.languages &&  resumeData?.languages?.map((lang,index)=>(
//                         <LanguageSectionTemplate01
//                         key={`education_${index}`}
//                         accentColor={themeColors[3]}
//                         bgColor={themeColors[2]}
//                         langData={lang}
//                         />
//                     ))
//                  }
//                  </div>
//                </div>
//             )
//          }
//                  {/* Languages END */}               

//                 </div>


//             </div>

//             {/*LEFT SIDE END */}


//             {/* RIGHT SIDE END */}

//             <div className="col-span-7 pt-10 mr-10 pb-5 ">

//                 {/*PROFESSIONAL SUMMARY START */}

//                 {
//                     resumeData?.profileInfo?.summary && resumeData?.profileInfo?.summary?.trim() &&  (
//                 <div>
//                     <Title
//                     text='Professional Summary'
//                     color={themeColors[1]}
//                     />
//                     <p className="text-[13px] text-justify">
//                         {resumeData?.profileInfo?.summary ?? ""}
//                     </p>
//                 </div>

//                     )
//                 }
//                 {/*PROFESSIONAL SUMMARY END */}


//                 {/*WORK EXPREIENCE START*/}
//                  {
//                     resumeData?.workExperience && resumeData?.workExperience?.length > 0 &&  (

//                         <div className='mt-4'>
//                             <Title text="Work Experience" color={themeColors[1]}/>
//                             {
//                                 resumeData?.workExperience?.map((workExp,index)=>(
//                                     <WorkExperienceTemplate
//                                     key={`workExperience_${index}`}
//                                     workExpData={workExp}

//                                     />
//                                 ))
//                             }
//                         </div>
//                     )}

//                 {/*WORK EXPREIENCE END*/}

//                 {/* PROEJCT INFO  START */}
//                  {
//                     resumeData?.projects && resumeData?.projects?.length > 0 &&  (

//                         <div className='mt-4'>
//                             <Title text="Projects" color={themeColors[1]}/>
//                             {
//                                 resumeData?.projects?.map((projectData,index)=>(
//                                     <ProjectInfoTemplate
//                                     key={`projectsInfo_${index}`}
//                                     projectData={projectData}
//                                     bgColor={themeColors[2]}
//                                     />
//                                 ))
//                             }
//                         </div>
//                     )}
//                 {/* PROEJCT INFO  END */}

//                 {/* SKILLS START */}
//                 {resumeData?.skills && resumeData?.skills?.length > 0 &&  (

//                         <div className='mt-4'>
//                             <Title text="Skills" color={themeColors[1]}/>
//                             {
//                                 resumeData?.skills?.map((skillData,index)=>(
//                                     <SkillsTemplate
//                                     key={`skills_${index}`}
//                                     skillData={skillData}
//                                     accentColor={themeColors[3]}
//                                     bgColor={themeColors[2]}
//                                     />
//                                 ))
//                             }
//                         </div>
//                 )}
//                 {/* SKILLS END */}

//                 {/* CERTIFICATIONS START */}
                
//           {resumeData?.certifications && resumeData?.certifications?.length > 0 &&  (

//           <div className='mt-4'>
//          <Title
//           text="Certifications"
//            color={themeColors[1]}
//            />

//                       {
//                                 resumeData?.certifications?.map((certData,index)=>(
//                                     <CertificationInfoTemplate
//                                     key={`skills_${index}`}
//                                     certData={certData}
//                                     bgColor={themeColors[2]}
//                                     />
//                                 ))
//                             }



//           </div>

//          )}
//               {/* CERTIFICATIONS END */}


//                 {/* INTERESTS START */}

//           {resumeData?.interests && resumeData?.interests?.length > 0 &&    (

//           <div className='mt-4'>
//          <Title
//           text="Interests"
//            color={themeColors[1]}
//            />
//            <div className='flex items-center flex-wrap gap-2 mt-4'>
//                       {
//                                 resumeData?.interests?.map((interest,index)=>{
//                                     const  isValueAdded = interest?.trim()?.length > 0;
//                                     return(
//                                         isValueAdded ? (
//                                             <div
//                                             key={`interests_${index}`}
//                                             className="text-[12px] font-medium py-1 px-3 rounded-lg whitespace-nowrap"
//                                             style={{backgroundColor:themeColors[2]}}
//                                             >
//                                            {interest ?? ""}
//                                         </div>
//                                         ):null
//                                     )
// })
//                             }
//            </div>



//        {/* <CertificationInfoTemplate
//                                     key={`skills_${index}`}
//                                     certData={certData}
//                                     bgColor={themeColors[2]}
//                                     /> */}
//           </div>

//          )}
//               {/* INTERESTS END */}

                

//             </div>

//             {/* RIGHT SIDE END */}


//         </div>
        
//         </div>
//   )
// }

// export default TemplateOne





