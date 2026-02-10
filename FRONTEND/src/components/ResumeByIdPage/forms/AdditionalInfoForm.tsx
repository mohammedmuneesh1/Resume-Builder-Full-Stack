"use client";

import Input from "@/components/Input/Input";
import RatingInput from "@/components/ratings/RatingInput";
import { LanguagesObjInterface } from "@/types/resume.types";
import { LuPlus, LuTrash } from "react-icons/lu";

//    languages:[{
//             name:'',
//             proficiency: '',
//             order: 0,
//         }],
//         interests:[""],
//         hobbies:[""],

interface AdditionalInfoFormInterface {
  languages: LanguagesObjInterface[];
  interests: string[];
  updateArrayItem: (
    section: string,
    key: string,
    value: string | number,
    index: number
  ) => void;
  addArrayItem: (section: string, newItem: object | string) => void;
  removeArrayItem: (section: string, index: number) => void;
  updateArrayStringItem: (section: string, value: string, index: number) => void;
}
const AdditionalInfoForm: React.FC<AdditionalInfoFormInterface> = ({
  addArrayItem,
  interests,
  languages,
  updateArrayItem,
  removeArrayItem,
  updateArrayStringItem
}) => {
  return (
    <div className="px-5 pt-5 relative">
      <h2 className="text-lg font-semibold text-gray-900">
        Additional Informations
      </h2>

      {/*LANGUAGE SECTION START */}

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-900">Languages</h3>
        <div className="flex flex-col gap-4 mt-2" >
          {languages?.map((lang, index: number) => (
            <div key={index} 
            className="border border-gray-200 p-4 rounded-lg relative" >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <Input
                  label="Languages"
                  value={lang.name}
                  onChange={(e) =>
                    updateArrayItem("languages", "name", e.target.value, index)
                  }
                  placeholder="E.g English"
                  type="text"
                />

              <div>
                <label className="text-xs font-medium text-slate-600 mb-4 md:mb-8 block ">Proficiency</label>
                <RatingInput
                  value={lang.proficiency || 0}
                  total={5}
                  // activecolor="#0ea5e9"
                  // inactivecolor="#e0f2fe"
                  onChange={(value) =>
                    updateArrayItem("languages", "proficiency", value, index)
                  }
                />
              </div>
              
              </div>

              {languages.length > 1 && (
                <button
                  className="absolute top-3 right-3 text-sm
                                         text-red-600 hover:underline cursor-pointer 
                                         "
                >
                  <LuTrash
                    size={20}
                    className="cursor-pointer"
                    onClick={() => removeArrayItem("languages", index)}
                  />
                </button>
              )}
            </div>
          ))}

          {/*ADD NEW LANGUAGE BTN START */}
          <button
            type="button"
            className="self-start flex items-center mx-auto gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800  text-sm font-medium hover:bg-purple-200  cursor-pointer "
            onClick={() => {
              addArrayItem("languages", {
                name: "",
                proficiency: 50,
                order: 0,
              });
            }}
          >
            <LuPlus />
            Add Languages
          </button>
          {/*ADD NEW LANGUAGE BTN END */}
        </div>
      </div>
      {/*LANGUAGE SECTION END */}

      {/*INTEREST SECTION START */}
     <div className="mt-6 w-full ">
        <h3 className="text-sm font-semibold text-gray-900">Interests</h3>
        <div className="flex flex-col gap-4  w-full max-w-full mt-3" >
            {
                interests?.map((interest, index: number) => (
                    <div key={index}
                     className="border border-gray-200 p-4 rounded-lg relative"
                     >
                        <Input
                            label=""
                            value={interest}
                            onChange={(e) =>
                                // updateArrayItem("interests", "interests", e.target.value, index)
                                updateArrayStringItem("interests", e.target.value, index)
                            }
                            placeholder="E.g Sports"
                            type="text"
                        />

                                      {interests.length > 1 && (
                <button
                  className="absolute top-3 right-3 text-sm
                                         text-red-600 hover:underline cursor-pointer 
                                         "
                >
                  <LuTrash
                    size={20}
                    className="cursor-pointer"
                    onClick={() => removeArrayItem("interests", index)}
                  />
                </button>
              )}


                        </div>
                ))}
        </div>


          {/*ADD NEW INTERESTS BTN START */}
          <button
            type="button"
            className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800  text-sm font-medium hover:bg-purple-200  cursor-pointer "
            onClick={() => {
              addArrayItem("interests", "");
            }}
          >
            <LuPlus />
            Add Interests
          </button>
          {/*ADD NEW INTERESTS BTN END */}
        


      </div>
      {/*INTEREST SECTION END */}
    </div>
  );
};

export default AdditionalInfoForm;
