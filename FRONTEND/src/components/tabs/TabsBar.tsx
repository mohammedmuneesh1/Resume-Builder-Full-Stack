import { div } from 'framer-motion/client';
import React from 'react'




interface TabsBarInterface{
    tabs:Array<{label:string}>,
    activeTab:string,
    setActiveTab:React.Dispatch<React.SetStateAction<string>>;
}


const TabsBar:React.FC<TabsBarInterface> = ({activeTab,setActiveTab,tabs}) => {


  return (
   <div className="">
    <div className="">
        {
            tabs?.map((tabData,index:number)=>(
                <button
                key={index}
                className={`relative px-3 md:px-4 py-2 text-sm font-medium 
                    ${activeTab === tabData.label ? ' ' : 'text-gray-500 hover:text-gray-700'} 
                    cursor-pointer`}
                    onClick={()=>setActiveTab(tabData?.label)}
                >
                    <div className="flex items-center ">
                        <span className="text-sm font-semibold text-purple-700">
                            {tabData?.label}
                        </span>
                    </div>

                    {
                        activeTab === tabData.label && (
                            <div className='absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r
                             from-purple-500 to-purple-700'/>
                        )
                    }
                </button>
            ))
        }
    </div>
   </div>
  )
}

export default TabsBar