"use client"

import React, { createContext, useContext, useState } from "react";

interface ModalContextInterface{
  showModal:showModalInterface,
  setShowModal:React.Dispatch<React.SetStateAction<showModalInterface>>,
}


interface showModalInterface{
  show:boolean,
  success:boolean;
  content:null | React.ReactNode;
  title:null | string;
  desc:null | string;
  customFn: null | (() => void);  //note this stuff on function 
  customBtnText:null | string;

}


 const  ModalContext = createContext<ModalContextInterface | null>(null);


export function ModalContextProvider({ children }: { children: React.ReactNode }) {

  const [showModal,setShowModal] = useState<showModalInterface>({
    show:false,
    success:false,
    content:null,
    title:null,
    desc:null,
    customFn:null,
    customBtnText:null,
  })
  
  return (
    <ModalContext.Provider value={{showModal, setShowModal}}>
      {children}
    </ModalContext.Provider>
  );
}



export function useModalContext(){
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalContextProvider');
  }
  return context;
}