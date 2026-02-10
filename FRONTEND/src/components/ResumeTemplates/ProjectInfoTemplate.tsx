import { ProjectsResumeObjInterface } from '@/types/resume.types';
import React from 'react'
import { LuExternalLink, LuGithub } from 'react-icons/lu';
import ActionLink from './ActionLink';
import { MdOpenInNew } from "react-icons/md";
import { formatYearMonth } from '@/utils/helper';
interface ProjectInfoTemplateInterface{
    projectData:ProjectsResumeObjInterface;
    bgColor?:string;
   isPreview?:boolean;
}
const ProjectInfoTemplate:React.FC<ProjectInfoTemplateInterface> = ({projectData,bgColor,isPreview}) => {
  
    return (
    <div className='mt-2 mb-4'>
        <h3 className={`${isPreview ? "text-xs":"text-sm"}
         font-semibold  text-gray-900  `}>
         {projectData?.title ?? ""}
        </h3>

        <h3 className={`text-[10px]
         font-light italic  text-gray-900  `}>
         {projectData?.subtitle ?? ""}
        </h3>


{
    projectData?.startDate && (
                    <p
                     className='text-xs font-bold italic mt-1'
                    //  style={{color:durationColor}}
                    >
                {`${projectData?.startDate ? `${formatYearMonth(projectData?.startDate )} - ` :"" }  ${projectData?.endDate ? formatYearMonth(projectData?.endDate) : projectData?.startDate ?  "Present" :""}`} 
                    </p>
    )
}


        <p className="text-sm text-gray-700 font-medium mt-1">
            {projectData?.description ?? ""}
        </p>

        <div
         className="flex flex-col items-start  mt-2" >
            {
                projectData?.github && (
                     <ActionLink
                     icon={<LuGithub />} 
                     link={projectData?.github}
                      bgColor={bgColor} 
                      />
                )
            }
            {
                projectData?.liveDemo && (
                     <ActionLink
                     icon={<LuExternalLink />} 
                     link={projectData?.liveDemo}
                      bgColor={bgColor} 
                      />
                )
            }
            {
                projectData?.projectLink && (
                     <ActionLink
                     icon={<MdOpenInNew  />} 
                     link={projectData?.projectLink}
                      bgColor={bgColor} 
                      />
                )
            }
        </div>

    </div>
  )
}

export default ProjectInfoTemplate;