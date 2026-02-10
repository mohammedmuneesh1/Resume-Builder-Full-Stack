"use client"
import { useUserContexxt } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'
import Image from "next/image";
import { userLetterGenerator } from "@/utils/userNameLetterGenerator";
import { useEffect, useRef, useState } from "react";
import { useModalContext } from "@/context/ModalContext";





const ProfileInfoCard = ()=>{

    const {user,clearUser} = useUserContexxt();
    const {setShowModal} = useModalContext();
    const router = useRouter();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null >(null);

  useEffect(() => {
    const handler = (e:MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
       //If the menu exists AND the user clicked outside the menu → close the menu
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);





 
    const logoutFn = ()=>{
      setShowModal((prev)=>(
        {
            ...prev,
            show:true,
            title: "Confirm Logout",
            desc: "Are you sure you want to log out of your account?",
            customBtnText:"Log Out",
            customFn:()=>{
            Cookies.remove('token');
            clearUser();
            },
      }));
     return router.push('/')
    }


    return(
<div
ref={menuRef}
onClick={() => setIsMenuOpen((prev) => !prev)}
className="group relative bg-greeen-400">
  {/* Avatar */}
  <div className="relative rounded-full overflow-hidden cursor-pointer w-12 h-12 bg-gray-500 group Z-999">
    {!user?.profileImg ? (
      <Image
        src={'https://via.placeholder.com/150?text=User'}
        loading="eager"
        alt="user profile image"
        fill
        className="object-cover pointer-events-none"
        priority
      />
    ) : (
      <div className="bg-amber-700 flex items-center justify-center absolute inset-0 text-base font-medium">
        {userLetterGenerator(user?.name ?? "User")}
      </div>
    )}
  </div>

  {/* Hover Menu */}
        <div
        className={`
          absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg p-2 
          border border-gray-100 z-40 transition-all duration-300
          
          /* Desktop hover */
          group-hover:opacity-100 group-hover:visible group-hover:translate-y-0

          /* Shared animation */
          ${isMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"}
        `}
      >

    <ul className="space-y-1">
      <li className="px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm">Profile</li>
      <li className="px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm">Settings</li>
      <li
      onClick={logoutFn}
      className="px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm text-red-500 font-medium">Logout</li>
    </ul>
  </div>
</div>

    )

}

export default ProfileInfoCard;