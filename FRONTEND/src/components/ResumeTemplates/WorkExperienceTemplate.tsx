import { WorkExperience } from '@/types/resume.types';
import { formatYearMonth } from '@/utils/helper';
import React from 'react'

interface WorkExperienceTemplateInterface {
    workExpData:WorkExperience;
    durationColor?:string
}
const WorkExperienceTemplate:React.FC<WorkExperienceTemplateInterface> = ({workExpData,durationColor}) => {


  return (



    <div className="mb-5">
        <div className="flex items-start justify-between">
            <div className="">
                <h3 className='text-sm font-semibold text-gray-900'>{workExpData?.company}</h3>
                <p className="text-sm text-gray-700 font-medium">{workExpData?.role}</p>
            </div>
            <p
             className='text-xs font-bold italic'
             style={{color:durationColor}}
            >
{`${formatYearMonth(workExpData?.startDate )} - ${workExpData?.endDate ? formatYearMonth(workExpData?.endDate) : "Present"}`} 

            </p>
        </div>

        <p
         className='text-sm text-gray-600 font-medium italic mt-[0.2cqw] text-justify'
         //cqw = Container Query Width
        
        >

            {workExpData?.description ?? ""}
        </p>
    </div>
  )
}

export default WorkExperienceTemplate