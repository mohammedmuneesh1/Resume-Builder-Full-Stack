import React from 'react'


interface ProgressInfoInterface{
    progress:number;
    color:string;
    total?:number;
    bgColor:string;
}
const ProgressInfo:React.FC<ProgressInfoInterface> = ({bgColor,color,progress,total=5}) => {
  return (
    <div className='flex gap-1.5'>
        {
            [...Array(total)].map((_,index)=>(
            <div
             key={index}
             className={`w-2 h-2 rounded-full 
             ${index < progress ? `bg-cyan-500`:`bg-cyan-100 `}
             `}

             style={{
                backgroundColor:
                index < progress ? color 
                || "rgba(1,1,1,1)" : bgColor || "rgba(1,1,1,1,0,1)",
             }}
             >




             </div>
             ))
        }
    </div>
  )
}

export default ProgressInfo