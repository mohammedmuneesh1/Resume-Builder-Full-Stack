"use client"
import { useUserContexxt } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import { userLetterGenerator } from "@/utils/userNameLetterGenerator";
import { useEffect, useRef, useState } from "react";
import { useModalContext } from "@/context/ModalContext";

const ProfileInfoCard = () => {
  const { user, clearUser } = useUserContexxt();
  const { setShowModal } = useModalContext();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  const logoutFn = () => {
    setShowModal((prev) => ({
      ...prev,
      show: true,
      title: "Confirm Logout",
      desc: "Are you sure you want to log out of your account?",
      customBtnText: "Log Out",
      customFn: () => {
        Cookies.remove("token");
        clearUser();
        router.push("/");
      },
    }));
  };

  return (
    <div ref={menuRef} className="relative">
      {/* Avatar */}
      <div
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="relative rounded-full overflow-hidden cursor-pointer w-12 h-12 bg-gray-500"
      >
        {!user?.profileImg ? (
          <Image
            src="https://via.placeholder.com/150?text=User"
            alt="user profile image"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div
           className="bg-amber-700 flex items-center justify-center absolute inset-0 text-base font-medium text-white">
            {userLetterGenerator(user?.name ?? "User")}
          </div>
        )}
      </div>

      {/* Dropdown */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg p-2 border border-gray-100 z-50">
          <ul className="space-y-1">
            <li
              onClick={() => {
                router.push("/account/dashboard");
                setIsMenuOpen(false);
              }}
              className="px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm"
            >
              Dashboard
            </li>

            <li
              onClick={() => setIsMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm"
            >
              Profile
            </li>

            <li
              onClick={logoutFn}
              className="px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm text-red-500 font-medium"
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileInfoCard;
