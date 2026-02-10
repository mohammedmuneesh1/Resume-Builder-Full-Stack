

import Input from '@/components/Input/Input';
import RatingInput from '@/components/ratings/RatingInput';
import { SkillsObjInterface } from '@/types/resume.types';
import React from 'react'
import { LuPlus, LuTrash } from 'react-icons/lu';



  

interface SkillsFormInterface {
    skillsData:SkillsObjInterface[];
    updateArrayItem: (key: string, value: string | number, index: number) => void;
  //eslint-disable-next-line
  addArrayItem: (newItem: any) => void;
  removeArrayItem: (index: number) => void;



    
}
const SkillsForm:React.FC<SkillsFormInterface> = ({skillsData,addArrayItem,updateArrayItem,removeArrayItem}) => {
  return (
     <div className="px-5 pt-5 relative">
      <h2 className="text-lg font-semibold text-gray-900 capitalize">
        Skills
      </h2>


      {/*MAPPING START HERE */}
      
         <div className="mt-4 flex flex-col gap-4 mb-3 w-full max-w-full ">
        {Array.isArray(skillsData) &&
          skillsData.map((item, index) => (
            <div
             key={index} 
            className="border border-gray-200/80 p-4 rounded-lg relative "
            >
              <div
               className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/*SKILL NAME START */}
                <Input
                  value={item?.name || ""}
                  onChange={(e) =>
                    updateArrayItem("name", e.target.value, index)
                  }
                  label="Skill"
                  placeholder="Enter Skill (e.g. Problem Solving)"
                  type="text"
                />
                {/*SKILL NAME END */}

                      {/*STAR RATING START */}
                      <div className="md:pl-5">
                            <h1 
    className="text-[13px] md:mb-6 sm:text-[14px] text-slate-800 font-medium"
>
Proficiency {item?.progress ? `${Math.round((item?.progress/100) * 5)}/5` : '' }
</h1>

               <RatingInput
                value={item?.progress || 0}
                total={5}
                onChange={(value) =>{
                     updateArrayItem("progress", value, index)
                    }}
                />
                
              </div>
              {/*STAR RATING END */}

              </div>



{/* DELETE BUTTON START */}

              {skillsData && skillsData?.length > 1 && (
                <button 
                className="absolute top-3 right-3 text-sm
                 text-red-600 hover:underline cursor-pointer 
                 ">
                  <LuTrash
                    size={20}
                    className="cursor-pointer"
                    onClick={() => removeArrayItem(index)}
                  />
                </button>
              )}
            </div>
          ))}

{/* DELETE BUTTON END */}


          <button
          type="button"
            className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800  text-sm font-medium hover:bg-purple-200  cursor-pointer "
          onClick={()=>{
            addArrayItem({
              name:"",
              progress:50,
            });
          }}
          >
            <LuPlus/>
            Add Skills
          </button>






      </div>
      {/*MAPPING END HERE */}

    </div>
  )
}

export default SkillsForm;




      {/* <Input
                  label=""
                  value={item?.institution || ""}
                  onChange={(e) =>
                    updateArrayItem("institution", e.target.value, index)
                  }
                  placeholder="Harvard University"
                  type="text"
                />

                <Input
                  label="Start Date"
                  type="month"
                  value={item?.startDate ?? ""}
                  onChange={(e) =>
                    updateArrayItem("startDate", e.target.value, index)
                  }
                  placeholder=""
                />
                <Input
                  label="End Date"
                  type="month"
                  value={item?.endDate ?? ""}
                  onChange={(e) =>
                    updateArrayItem("endDate", e.target.value, index)
                  }
                  placeholder=""
                /> */}




            //        {
            //     degree: "",
            //     institution:  "",
            //     location:  "",
            //     startDate:  "",
            //     endDate:  "",
            //     currentlyStudying:  "",
            //     grade:  "",
            //     description:  "",
            //     achievements:[],
            //     order: 0,
            // }