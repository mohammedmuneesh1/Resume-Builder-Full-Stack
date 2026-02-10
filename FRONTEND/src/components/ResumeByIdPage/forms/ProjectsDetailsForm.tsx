"use client"

import Input from '@/components/Input/Input';
import { ProjectsResumeObjInterface } from '@/types/resume.types';
import { formatToMonth } from '@/utils/helper';
import React from 'react'
import { LuPlus, LuTrash } from 'react-icons/lu';


interface ProjectsDetailsFormInterface{
  projectData:ProjectsResumeObjInterface[];
    updateArrayItem: (key: string, value: string, index: number) => void;
  //eslint-disable-next-line
  addArrayItem: (newItem: any) => void;
  removeArrayItem: (index: number) => void;


}

const ProjectsDetailsForm:React.FC<ProjectsDetailsFormInterface> = ({projectData,addArrayItem,removeArrayItem,updateArrayItem}) => {
  return (
        <div className="px-5 pt-5 relative">


      <h2 className="text-lg font-semibold text-gray-900">
        Project Details
      </h2>


{/*THE MAPPING FORM START  */}

      <div className="mt-4 flex flex-col gap-4 mb-3 w-full max-w-full ">
        {Array.isArray(projectData) &&
          projectData.map((item, index) => (
            <div
             key={index} 
            className="border border-gray-200/80 p-4 rounded-lg relative "
            >
              <div>
                 <Input
                  value={item?.title ?? ""}
                  onChange={(e) =>
                    updateArrayItem("title", e.target.value, index)
                  }
                  label="Project Name"
                  placeholder="Project Name"
                  type="text"
                />

                 <Input
                  value={item?.subtitle ?? ""}
                  onChange={(e) =>
                    updateArrayItem("subtitle", e.target.value, index)
                  }
                  label="Subtitle"
                  placeholder="Project Subtitle"
                  type="text"
                />
              </div>



              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Start Date"
                  type="month"
               value={formatToMonth(item?.startDate)}
                  onChange={(e) =>
                    updateArrayItem("startDate", e.target.value, index)
                  }
                  placeholder=""
                />
                <Input
                  label="End Date"
                  type="month"
                  value={formatToMonth(item?.endDate)}
                  onChange={(e) =>
                    updateArrayItem("endDate", e.target.value, index)
                  }
                  placeholder=""
                />

                <Input
                  label="GitHub Link/ Project Link"
                  type="url"
                  value={item?.github ?? ""}
                  onChange={(e) =>
                    updateArrayItem("github", e.target.value, index)
                  }
                  placeholder="https://github.com/"
                />
                
                <Input
                  label="Live Link"
                  type="url"
                  value={item?.liveDemo ?? ""}
                  onChange={(e) =>
                    updateArrayItem("liveDemo", e.target.value, index)
                  }
                  placeholder="https://livelink.com/"
                />



              </div>

              <div className="mt-4">
                <label
                className="text-[13px] sm:text-sm font-medium text-slate-600"
                >Description</label>
                <textarea
                  placeholder="What did you do in this role?"
                  className="form-input resize-none w-full mt-1 text-[13px] sm:text-sm"
                  rows={4}
                  value={item?.description || ""}
                  onChange={(e) =>
                    updateArrayItem("description", e.target.value, index)
                  }
                />
              </div>


              {projectData.length > 0 && (
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
                title:'',
                description:'',
                github:'',
                subtitle:"",
                startDate:"",
                endDate:"",
                projectLink:'',
                liveDemo: '',
                technologies: [],
                order: 0,
                status:'completed',
                highlights: [],
            });
          }}

          >
            <LuPlus/>
            Add Projects
          </button>






      </div>
{/*THE MAPPING FORM END  */}


      </div>


  )
}

export default ProjectsDetailsForm