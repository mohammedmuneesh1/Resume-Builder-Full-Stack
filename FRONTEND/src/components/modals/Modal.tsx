"use client"

import { IoCloseOutline } from "react-icons/io5";


interface ModalInterface {
    children:React.ReactNode;
    isOpen:boolean;
    onClose:()=>void;
    title?:string;
    hideHeader?:boolean;
    showActionBtn?:boolean;
    actionBtnIcon?:null | React.ReactNode;
    actionBtnText?:string;
    hideCloseBtn?:boolean;
    onActionClick?:()=>void;
}
const Modal:React.FC<ModalInterface> = (
    {
        children,isOpen,
        onClose,hideHeader,
        title,actionBtnIcon,
        actionBtnText,
        hideCloseBtn=false,
        showActionBtn,
        onActionClick

    })=>{
        if (!isOpen) return null; 
        
    return(
        <div
        className={` ${isOpen ? 'block' : 'hidden'} fixed inset-0 flex flex-col
         justify-center items-center w-full h-full z-50 overflow-auto bg-black/40`
        }
        >

<div
 className={`relative flex flex-col overflow-auto  
    bg-white shadow-lg rounded-lg `}
 >
    {/*MODAL HEADER START */}


    {
        !hideHeader && (
            <div
            className="flex items-center justify-between gap-3  border-b border-gray-200 p-3"
            >
                <h3 className="md:text-lg font-medium text-gray-900 ">{title}</h3>
                
                {/* {
                    showActionBtn && (
                        <button
                        className="btn-small-light mr-12"
                        onClick={()=>{
                            onActionClick?.()
                        }}
                        >
                            {actionBtnIcon}
                            {actionBtnText}
                        </button>
                    )
                }
             */}

            <div className="flex flex-col gap-3 items-end ">

                 

                   <button
    type="button"
    className="text-gray-400 bg-transparent
     hover:bg-gray-200 hover:text-gray-900 rounded-lg
      text-sm w-8 h-8 flex justify-center items-center
     cursor-pointer
      transition duration-300 ease-in-out"
    onClick={()=>onClose()}
    >
        {
            !hideCloseBtn && (
                <IoCloseOutline size={20}/>
            )
        }
    </button>


       {
                    showActionBtn && (
                        <button
                        className="btn-small-light "
                        onClick={()=>{
                            onActionClick?.()
                        }}
                        >
                            {actionBtnIcon}
                            {actionBtnText}
                        </button>
                    )
                }


            </div>

            </div>
        )}





        
    {/*MODAL HEADER END */}

    {/* <button
    type="button"
    className="text-gray-400 bg-transparent
     hover:bg-gray-200 hover:text-gray-900 rounded-lg
      text-sm w-8 h-8 flex justify-center items-center
     absolute top-5.5 right-3.5 cursor-pointer
      transition duration-300 ease-in-out"
    onClick={()=>onClose()}
    >
        {
            !hideCloseBtn && (
                <IoCloseOutline size={20}/>
            )
        }
    </button> */}

    {/**modal body scrollable start */}

    <div
    className=" flex-1 overflow-y-auto custom-scrollbar"
    >
        {children}

    </div>

    {/**modal body scrollable end */}




</div>
        </div>
    )
}
export default Modal;



//   return(
//         <div
//         className={` ${isOpen ? 'block' : 'hidden'} fixed inset-0 flex flex-col
//          justify-center items-center w-full h-full z-50 overflow-auto bg-black/40`
//         }
//         >

// <div
//  className={`relative flex flex-col overflow-auto  
//     bg-white shadow-lg rounded-lg `}
//  >
//     {/*MODAL HEADER START */}
//     {
//         !hideHeader && (
//             <div
//             className="flex items-center justify-between gap-3  border-b border-gray-200 p-3"
//             >
//                 <h3 className="md:text-lg font-medium text-gray-900 ">{title}</h3>
                
//                 {
//                     showActionBtn && (
//                         <button
//                         className="btn-small-light mr-12"
//                         onClick={()=>{
//                             onActionClick?.()
//                         }}
//                         >
//                             {actionBtnIcon}
//                             [actionBtnText]
//                         </button>
//                     )
//                 }

//             </div>
//         )}
//     {/*MODAL HEADER END */}

//     <button
//     type="button"
//     className="text-gray-400 bg-transparent
//      hover:bg-gray-200 hover:text-gray-900 rounded-lg
//       text-sm w-8 h-8 flex justify-center items-center
//      absolute top-5.5 right-3.5 cursor-pointer
//       transition duration-300 ease-in-out"
//     onClick={()=>onClose()}
//     >
//         {
//             !hideCloseBtn && (
//                 <IoCloseOutline size={20}/>
//             )
//         }
//     </button>

//     {/**modal body scrollable start */}

//     <div
//     className=" flex-1 overflow-y-auto custom-scrollbar"
//     >
//         {children}

//     </div>

//     {/**modal body scrollable end */}




// </div>
//         </div>
//     )