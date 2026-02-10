import Image, { StaticImageData } from 'next/image';
import React from 'react'

interface TemplateCardInterface {
         thumbnailImage:string | StaticImageData;
         isSelected:boolean;
          onSelect:()=>void;
}
const TemplateCard:React.FC<TemplateCardInterface> = ({isSelected,onSelect,thumbnailImage}) => {
  return (
    <div className={`h-auto  flex flex-col 
    items-center justify-between bg-white rounded-lg border border-gray-200
    hover:border-purple-300 overflow-hidden cursor-pointer 
    ${isSelected ? " border-purple-500 border-2" :"" }
    `}
    onClick={onSelect}
    >

        {
            thumbnailImage ? (
                <Image
                 src={thumbnailImage}
                  className="w-full h-full object-cover rounded" 
                  alt=''
                  />
            ):(
                <div/>


            )
        }


    </div>
  )
}

export default TemplateCard