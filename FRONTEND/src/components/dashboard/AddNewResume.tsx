

"use client"

import { PlusIcon } from "lucide-react";
import { LuCirclePlus } from "react-icons/lu";
import Modal from "../modals/Modal";
import CreateResumeForm from "./CreateResumeForm";
import { useState } from "react";

const AddNewResume = ()=>{
    
      const [openCreateModal,setOpenCreateModal] = useState<boolean>(false);

    
    return(
        <>
        <div 
        onClick={()=>setOpenCreateModal?.(true)}
        className="h-[300px] flex flex-col items-center
         justify-center bg-white 
        rounded-lg border-2 border-dotted gap-3  border-blue-200
         hover:border-purple-300 cursor-pointer
          transition-all duration-300 ease-in-out"
          >

            <div
             className="w-12 h-12 flex items-center
              justify-center bg-purple-200/60 rounded-2xl">
         <LuCirclePlus
           className="text-xl text-purple-500 "
           />
            </div>

            <h3 
            className="text-gray-800"
            >
                Add New Resume

            </h3>

        </div>


 <Modal
      isOpen={openCreateModal}
    //   onClose={()=>alert('hello how are you')}
      onClose={()=>{
        setOpenCreateModal(false);
    }}
      title="Add New Resume"
      hideHeader={true}
    //   hideCloseBtn

      >
        <div 
        >
        <CreateResumeForm/>
        </div>
        </Modal>


        </>
    )

}


export default AddNewResume;