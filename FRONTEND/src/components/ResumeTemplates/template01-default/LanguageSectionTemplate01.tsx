import { LanguagesObjInterface } from '@/types/resume.types';
import React from 'react'
import ProgressInfo from '../ProgressInfo';


interface LanguageSectionTemplate01Interface{
    langData:LanguagesObjInterface;
    accentColor:string;
     bgColor:string;
}
const LanguageSectionTemplate01:React.FC<LanguageSectionTemplate01Interface> = ({langData,accentColor,bgColor})=>{
    //langData,accentColor,bgColor

  return (
    <div className='flex items-center justify=-between w-full max-w-full  '>
        <p className="flex-1 text-[12px] font-semibold text-gray-900">{langData?.name ?? ""}</p>

        {
            langData?.proficiency > 0 && (
                <ProgressInfo 
                progress={(langData?.proficiency / 100) * 5}
                color={accentColor}
                bgColor={bgColor}
                // accentColor={accentColor}
                // bgColor={bgColor}
                />

            )
        }
                
    </div>
  )
}

export default LanguageSectionTemplate01



