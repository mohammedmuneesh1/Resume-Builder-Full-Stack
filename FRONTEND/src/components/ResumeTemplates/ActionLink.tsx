import { div } from 'framer-motion/client';
import React from 'react'


interface ActionLinkInterface{
    link:string;
    bgColor?:string;
    icon?:React.ReactNode;
}
const ActionLink:React.FC<ActionLinkInterface> = ({link,bgColor,icon}) => {
  return (
    <div
    className='flex items-center gap-3'
    >

    {
        icon && (
            <div
            className='w-[25px] h-[25px] 
            flex items-center justify-center'
            style={{backgroundColor:bgColor}}
             >
            {icon}
        </div>
            )
        }
        <p 
        className="text-[13px]
         font-medium underline cursor-pointer break-all"
        >
        {link}
         </p>
        </div> 
  )
}

export default ActionLink 