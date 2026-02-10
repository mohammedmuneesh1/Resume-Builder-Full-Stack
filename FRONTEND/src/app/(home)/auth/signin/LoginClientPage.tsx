"use client";

import { USER_LOGIN_API } from "@/app/actions/authApi/authApi";
import GoogleAuthButton from "@/components/Buttons/GoogleAuthButton";
import Input from "@/components/Input/Input";
import { useModalContext } from "@/context/ModalContext";
import { useUserContexxt } from "@/context/UserContext";
import { validateEmail } from "@/utils/helper";
import { welcomeMessageFn } from "@/utils/welcomeMessageFn";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const LoginClientPage = () => {
  return (
    <div className="bg-gray-200 min-h-screen ">
      <div className="flex justify-between items-center mb-16 mx-auto py-6 px-4 ">
        <div className="text-xl font-bold">Resume Builder</div>
      </div>

      <div className="flex justify-center">
        <div className="bg-white">
      <LoginContent />
        </div>
      </div>

    </div>
  );
};

export default LoginClientPage;

interface LoginContentInterface {
  setCurrentPage?: React.Dispatch<React.SetStateAction<string>>;
    closeModal?:()=>void;
}

export const LoginContent: React.FC<LoginContentInterface> = ({
  setCurrentPage,
  closeModal
}) => {
  const pathName = usePathname();
  const {setShowModal} = useModalContext();
  const {updateUser} = useUserContexxt();
  const [isLoading,setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();

  const handleLoginFn = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formData?.email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!formData?.password) {
      setError("Please enter a password");
      return;
    }

    
    setError("");

    //LOGIN API
   setIsLoading(true);
    const res = await USER_LOGIN_API({
      email: formData?.email,
      password: formData?.password,
    });
    setIsLoading(false);



    if (res?.success) {

        const welcomeMessage = welcomeMessageFn();
        router.push("/account/dashboard");

       setShowModal((prev)=>({
           ...prev,
           show:true,
           success:true,
           title:welcomeMessage?.title ?? "",
            desc:welcomeMessage?.description ?? "",
       }));
       closeModal?.();
       updateUser(res?.data);
      
    } else {
      setError(res?.response);
    }
  };

  const signUpRouteFn = () => {
    if (pathName === "/auth/signin") {
      router.push("/auth/signup");
    } else {
      if (setCurrentPage) {
        setCurrentPage("signup");
      }
    }
  };

  return (
    <div className=" w-[80vw] md:w-[33vw] lg:w-[30vw] p-7 flex flex-col justify-center overflow-hidden">
      <h3 className="text-lg 3xl:text-xl font-semibold text-black">
        Welcome Back
      </h3>
      <p className=" text-[13px] sm:text-sm 3xl:text-base text-slate-700 mt-[5px] mb-6">
        Please Enter Your Details To Log In
      </p>

      <form onSubmit={handleLoginFn}>

        <Input
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="john@example.com"
          type="email"
          label="Enter Your Email Address"
        />

        <Input
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Your Password"
          type="password"
          label="Enter Your Password"
        //   label="Min 8 characters"
        />
        {error && <p className="text-red-600 text-left text-[12px] font-medium  mb-4 ">{error}</p>}


        <button type="submit" className="btn-primary !capitalize">
          
          {
            isLoading ? (

              <span className="">
Signing in...
              </span>

            ):(
                <span>
          Sign In
                </span>

            )
          }
        </button>
        <GoogleAuthButton />
      </form>

      <div className="text-[13px] text-slate-800 mt-3 capitalize">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          className="font-medium text-primary  underline cursor-pointer"
          onClick={signUpRouteFn}
        >
          Signup
        </button>
      </div>
    </div>
  );
};
