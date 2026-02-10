import { SkillsObjInterface } from '@/types/resume.types';
import React from 'react'
import ProgressInfo from './ProgressInfo';



interface SkilllsTemplateInterface{
    skillData:SkillsObjInterface;
    bgColor?:string;
    accentColor?:string;
    showProgress?:boolean;
}

const SkillsTemplate:React.FC<SkilllsTemplateInterface> = ({skillData,bgColor,accentColor,showProgress=true}) => {

  return (
    <div className='flex items-center justify-between gap-[20px] mb-1'>

      <p className="text-sm font-semibold text-gray-900 capitalize">
      {skillData?.name ?? ""}
      </p>

      {
        showProgress &&
        skillData?.progress > 0 && (
          <ProgressInfo
          progress={(skillData?.progress/100)*5}
          bgColor={bgColor || "#E9D4FF"}
          color={accentColor || "#9125E6"}
          />
        )
      }



    </div>
  )
}


export default SkillsTemplate;