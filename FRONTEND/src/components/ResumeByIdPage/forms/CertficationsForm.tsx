"use client"


import Input from '@/components/Input/Input';
import { CertificationsObjInterface } from '@/types/resume.types';
import React from 'react'
import { LuPlus, LuTrash } from 'react-icons/lu';

interface CertficationsFormInterface {
    certificationData:CertificationsObjInterface[];
  updateArrayItem: (key: string, value: string, index: number) => void;
  //eslint-disable-next-line
  addArrayItem: (newItem: any) => void;
  removeArrayItem: (index: number) => void;


}
const CertficationsForm:React.FC<CertficationsFormInterface> = ({certificationData,addArrayItem,removeArrayItem,updateArrayItem}) => {

    
  return (
        <div className="px-5 pt-5 relative">
      <h2 className="text-lg font-semibold text-gray-900">
        Certifications Details
      </h2>


      
      {/*THE MAPPING FORM START  */}
      
            <div className="mt-4 flex flex-col gap-4 mb-3 w-full max-w-full ">
              {Array.isArray(certificationData) &&
                certificationData.map((item, index) => (
                  <div
                   key={index} 
                  className="border border-gray-200/80 p-4 rounded-lg relative "
                  >
                    <div>
                       <Input
                        value={item?.name ?? ""}
                        onChange={(e) =>
                          updateArrayItem("name", e.target.value, index)
                        }
                        label="Certifications Title"
                        placeholder="Full Stack Developer "
                        type="text"
                      />
      
                       <Input
                        value={item?.issuer ?? ""}
                        onChange={(e) =>
                          updateArrayItem("issuer", e.target.value, index)
                        }
                        label="Certfications Issuer"
                        placeholder="Coursera / Google / Udemy / etc."
                        type="text"
                      />
                    </div>
      
      
      
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Certificate Issue Date (optional)"
                        type="month"
                        value={item?.issueDate ?? ""}
                        onChange={(e) =>
                          updateArrayItem("issueDate", e.target.value, index)
                        }
                        placeholder=" Certificate Issue Date(Optional)"
                      />
                      {/* <Input
                        label="Year Date"
                        type="number"
                        value={item?.year ?? ""}
                        onChange={(e) =>
                          updateArrayItem("endDate", e.target.value, index)
                        }
                        placeholder=""
                      /> */}
      
                      <Input
                        label="Certificate Expiry Date (optional)"
                        type="month"
                        value={item?.expiryDate ?? ""}
                        onChange={(e) =>
                          updateArrayItem("expiryDate", e.target.value, index)
                        }
                        placeholder="Certificate Expiry Date(Optional)"
                      />
                      
                      <Input
                        label="Certificate URL (image URL optional) "
                        type="url"
                        value={item?.credentialUrl ?? ""}
                        onChange={(e) =>
                          updateArrayItem("credentialUrl", e.target.value, index)
                        }
                        placeholder="Paste certificate image URL"
                      />
                      <Input
                        label="Certificate Credential ID (optional)"
                        type="text"
                        value={item?.credentailId ?? ""}
                        onChange={(e) =>
                          updateArrayItem("credentailId", e.target.value, index)
                        }
                        placeholder="Paste certificate image URL"
                      />
      
      
      
                    </div>
        
      
      
                    {certificationData.length > 1 && (
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
                                  name:'',
            issuer:'',
            issueDate:"",
            expiryDate:"",
            year:'',
            order:0,
            credentialUrl:'',
            credentailId:'',
                  });
                }}
      
                >
                  <LuPlus/>
                  Add Certifications
                </button>
      
      
      
      
      
      
            </div>
      {/*THE MAPPING FORM END  */}



</div>
  )
}

export default CertficationsForm