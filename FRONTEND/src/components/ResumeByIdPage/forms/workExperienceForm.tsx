"use client";
import React from "react";
import Input from "@/components/Input/Input";
import { LuPlus, LuTrash } from "react-icons/lu";
import { formatToMonth } from "@/utils/helper";

interface WorkExperienceObj {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  currentlyWorking: boolean;
  highlights: Array<string>;
  order: number;
}

interface WorkExperienceFormInterface {
  workExperienceData: Array<WorkExperienceObj>;
  updateArrayItem: (key: string, value: string, index: number) => void;
  //eslint-disable-next-line
  addArrayItem: (newItem: any) => void;
  removeArrayItem: (index: number) => void;
}
const WorkExperienceForm: React.FC<WorkExperienceFormInterface> = ({
  addArrayItem,
  removeArrayItem,
  updateArrayItem,
  workExperienceData,
}) => {
  return (
    <div className="px-5 pt-5 relative">
      <h2 className="text-lg font-semibold text-gray-900">
        working experience
      </h2>

      <div className="mt-4 flex flex-col gap-4 mb-3 w-full max-w-full ">
        {Array.isArray(workExperienceData) &&
          workExperienceData.map((item, index) => (
            <div
             key={index} 
            className="border border-gray-200/80 p-4 rounded-lg relative "
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  value={item?.company}
                  onChange={(e) =>
                    updateArrayItem("company", e.target.value, index)
                  }
                  label="Company"
                  placeholder="ABC Corp"
                  type="text"
                />

                <Input
                  label="Role"
                  value={item?.role}
                  onChange={(e) =>
                    updateArrayItem("role", e.target.value, index)
                  }
                  placeholder="Frontend Developer"
                  type="text"
                />

                <Input
                  label="Start Date"
                  type="month"
                  value={formatToMonth(item?.startDate ?? "")}
                  onChange={(e) =>
                    updateArrayItem("startDate", e.target.value, index)
                  }
                  placeholder=""
                />

                <Input
                  label="End Date"
                  type="month"
                  value={formatToMonth(item?.endDate ?? "")}
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


              {workExperienceData.length > 1 && (
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
            company:"",
  role:"",
  location:"",
  startDate: "",
  endDate: "",
  description: "",
  currentlyWorking: true,
  highlights:[],
  order: 0
            });
          }}

          >
            <LuPlus/>
            Add Work Experience
          </button>






      </div>
    </div>
  );
};

export default WorkExperienceForm;


                {/* {
                description:'',
                github:'',
                projectLink:'',
                liveDemo: '',
                technologies: [],
                order: 0,
                status:'completed',
                highlights: [],
            } */}
