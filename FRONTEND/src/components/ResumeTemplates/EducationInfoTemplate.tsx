"use client"

import { Education } from '@/types/resume.types'
import { formatYearMonth } from '@/utils/helper'
import React from 'react'


interface EducationInfoTemplateInterface {
educationData:Education
}
const EducationInfoTemplate:React.FC<EducationInfoTemplateInterface> = ({educationData}) => {
  
  
    return (
    <div className='mb-5'>
        <h3 className="text-[15px] font-semibold text-gray-900">{educationData?.degree ?? ""}</h3>
        <p className="text-sm text-gray-700 font-medium">{educationData?.institution ?? ""}</p>
        <div className="text-xs text-gray-500 font-medium italic mt-0.5">
                {
                `${formatYearMonth(educationData?.startDate ?? "" )} - ${educationData?.endDate ? formatYearMonth(educationData?.endDate ) : "Present"}`} 
                {/* {
                `${formatYearMonth(educationData?.startDate )} - ${educationData?.endDate && (
                    new Date(educationData?.endDate) ? formatYearMonth(educationData?.endDate ) : "Present"
                )}`}  */}
                </div>

                {educationData?.description && (
                <p className='text-[13px] text-gray-600 font-medium mt-1'>{educationData?.description}</p>
                )}




    </div>
  )
}

export default EducationInfoTemplate



// formatYearMonth(educationData?.startDate ) -  formatYearMonth(educationData?.endDate )

