import { CertificationsObjInterface } from '@/types/resume.types'
import { formatYearMonth } from '@/utils/helper';
import React from 'react'



interface CertificationInfoTemplateInterface{
    certData:CertificationsObjInterface;
    bgColor?:string;

}
const CertificationInfoTemplate:React.FC<CertificationInfoTemplateInterface> = ({certData,bgColor}) => {


  return (
     <div  className='mb-4'>
   <h3 className='text-[15px] font-semibold text-gray-900'>{certData?.name ?? ""}</h3>

   <div
   className='' 
    >


 {/* ISSUE DATE + EXPIRY DATE START */}

 {
    (certData?.issueDate || certData?.expiryDate) && (
     <div
   className="flex items-center justify-start
    gap-4 text-gray-800  text-xs font-semibold mt-1.5 "
   >
    {
        certData?.issueDate && (
            <div
             className="text-gray-800 px-3 py-0.5 rounded-lg whitespace-nowrap font-semibold"
             style={{backgroundColor:bgColor}}    
             >
            <span
             className="font-bold text-gray-900"
             
              >Issue On:</span> &nbsp;
              {formatYearMonth(certData?.issueDate ?? "") }
            </div>
        )
    }

    {
        certData?.expiryDate && (
            <div
            className="text-gray-800 px-3 py-0.5 rounded-lg whitespace-nowrap font-semibold"
             style={{backgroundColor:bgColor}}    
             >
                <span
                className="font-bold text-gray-900"
                >Expires On:</span>&nbsp;

                {formatYearMonth(certData?.expiryDate ?? "") }
            </div>
        )
    }


    </div>
    )
 }
   {/* ISSUE DATE + EXPIRY DATE END */}

   {certData?.issuer && (
//    <p className="text-[12px] text-gray-700  mt-3">{certData?.issuer ?? ""}</p>
 <p className="text-[13px] text-gray-600 font-bold mt-1.5 ">
    Issued by {certData.issuer}
  </p>
   )}



<div className='flex items-center justify-start gap-3 mt-1'>
  
{
    certData?.credentialUrl && (
<div className="text-[12px] text-gray-700 font-bold ">
  Certificate Image:{" "}
    <a
      href={certData?.credentialUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline break-all font-medium capitalize"
    >
      View Certificate
    </a>
</div>
    )
}

{certData?.credentailId && (
<div className="text-[12px] text-gray-700 font-bold ">
  Credential ID:{" "}
 <span className="font-medium uppercase">{certData?.credentailId ?? ""}</span>
</div>
)
}

</div>


   </div>




    </div>
  )
}

export default CertificationInfoTemplate


// "Don't waste your time looking back, you are not going that way."
// -Ragnar Lothbrok