

import Input from '@/components/Input/Input';
import React from 'react'
import { LuPlus, LuTrash } from 'react-icons/lu';

interface EducationInfoInterface {
educationData:{
                degree: string;
                institution: string;
                location: string;
                startDate: string;
                endDate: string;
                currentlyStudying: boolean;
                grade: string;
                description: string;
                achievements:Array<string>;
                order: number,
            }[];
  updateArrayItem: (key: string, value: string, index: number) => void;
  //eslint-disable-next-line
  addArrayItem: (newItem: any) => void;
  removeArrayItem: (index: number) => void;
} 


const EducationInfo:React.FC<EducationInfoInterface> = ({addArrayItem,removeArrayItem,updateArrayItem,educationData}) => {


  return (
    <div className="px-5 pt-5 relative">
      <h2 className="text-lg font-semibold text-gray-900 capitalize">
        education
      </h2>



      {/* THE MAPPING START HERE  */}

         <div className="mt-4 flex flex-col gap-4 mb-3 w-full max-w-full ">
        {Array.isArray(educationData) &&
          educationData.map((item, index) => (
            <div
             key={index} 
            className="border border-gray-200/80 p-4 rounded-lg relative "
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  value={item?.degree || ""}
                  onChange={(e) =>
                    updateArrayItem("degree", e.target.value, index)
                  }
                  label="Degree"
                  placeholder="B.Tech In Computer Science"
                  type="text"
                />

                <Input
                  label="Institution / University"
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
                />
              </div>


              <div className="mt-4">
                <label
                className="text-xs font-medium text-slate-600"
                >Description</label>
                <textarea
                  placeholder="What did you do in this role?"
                  className="form-input resize-none w-full mt-1"
                  rows={4}
                  value={item?.description || ""}
                  onChange={(e) =>
                    updateArrayItem("description", e.target.value, index)
                  }
                />
              </div>


              {educationData.length > 0 && (
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


          <button
          type="button"
            className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800  text-sm font-medium hover:bg-purple-200  cursor-pointer "
          onClick={()=>{
            addArrayItem({
                degree: "",
                institution:  "",
                location:  "",
                startDate:  "",
                endDate:  "",
                currentlyStudying:  false,
                grade:  "",
                description:  "",
                achievements:[],
                order: 0,
            });
          }}

          >
            <LuPlus/>
            Add Education
          </button>






      </div>


      {/* THE MAPPING END HERE  */}


      </div>
  )
}

export default EducationInfo


    // education:[
    //     ],


        // educationData={resumeData?.education as any}
        //                 updateArrayItem={(key,value,index)=>{
        //                 updateArrayItem("education",key,value,index);
        //                 }}
        //                 addArrayItem={(newItem)=>{
        //                     addArrayItem("education",newItem);
        //                 }}
        //                 removeArrayItem={(index)=>{
        //                     removeArrayItem("education",index);
        //                 }}