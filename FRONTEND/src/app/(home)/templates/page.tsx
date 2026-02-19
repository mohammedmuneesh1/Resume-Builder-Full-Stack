"use client"
import Modal from "@/components/modals/Modal";
import { useUserContexxt } from "@/context/UserContext";
import Image from "next/image";
import { useState } from "react";
import { LoginContent } from "../auth/signin/LoginClientPage";
import { SignUpContent } from "../auth/signup/SignupClientPage";
import CreateResumeForm from "@/components/dashboard/CreateResumeForm";

const resumeTemplates = ["01.webp", "02.webp", "03.webp", "04.webp"];

export default function TemplatesPage() {


      const {user} = useUserContexxt();
      const [openAuthModal,setOpenAuthModal] = useState<boolean>(false);
      const [currentPage,setCurrentPage] = useState("login");  
  
      //RESUME TEMPLATE SELECTION 
      const [showSelectTemplateModal,setShowSelectTemplateModal] = useState<boolean>(false);
      const [selectedTemplateId,setSelectedTemplateId] = useState<string | null>(null);   
  
  
  
    




    const templateSelectionFn = (templateId:string)=>{
        if(user){
            setShowSelectTemplateModal(true);
            setSelectedTemplateId(templateId);
        }
        else{
            setCurrentPage('login');
            setOpenAuthModal?.(true);
        }

    }







  return (
    <section className="screenPadding screenWidth py-20 min-h-screen">
      <div className="text-center mb-16">
        <span className="text-sm font-semibold px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-200">
          TEMPLATES
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6 mb-4">
          Professional Templates for Every Career
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stand out with our carefully crafted resume designs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resumeTemplates.map((fileName, index) => {
          const label = `Template ${String(index + 1).padStart(2, "0")}`;
          const templateId = fileName.split(".")[0];
          const src = `/resumeTemplates/${fileName}`;

          return (
            <div key={fileName}
              onClick={()=>templateSelectionFn(templateId)}
             className="group cursor-pointer"
             >
              <div className="bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200 group-hover:border-blue-500 transition-all duration-300 group-hover:shadow-xl">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
                  <Image
                    src={src}
                    alt={label}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="text-center mt-4 font-semibold text-gray-700">
                {label}
              </p>
            </div>
          );
        })}
      </div>





            
                                           {/*MODAL SECTION START */}
                            <Modal
                            isOpen={openAuthModal}
                            onClose={()=>{
                                setOpenAuthModal(false);
                                setCurrentPage('login');
                            }}
                            >
                            <>
            
                            {
                             currentPage === 'login'  ? (
                                <LoginContent
                                setCurrentPage={setCurrentPage}
                                closeModal={()=>setOpenAuthModal(false)}
                                
                                />
                             )   :(
                                <SignUpContent
                                closeModal={()=>setOpenAuthModal(false)}
                                   setCurrentPage={setCurrentPage}
                                />
                             )
            
                            }
                            </>
                            </Modal>
                            
                            {/*MODAL SECTION END */}
                           

                            {/*TEMPLATE SELECTION MODAL START  */}
                            <Modal
                            isOpen={showSelectTemplateModal}
                            onClose={()=>{
                                setShowSelectTemplateModal(false);
                                setSelectedTemplateId(null);
                            }}
                            >
                                <CreateResumeForm
                                templateId={selectedTemplateId}
                                />
                            </Modal>
                            {/*TEMPLATE SELECTION MODAL END  */}


            



    </section>
  );
}