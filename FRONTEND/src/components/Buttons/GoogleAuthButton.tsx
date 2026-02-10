import { FcGoogle } from "react-icons/fc";




const GoogleAuthButton = ()=>{

    return(
   <button
   type="button"
  // onClick={handleGoogleSignIn}
        className="max-w-full w-full text-sm
         flex items-center justify-center gap-3 bg-white
         text-gray-700 font-medium py-2.5 px-6 rounded-lg
          border border-gray-300 
           hover:border-gray-400
            transition-all duration-200 
           shadow-sm hover:shadow-md my-1 cursor-pointer"
      >
        <FcGoogle className="text-lg" />
        <span className="capitalize "> Sign in with Google</span>
      </button>
    )
}

export default GoogleAuthButton;


//  @apply w-full text-sm font-medium text-white bg-black shadow-lg shadow-purple-600/5
//  p-[10px] rounded-md my-1 hover:bg-purple-600/15 hover:text-black cursor-pointer transition-all duration-300 ease-in-out;
// }