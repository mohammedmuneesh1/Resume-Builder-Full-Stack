"use client"
import { useUserContexxt } from "@/context/UserContext";
import ProfileInfoCard from "../card/ProfileInfoCard"
import { LoginContent } from "@/app/(home)/auth/signin/LoginClientPage";
import { SignUpContent } from "@/app/(home)/auth/signup/SignupClientPage";
import Modal from "../modals/Modal";
import { useState } from "react";


interface HeaderInterface{
    setOpenAuthModal?:React.Dispatch<React.SetStateAction<boolean>>
}
const Header:React.FC<HeaderInterface> = ()=>{
   
        const [openAuthModal,setOpenAuthModal] = useState<boolean>(false);
        const {user} = useUserContexxt();
        const [currentPage,setCurrentPage] = useState("login");  


    return(
                <header
                className="screenPadding bg-[#f0e8d5] border-b border-black/10 max-w-full w-full   shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
                 <div className="screenWidth flex justify-between items-center py-5  ">

                 {/*LOGO SIDE START */}
                    <div
                    className="text-xl font-bold"
                    >
                        Aure CV
                    </div>
                    {/*LOGO SIDE END */}


                    {/*USER LOGGED OR NOT START */}
                                       {user ? (
                          <ProfileInfoCard/>
                        ):(
                <button
                type="button"
                onClick={()=>setOpenAuthModal?.(true)} 
                
                className="bg-purple-100 
                text-sm font-semibold
                 text-black px-7 py-2.5
                  rounded-lg
                   hover:bg-gray-800 
                   hover:text-white transition-colors cursor-pointer">
                    Login/Sign Up
                </button>
                )}
                    {/*USER LOGGED OR NOT END */}
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



                    </header>
 
    )
}
export default Header;