"use client"

import { useModalContext } from "@/context/ModalContext";
import { AnimatePresence,motion } from "framer-motion";
import { CheckCircle2, XCircle, X } from 'lucide-react';


const CommonModal = ()=>{
    const {showModal,setShowModal} = useModalContext();

     const handleClose = () => {

    setShowModal({
        show:false,
      success: false,
      content: null,
      title: null,
      desc: null,
      customFn: null,
      customBtnText: null,
    });
  };

  const handleCustomAction = () => {
    if (showModal.customFn) {
      showModal.customFn();
    }
    handleClose();
  };


 return (
    <AnimatePresence>
      {showModal.show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-99999 flex items-center justify-center p-4 bg-black/60"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-white rounded-lg shadow-xl border border-zinc-800"
          >
            {/* Close button */}
            {/* <button
            type="button"
              onClick={handleClose}
              className="absolute top-3 right-3 cursor-pointer text-zinc-500 hover:text-zinc-300 transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button> */}

            <div className="p-3">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                {showModal.success ? (
                  <CheckCircle2 className="w-9 h-9 text-green-500" strokeWidth={1.5} />
                ) : (
                  <XCircle className="w-9 h-9 text-red-500" strokeWidth={1.5} />
                )}
              </div>

              {/* Title */}
              {showModal.title && (
                <h2 className="
                text-lg font-semibold
                 text-center text-zinc-900
                  hover:text-black
                   mb-2
                   ">
                  {showModal.title}
                </h2>
              )}

              {/* Description */}
              {showModal.desc && (
                <p className="text-sm text-center text-zinc-400 ">
                  {showModal.desc}
                </p>
              )}

              {/* Optional Content */}
              {showModal.content && (
                <div className="text-sm text-center text-zinc-300 ">
                  {showModal.content}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-2 mt-4">
                {showModal.customFn && showModal.customBtnText ? (
                  <>
                    <button
                    type="button"
                      onClick={handleClose}
                      className="flex-1 
                      px-4 py-2 cursor-pointer text-sm
                       font-medium bg-zinc-800 text-zinc-300 rounded hover:bg-zinc-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                    type="button"
                      onClick={handleCustomAction}
                      className="flex-1 px-4 py-2 cursor-pointer text-sm font-medium bg-white text-black rounded hover:bg-zinc-200 transition-colors"
                    >
                      {showModal.customBtnText}
                    </button>
                  </>
                ) : (
                  <button
                  type="button"
                    onClick={handleClose}
                    className="w-full cursor-pointer px-4 py-2 text-sm font-medium bg-zinc-900 text-white  rounded hover:bg-black transition-colors"
                  >
                    OK
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommonModal;